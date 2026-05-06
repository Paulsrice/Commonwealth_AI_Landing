# CLAUDE.md — Commonwealth AI Partners

Entry point for any AI agent (or human) picking up this project cold. Read
this first. Deeper references live in `docs/`.

## What this is

The marketing site for **Commonwealth AI Partners** — a "standup" AI &
automation consultancy based in Norfolk, VA. The brand pitch is "systems
you can swear by" — they get hired to architect and stand up automation
infrastructure (Make.com, n8n, Supabase, Claude/OpenAI/Gemini, Stripe) for
operators whose backends are held together with digital duct tape.

The user is **Paul Rice** (`paul@nfkva.com`). He owns the business. Treat
him as the principal stakeholder and decision-maker on copy, design, and
scope.

Repo: <https://github.com/Paulsrice/Commonwealth_AI_Landing>
Production: deployed to Cloud Run; trigger fires on push to `main`.

## Stack

- **Astro 4.16** (static, multi-page) with `@astrojs/react` for islands
- **React 18** — only used for shadcn-style UI primitives in `src/components/ui/`
- **Tailwind CSS 3.4** with shadcn semantic tokens — see `tailwind.config.mjs`
- **shadcn/ui** primitives at `src/components/ui/` (`button.tsx`, `card.tsx`)
- **Path alias**: `@/*` → `src/*` (configured in `tsconfig.json`)
- **TypeScript strict** — Astro's strict tsconfig
- **Node 20 LTS** for builds (Dockerfile pins this; locally Node 18.20+ works)

Site is fully static. `npm run build` outputs to `dist/`. No SSR.
Cloud Run serves `dist/` via nginx.

## File map

```
commonwealth-ai-partners/
├── CLAUDE.md                      ← you are here
├── README.md                      ← public-facing readme (stack + setup)
├── docs/
│   ├── brand.md                   ← voice + design system reference
│   └── deployment.md              ← Cloud Run + Cloud Build runbook
│
├── astro.config.mjs               ← Astro config (React + Tailwind integrations)
├── tailwind.config.mjs            ← brand tokens + shadcn semantic vars
├── tsconfig.json                  ← strict TS, @/* alias
├── components.json                ← shadcn config (for `npx shadcn add ...`)
├── package.json                   ← deps + scripts
├── Dockerfile                     ← multi-stage Node→nginx for Cloud Run
├── nginx.conf.template            ← static-serve config with $PORT envsubst
├── .dockerignore                  ← keeps Docker context lean (~600 KB)
├── cloudbuild.yaml                ← Cloud Build pipeline (build → push → deploy)
│
├── public/
│   └── favicon.svg                ← cobalt C-mark logo
│
└── src/
    ├── env.d.ts
    ├── styles/globals.css         ← Tailwind + dark-first semantic tokens
    ├── lib/utils.ts               ← shadcn cn() helper
    │
    ├── layouts/
    │   ├── Layout.astro           ← base HTML, fonts, fixed cobalt header,
    │   │                            global SiteMenu. Has `showHeader` prop
    │   │                            (default true) for ad landing pages.
    │   └── Stub.astro             ← reusable "coming soon" page template
    │
    ├── components/
    │   ├── Logo.astro             ← C-mark SVG with chip-tick accents
    │   ├── Header.astro           ← persistent fixed cobalt top bar
    │   ├── Footer.astro           ← 4-column footer + meta strip
    │   ├── SiteMenu.astro         ← slide-out nav drawer (vanilla JS)
    │   ├── Wireframe.astro        ← architectural workflow blueprint SVG
    │   ├── ui/
    │   │   ├── button.tsx         ← shadcn Button (5 variants)
    │   │   └── card.tsx           ← shadcn Card
    │   └── sections/
    │       ├── Hero.astro
    │       ├── Problem.astro
    │       ├── SystemBlueprint.astro
    │       ├── Services.astro     ← currently "What We Deploy" (4 cards)
    │       ├── Approach.astro     ← currently "Philosophy" (3 pillars)
    │       ├── SpecStrip.astro    ← stack-tokens marquee
    │       ├── Industries.astro   ← NOT mounted on home page (kept for
    │       │                        future industry detail pages)
    │       ├── CaseStudies.astro
    │       └── Contact.astro
    │
    └── pages/
        ├── index.astro            ← home page (composes the sections)
        ├── about.astro            ← stub
        ├── privacy.astro          ← stub
        ├── terms.astro            ← stub
        ├── services/
        │   ├── index.astro        ← stub
        │   └── [slug].astro       ← 4 dynamic stubs (one per deployment)
        ├── industries/
        │   ├── index.astro        ← stub
        │   └── [slug].astro       ← 2 dynamic stubs
        └── case-studies/
            ├── index.astro        ← stub
            └── [slug].astro       ← 3 dynamic stubs
```

## Quick start

```bash
npm install        # ~30s
npm run dev        # http://localhost:4321
npm run build      # static build → dist/
npm run preview    # serve dist/ locally
```

Deploy is automatic on push to `main` via Cloud Build. See
`docs/deployment.md` for the runbook.

## Brand in one paragraph

Carbon black + electric cobalt blue (`#2E5BFF`). Editorial, industrial,
"premium engineering firm" aesthetic. Heavy display sans-serif (Space
Grotesk) on a clean body sans (Inter), with mono (JetBrains Mono) for
metadata strips. Voice is **direct, optimistic, brutally honest** —
the antithesis of grifters. Translate complex tech into business
outcomes. "We build systems that work so you don't have to." Recurring
motifs: small uppercase mono labels under hairlines, drawing-style
spec blocks (`DWG NO: 158.01.00 / SCALE: 1/100`), file codes
(`DEP.01`, `IND.02`, `CS.03`), thin vertical grid hairlines on cobalt.
**See `docs/brand.md` for the full guide with do/don't examples.**

## Page inventory

### Home (`/`)
Composed in `src/pages/index.astro`. Section order:

1. Hero (cobalt, "Systems you can swear by.")
2. Problem (diagnosis kicker, symptoms spec card, pivot to "We build the architecture.")
3. SystemBlueprint (wireframe + drawing-spec block)
4. Services / "What We Deploy" (4-card 2×2 grid)
5. Approach / "Philosophy" (3 pillars + lead philosophy block)
6. SpecStrip (stack-tokens marquee)
7. CaseStudies (3 placeholder cards)
8. Contact (cobalt, "Stop managing tasks. Start managing systems.")

### Stubs (using `Stub.astro`)
All currently render a cobalt mini-hero with kicker, file code, title,
description, and "Book a Systems Audit" + "← Back to home" CTAs:

- `/about`, `/privacy`, `/terms`
- `/services/`, `/services/{enterprise-ai-integration,relational-data-architecture,ecosystem-orchestration,financial-operational-automation}`
- `/industries/`, `/industries/{professional-services,real-estate-construction}`
- `/case-studies/`, `/case-studies/{legal-intake,brokerage-pipeline,field-to-office}`

## Conventions

### Adding a new section to the home page
1. Create `src/components/sections/MySection.astro`.
2. Use the existing rhythm: a kicker (small mono on a hairline), a big
   display-tier headline, body copy in `text-ash-300`, recurring file
   codes if applicable.
3. Background should alternate to maintain visual rhythm — most sections
   are `bg-carbon-900`, alternate with `bg-carbon` or `bg-cobalt-500` for
   moments of emphasis.
4. Mount it in `src/pages/index.astro`.

### Adding a real detail page (replacing a stub)
1. Find the corresponding `[slug].astro` and remove the slug from
   `getStaticPaths` (or keep it and override).
2. Create a dedicated file at `src/pages/services/{slug}.astro`.
3. Use `Layout.astro` directly (not `Stub.astro`) for full creative control.
4. Open with the same cobalt hero treatment for visual consistency.

### Adding an ad landing page (no header / menu)
```astro
---
import Layout from '@/layouts/Layout.astro';
---
<Layout showHeader={false} title="...">
  <!-- bare canvas, no global nav -->
</Layout>
```

### Adding a shadcn component
```bash
npx shadcn@latest add accordion dialog input textarea
```
Config in `components.json` is already pointed at `src/components/ui/`
and the `@/*` alias.

### Using brand tokens in Tailwind
- `bg-carbon` / `bg-carbon-{900,800,700,...}` — primary surfaces
- `bg-cobalt-500` — accent / hero / CTA
- `text-ash-{200..500}` — body copy hierarchy
- `font-display` — Space Grotesk (headings)
- `font-mono` — JetBrains Mono (meta strips, file codes)
- `meta-strip` — pre-baked utility for the small uppercase mono pattern

## Deployment summary

`Dockerfile` does two-stage build (Node 20 → nginx 1.27). `cloudbuild.yaml`
runs `docker build → docker push → gcloud run deploy` with substitutions
for service name, region, AR repo, and port. **Cloud Build trigger fires
on push to `main`.** Full runbook: `docs/deployment.md`.

The built site is fully static. nginx serves `/_astro/*` with
`Cache-Control: public, immutable` (the assets are content-hashed) and
HTML with `no-store` (so deploys are visible on next page load).
`/healthz` returns 200 for Cloud Run probes.

## Working with Paul (user preferences)

**Hard rules from Paul** (treat as immutable):

> "You are strictly forbidden from executing any command that permanently
> deletes, drops, or erases files, records, or directories. You must await
> explicit, manual human authorization with double confirmation before any
> executing any such commands."

What this means in practice:
- **Never `rm -rf` anything without explicit confirmation in chat.** Use
  `mv` to rename/move instead. We have leftover `node_modules.bak.*` /
  `package-lock.bak.*.json` files because the sandbox blocked deletion
  during recovery — leave them alone.
- **Force-pushing** is destructive: ask before doing it. We did force-push
  `initial-scaffold` → `main` once, and Paul authorized it via an
  AskUserQuestion confirmation. That was correct procedure.
- **`git push --force` to any branch** = ask first.

**Stylistic preferences:**
- Paul wants **practical and actionable** over theoretical. Show, don't tell.
- He's comfortable granting "creative liberties" — when he does, take them
  and explain the choices afterward so he can flag any.
- He'll say "make X happen" expecting it to be done, not asked about.
- When he provides credentials (PATs, API tokens) inline in chat, use them
  for the operation and reset the remote URL afterward to a token-free form.
  Remind him to revoke the token.

## Sandbox / environment gotchas (recorded so the next agent doesn't re-hit them)

These are **sandbox-specific**, not real bugs:

1. **macOS Documents folder permission**: Paul's Mac blocks Terminal from
   running processes inside `~/Documents/`. Astro's `npm run dev` errors
   with `EPERM uv_cwd`. The fix is granting Terminal Full Disk Access in
   System Settings, OR working out of a folder Terminal already has access
   to (e.g. `~/Desktop/CAP/commonwealth-ai-partners/`).
2. **Sandbox bind-mount on the user's `~/Documents/`**: git's atomic
   rename operations on `.git/objects/` fail with `Operation not permitted`.
   Workaround: do git ops in `/tmp/cap-repo/` (sandbox-internal), then push
   from there. `mv` is allowed, `rm` against bind-mounted paths is not.
3. **npm install timeout in sandbox** (45-second cap): a partial install
   leaves `package-lock.json` corrupted with empty version strings. If you
   hit `Invalid Version: ""` errors, rename the lockfile (`mv` not `rm`)
   and reinstall fresh.
4. **Vite stale cache**: occasional `TypeError: msg.includes is not a
   function` from `cleanupDepsCacheStaleDirs`. Move
   `node_modules/.vite` aside (rename, not delete) and rebuild.
5. **Linux node_modules on macOS**: if you copy a `node_modules` from the
   sandbox to Paul's Mac, the native binaries won't match (rollup,
   esbuild, sharp). Tell Paul to `rm -rf node_modules && npm install`
   on his side. (He has to run the destructive command himself — see
   user preferences above.)

These do **not** affect Cloud Build. Cloud Build runs `npm ci` inside a
fresh Docker layer with no leftover state, so the production build path
is clean.

## Decision log (why we chose what we chose)

Things a future agent should NOT re-litigate without a strong reason:

- **Astro + React + Tailwind + shadcn** instead of Next.js or plain HTML.
  Astro's static-first model is the right fit for a marketing site
  (lower JS payload, faster TTFB, simpler deploy). React is in for the
  shadcn primitive ecosystem.
- **Static + nginx on Cloud Run** instead of SSR mode. No dynamic content
  on the site today; static is faster, cheaper, simpler.
- **Cobalt blue (`#2E5BFF`)** instead of safety orange. Paul picked this
  on round one for differentiation from Enerblock (the visual reference)
  and to read more "technical/premium."
- **Fixed cobalt top bar** instead of an absolute-only-on-hero header.
  Paul asked for this in round 8 — wanted the bar persistent across
  scroll, blending into the cobalt hero and visible above dark content.
- **Industries pulled from home page**. The pivot to a capability-led
  pitch ("What We Deploy") made vertical positioning redundant on the
  home. The component is still in the repo for future detail pages.
- **Vanilla JS for the slide-out menu** instead of Radix Dialog. Avoided
  adding `@radix-ui/react-dialog` as a new dep when the requirement was
  satisfied by ~50 lines of vanilla JS + native `<details>`. Reconsider
  if more complex modal/dialog patterns get added later.
- **Stub.astro layout** for "coming soon" pages. Lets a single page file
  be 4 lines while still feeling on-brand. Reuses the cobalt hero
  treatment.

## What's next (open work, in rough priority)

### Soon
- **Real Cal.com link** — Contact card and the `Book a Systems Audit`
  CTA both point at `https://cal.com/commonwealthai`. Confirm whether that
  URL is provisioned or update to the real one.
- **Real LinkedIn URL** — Footer + SiteMenu both use `https://linkedin.com`
  as a placeholder. Update when the company page is set up.
- **Custom domain mapping** — Cloud Run service is currently on a
  `*.run.app` URL. Map `commonwealthai.partners` (or whatever the real
  domain is) via Cloud Run → Custom Domains.
- **Email setup** — `hello@commonwealthai.partners` is referenced in
  Footer + Contact + SiteMenu. Confirm the mailbox exists.

### Medium
- **Real case studies** — replace the three placeholder cards in
  `src/components/sections/CaseStudies.astro` and the matching dynamic
  stubs in `src/pages/case-studies/[slug].astro` with actual write-ups.
- **Detail pages for the 4 deployments** — each card on the home page
  links to a stub. Build out real content pages that double as SEO
  landing pages.
- **404.astro** — currently nginx returns its default 404. Add
  `src/pages/404.astro` for an on-brand miss page.
- **Privacy + Terms** — real legal copy from counsel.

### Later
- **Ad landing pages** — Paul mentioned wanting paid-traffic landing
  pages without the global header. Use `<Layout showHeader={false}>`
  per the convention above.
- **Industry detail pages** — when Industries is reactivated, build
  `/industries/{slug}` content pages.
- **Blog / writing** — the company plans to publish, but no infra is
  scaffolded yet. Astro Content Collections at `src/content/blog/*.md`
  with `[slug].astro` route would be the path.
- **Analytics + form handling** — no analytics yet; no form on the site
  (just a `mailto:` and Cal link). When forms are needed, Astro server
  endpoints + Cloudflare Turnstile is a reasonable starting stack.

## Useful commands cheat sheet

```bash
# dev / build
npm run dev
npm run build
npm run preview

# git push (Paul's GitHub repo)
git push origin <branch>
git push origin <branch>:main         # promote to main

# Cloud Build (manual trigger from local)
gcloud builds submit --config=cloudbuild.yaml --substitutions=_SERVICE=foo

# Verify deploy
gcloud run services describe commonwealth-ai-landing --region=us-east1 --format='value(status.url)'
```

## Where to look first when picking up a task

| If the task is about... | Start here |
|---|---|
| Copy / voice / tone | `docs/brand.md` |
| Visual tokens / colors / type | `docs/brand.md` + `tailwind.config.mjs` |
| Adding a section to home | `src/components/sections/` + `src/pages/index.astro` |
| New stub or detail page | `src/layouts/Stub.astro` + `src/pages/services/[slug].astro` for the dynamic-route pattern |
| Header / menu behavior | `src/components/Header.astro` + `src/components/SiteMenu.astro` |
| Deploy issues | `docs/deployment.md` |
| Anything strange about npm / git / install | "Sandbox gotchas" section above |
