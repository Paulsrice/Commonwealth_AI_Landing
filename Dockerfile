# syntax=docker/dockerfile:1.6
#
# Two-stage build:
#   1. node:20-alpine → install deps + run `astro build`
#   2. nginx:1.27-alpine → serve the resulting static dist/ on $PORT
#
# Cloud Run injects PORT (default 8080). nginx 1.19+ envsubst expands
# ${PORT} in /etc/nginx/templates/*.template at container start, scoped
# by NGINX_ENVSUBST_FILTER so we don't accidentally clobber $uri / $host.

# ---- 1. Build stage --------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install deps with deterministic resolution from the lockfile
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Copy the rest of the source and produce the static site
COPY . .
RUN npm run build

# ---- 2. Runtime stage ------------------------------------------------
FROM nginx:1.27-alpine AS runtime

# Cloud Run sets $PORT; we listen on it
ENV PORT=8080
# Restrict envsubst so it only substitutes ${PORT}, not nginx vars like $uri
ENV NGINX_ENVSUBST_FILTER=^PORT$

# nginx auto-substitutes env vars in any *.template here at startup
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Static site
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

# Default nginx ENTRYPOINT runs the envsubst step then exec's nginx -g 'daemon off;'
