# Production: Strapi Cloud + Vercel

This repo is a monorepo: Strapi lives in `backend/`, the Next.js site in `web/`. Use **Strapi Cloud** for the CMS and **Vercel** for the public site.

## 1) Strapi Cloud (`backend/`)

### Create the project

1. In [Strapi Cloud](https://cloud.strapi.io), create a project and connect your **Git** provider (GitHub or GitLab).
2. Select this repository.
3. Set **Base directory** to `backend` (required for this monorepo).
4. Choose the **branch** to deploy (e.g. `main`) and enable **deploy on push** if you want automatic deploys.
5. Pick a **region**, then deploy.

Strapi Cloud provisions the database and core secrets. You normally do **not** add `DATABASE_*` unless you attach an external database (see Strapi docs).

### Environment variables (Strapi Cloud dashboard)

In the project **Environment variables** (or advanced settings during setup), add:

| Variable | Value |
|----------|--------|
| `FRONTEND_URL` | Your Vercel site origin(s), comma-separated, **no trailing slashes**. Example: `https://your-app.vercel.app,https://www.yourdomain.com` |

This app reads `FRONTEND_URL` in `backend/config/middlewares.ts` for CORS. After you change your Vercel URL or add a custom domain, update `FRONTEND_URL` and redeploy Strapi if needed.

Optional: if your Strapi config expects it, set `PUBLIC_URL` to the **public Strapi API URL** from the Strapi Cloud dashboard (no trailing slash). Strapi Cloud may inject this; match what the [Strapi Cloud deployment](https://docs.strapi.io/cloud/getting-started/deployment) docs describe for your project.

### After the first successful deploy

1. Open the **Strapi admin** URL from the Strapi Cloud project page.
2. **Settings → API Tokens** → create a token (e.g. read-only) for the Next.js app.
3. **Settings → Users & permissions** → under **Public** (or the role the API uses), enable **find** / **findOne** (and any other actions) for the content types the website needs (`site-setting`, `menu-item` categories, etc.).
4. Note the **public Strapi base URL** (e.g. `https://<your-project>.<region>.strapiapp.com` or a custom admin/API domain from Strapi Cloud). You will use it as `STRAPI_URL` in Vercel.

### Monorepo note

Pushes that only change `web/` can still be ignored by Strapi Cloud if you configure paths; if Strapi Cloud rebuilds on every monorepo push, that is expected unless you add ignore-path settings in the provider. Vercel can still deploy `web` independently.

## 2) Vercel (`web/`)

1. **New project** → import the same Git repository.
2. **Root Directory:** `web` (not the repo root).
3. **Framework Preset:** Next.js (default).
4. **Output Directory:** leave **empty** (default for Next.js).
5. Add **Environment variables** (Production; add Preview if you use preview deploys against the same Strapi instance):

| Variable | Example / notes |
|----------|------------------|
| `STRAPI_URL` | Full base URL of Strapi Cloud, no path, no trailing slash: `https://xxxx.strapiapp.com` |
| `STRAPI_HOST` | **Hostname only** (same as `STRAPI_URL` without `https://`) — used by `next.config.ts` for `next/image` remote patterns. |
| `STRAPI_API_TOKEN` | Token from Strapi admin (server-only; never `NEXT_PUBLIC_`). |
| `NEXT_PUBLIC_SITE_URL` | Public marketing URL: your Vercel production URL or custom domain, e.g. `https://your-app.vercel.app` |

6. Deploy. If the site fetches data only on the server, CORS is less critical; still keep `FRONTEND_URL` in Strapi correct for admin and any browser-side calls.

### Previews (optional)

Each Vercel preview has its own `*.vercel.app` origin. For strict CORS, add each preview base URL to `FRONTEND_URL` in Strapi Cloud, or use a pattern your team accepts (e.g. only test previews with Production URL in Strapi). For local development, `http://localhost:3000` is already allowed in the default CORS list in this repo’s middleware (see `backend/config/middlewares.ts`).

## 3) Order of operations

1. Deploy **Strapi Cloud** with **Base directory** `backend` and set `FRONTEND_URL` to your final (or temporary) Vercel URL.  
2. In Strapi admin: permissions + API token + content.  
3. Deploy **Vercel** with `web` as root and all env vars from step 2.  
4. Verify images and media: uploads are served from Strapi; `STRAPI_HOST` must allow your Strapi Cloud asset host in `web/next.config.ts` (it uses `STRAPI_HOST` and defaults).

## 4) Other hosting (optional)

- **Self-hosted Strapi (Docker, VPS, Railway, …):** see `backend/Dockerfile` and set `DATABASE_CLIENT=postgres` on hosts without a persistent disk.  
- **Local** development: copy `backend/.env.example` and `web/.env.example` to local `.env` / `.env.local` files (never commit secrets).

**Troubleshooting:** Vercel 404 on all routes → Root Directory is `web`, Output is empty. Empty CMS data or 403 → `STRAPI_API_TOKEN`, Strapi **Public** role permissions, and `STRAPI_URL` must match the Strapi Cloud instance URL.
