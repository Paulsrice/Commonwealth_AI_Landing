# Deployment Runbook

Cloud Build and Cloud Run for Commonwealth AI Partners. The site is fully
static — Astro builds to `dist/`, packed into a tiny nginx container,
served on Cloud Run.

## How a deploy actually happens

```
git push origin main
       │
       ▼
GitHub webhook fires Cloud Build trigger
       │
       ▼
Cloud Build runs cloudbuild.yaml:
   1. docker build           (Node 20 builder → npm ci → npm run build → nginx runtime)
   2. docker push            (image → Artifact Registry, tagged with $SHORT_SHA + :latest)
   3. gcloud run deploy      (new revision on Cloud Run, traffic 100% to it)
       │
       ▼
Cloud Run live URL serves the new revision
```

End-to-end is roughly 2–3 minutes from push to live URL.

## File reference

### `Dockerfile`
Two-stage. Stage 1 (`node:20-alpine`) installs deps with `npm ci` and
runs `npm run build`. Stage 2 (`nginx:1.27-alpine`) copies the built
`dist/` into `/usr/share/nginx/html` and applies `nginx.conf.template`.

Important env on the runtime stage:
- `PORT=8080` — default; Cloud Run injects its own value at runtime.
- `NGINX_ENVSUBST_FILTER=^PORT$` — restricts envsubst to *only* substitute
  `${PORT}`. Without this, nginx variables like `$uri` and `$host` would
  also get replaced with empty strings and break the config.

### `nginx.conf.template`
The `${PORT}` placeholder is the only env-var reference (matches the
filter above). Listens on `${PORT}` for both IPv4 and IPv6. Key behaviors:

- **`/_astro/*`** — `Cache-Control: public, immutable`, 1-year expiry.
  Safe because Astro hashes filenames.
- **HTML files** — `Cache-Control: no-store, no-cache, must-revalidate`.
  Deploys are visible immediately on next page load.
- **Static assets** (svg, png, jpg, woff2, etc.) — 30-day cache.
- **`/healthz`** — returns `200 ok\n`. Used by Cloud Run probes.
- **Routing** — `try_files $uri $uri/ $uri.html =404`. Handles `/about`
  matching `about.html` (Astro generates it that way by default).
- **Dotfiles** denied by default (except `.well-known`).

### `.dockerignore`
Keeps the build context to ~600 KB instead of ~250 MB. Excludes
`node_modules`, `dist`, `.git`, `.astro`, `*.bak*`, `cloudbuild.yaml`,
`README.md`. The Dockerfile recreates `node_modules` and `dist` from
scratch, so excluding them doesn't break anything.

### `cloudbuild.yaml`
Three steps with `id: build`, `id: push`, `id: deploy`. Substitutions:

| Substitution | Default | Description |
|---|---|---|
| `_SERVICE` | `commonwealth-ai-landing` | Cloud Run service name |
| `_REGION` | `us-east1` | Region (closest to Norfolk) |
| `_AR_REPO` | `cap-images` | Artifact Registry Docker repo name |
| `_PORT` | `8080` | Container port |

Override per-trigger in the Cloud Build trigger UI under "Substitution
variables", or via CLI:
```bash
gcloud builds submit \
  --substitutions=_SERVICE=my-svc,_REGION=us-central1,_AR_REPO=my-repo
```

Cloud Run service flags (set in step 3):

- `--allow-unauthenticated` — public marketing site
- `--max-instances=10` — cap to control cost spikes
- `--min-instances=0` — scale to zero between requests
- `--memory=256Mi` — plenty for nginx
- `--cpu=1` — single vCPU
- `--concurrency=80` — requests per instance
- `--timeout=60s` — HTTP request timeout

## First-time GCP setup checklist

Do these once in the GCP console for the target project:

### 1. Enable APIs
- Cloud Build API
- Cloud Run Admin API
- Artifact Registry API

The console prompts the first time you visit each.

### 2. Create the Artifact Registry repo
- Console → Artifact Registry → Repositories → Create
- Format: **Docker**
- Mode: Standard
- Region: **us-east1** (or whatever `_REGION` is set to)
- Name: **cap-images** (or whatever `_AR_REPO` is set to)

### 3. Connect GitHub
- Console → Cloud Build → Triggers → "Connect Repository"
- Source: **GitHub (Cloud Build GitHub App)**
- Authorize Anthropic… er, authorize the org/account that owns the repo
- Pick `Paulsrice/Commonwealth_AI_Landing`

### 4. Create the trigger
- Console → Cloud Build → Triggers → "Create Trigger"
- Name: `landing-main-deploy`
- Region: same as above (`us-east1`)
- Event: **Push to a branch**
- Source: the connected GitHub repo
- Branch (regex): `^main$`
- Configuration: **Cloud Build configuration file (YAML or JSON)**
- Location: **Repository**, file `/cloudbuild.yaml`
- Click Create

### 5. Grant the Cloud Build SA Cloud Run permissions
The first trigger run will fail with a permission error. The console
shows a "Grant" button — click it to add:
- `roles/run.admin` (Cloud Run Admin)
- `roles/iam.serviceAccountUser` (Service Account User)

After granting, re-run the trigger.

### 6. Find the deployed URL
Console → Cloud Run → `commonwealth-ai-landing` → URL at the top of the
service page. Format: `https://commonwealth-ai-landing-{hash}-{region}.a.run.app`.

### 7. (Optional) Custom domain
- Cloud Run → service → "Manage Custom Domains"
- Add `commonwealthai.partners` (or chosen domain)
- Add the verification + CNAME records at the registrar
- Cloud Run provisions the TLS cert automatically

## Manual deploy (local → Cloud Run)

If you need to deploy without going through GitHub (e.g. testing a fix
on a feature branch):

```bash
# Authenticate once
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Trigger the same pipeline against your local working tree
gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions=_SERVICE=commonwealth-ai-landing-staging
```

Submitting from a non-main branch is also useful for testing the
container locally:

```bash
docker build -t cap-test .
docker run --rm -p 8080:8080 -e PORT=8080 cap-test
# visit http://localhost:8080 and http://localhost:8080/healthz
```

## Troubleshooting

### Trigger fails: "Permission denied to deploy to Cloud Run"
Cloud Build SA missing `roles/run.admin` or `roles/iam.serviceAccountUser`.
Grant from the IAM page or click the prompt in the failed build's logs.

### Build fails: "denied: Unauthenticated request" pushing to AR
The Cloud Build SA needs `roles/artifactregistry.writer` on the AR repo.
Usually granted automatically when the repo is created in the same
project as Cloud Build, but double-check IAM if it's complaining.

### Build fails: Astro / npm errors
The Docker build runs `npm ci` against the committed `package-lock.json`.
If the lockfile is out of sync with `package.json`, `npm ci` fails. Run
`npm install` locally and commit the updated lockfile.

### Site builds but Cloud Run says "Container failed to start"
Most common cause: nginx isn't binding to the port Cloud Run injected.
Check that:
1. `nginx.conf.template` listens on `${PORT}` (capital, in `${...}`)
2. `Dockerfile` sets `ENV NGINX_ENVSUBST_FILTER=^PORT$`
3. `Dockerfile` does not override the default nginx `ENTRYPOINT` (the
   default entrypoint runs envsubst before exec'ing nginx)

You can replicate locally with `docker run -e PORT=9090 cap-test` and
hitting `http://localhost:9090`.

### Site is up but assets are 404ing
Check the `try_files` directive in nginx config — it should be
`try_files $uri $uri/ $uri.html =404`. The `$uri.html` tail is what makes
`/about` resolve to `/about.html`.

### Deploys aren't appearing
1. Check Cloud Build → Build History for a recent build matching your
   commit. If no build, the trigger isn't firing — verify the branch
   regex and the GitHub connection.
2. If the build succeeded, check Cloud Run → service → Revisions. The
   newest revision should be receiving 100% of traffic.
3. If you're seeing stale HTML, hard-refresh (browser cached `/`).
   `Cache-Control: no-store` should prevent this but proxies sometimes
   ignore it.

### Container builds but is huge
You probably broke the `.dockerignore` or are accidentally `COPY .`-ing
something heavy. Check with:
```bash
docker history cap-test
docker image inspect cap-test --format='{{.Size}}' | numfmt --to=iec
```
Healthy image size is around 50–60 MB.

## Cost expectations

For a personal-marketing-site traffic profile (a few hundred to low
thousands of requests/day):

- **Cloud Run** — practically free with `min-instances=0` and the free
  tier (~2M requests/month included).
- **Cloud Build** — first 120 build-minutes/day are free; a build takes
  ~2 minutes, so you can deploy ~60 times a day for $0.
- **Artifact Registry** — pennies for storage; free egress within GCP.
- **Egress** — first 1 GB/month is free.

If costs ever look high, the usual culprit is `min-instances >= 1` (kept
warm). Default to 0.

## Backups / rollback

Cloud Run keeps every revision. To roll back:

```bash
# List recent revisions
gcloud run revisions list --service=commonwealth-ai-landing --region=us-east1

# Move 100% traffic back to a known-good revision
gcloud run services update-traffic commonwealth-ai-landing \
  --region=us-east1 \
  --to-revisions=commonwealth-ai-landing-00012-abc=100
```

Or in the console: Cloud Run → service → Revisions → check older
revision → "Manage Traffic".

## Secrets and environment variables

Right now the static build uses no secrets at runtime. If a future
feature needs them (e.g. an API key for a contact form):

1. Store the secret in **Secret Manager**.
2. Grant the Cloud Run SA `roles/secretmanager.secretAccessor`.
3. Mount the secret in the Cloud Run service config:
   ```bash
   gcloud run services update commonwealth-ai-landing \
     --region=us-east1 \
     --set-secrets=API_KEY=projects/.../secrets/api-key:latest
   ```

Don't put secrets in the Dockerfile, in the image, or in `cloudbuild.yaml`
substitutions. Substitutions are visible in build logs.
