# Deploying to cPanel shared hosting

Short guide for the Mico site (Vite + React SPA). The site is **static files**
— cPanel just serves them; the Convex backend stays in the cloud.

## Prerequisites

- Node.js ≥ 20 + npm available where you build (local machine, CI, or cPanel's
  "Setup Node.js App" if the host provides it).
- Your Convex deployment URL (from the Convex dashboard, e.g.
  `https://grateful-sockeye-741.convex.cloud`).

## Steps

### 1. Build with the production env vars

The Convex URL is **baked into the JS at build time** — the build MUST see it:

```bash
npm install
VITE_CONVEX_URL=https://grateful-sockeye-741.convex.cloud \
VITE_SITE_URL=https://www.mico.edu.jm \
npm run build
```

Output goes to `dist/`.

### 2. Upload `dist/` to the server

- Site root install: copy the **contents** of `dist/` into `public_html/`
  (via cPanel File Manager → Upload, or FTP — not the `dist` folder itself).
- Subfolder install: create `public_html/site/`, upload `dist/` contents there.

### 3. Add the `.htaccess`

Copy `deploy/cpanel/.htaccess` from this repo into the same directory as
`index.html` on the server (upload it as `.htaccess` — File Manager shows
hidden files via the gear icon → "Show Hidden Files").

This file provides:
- **SPA fallback** — `/programmes/...`, `/admin/applications/...` etc. work on
  refresh and when shared as links (equivalent of the `vercel.json` rewrite).
- **Security headers** (clickjacking, MIME sniffing, HSTS).
- **Cache rules** — hashed assets cache for a year; `index.html` stays fresh so
  new deploys go live immediately.

### 4. HTTPS

Use cPanel **AutoSSL** for the certificate, then make sure your URLs are https:
the Convex auth flow and the `VITE_SITE_URL` env var should point at the final
https domain.

### 5. Verify

- Load the homepage → full site renders.
- Refresh a deep link (e.g. `/programmes`) → no 404.
- Open the browser console → no `Convex` errors. If you see
  "Convex backend not configured", the build was made **without**
  `VITE_CONVEX_URL` — rebuild with step 1 and re-upload.

## Common pitfalls

| Symptom | Cause / fix |
|---|---|
| Blank page / "Convex backend not configured" | Build ran without `VITE_CONVEX_URL` — rebuild with it set |
| `404 Not Found` when refreshing a route | `.htaccess` missing or the RewriteRule points at the wrong `/index.html` path |
| Stale site after uploading | Browser cached `index.html` — hard refresh; cache headers already force fresh HTML |
| WordPress conflict | Don't share a document root — see the WordPress section in `.htaccess` |

## Checklist for the handover

- [ ] `dist/` contents uploaded to `public_html/`
- [ ] `.htaccess` uploaded beside `index.html`
- [ ] AutoSSL enabled, URLs use https
- [ ] Homepage + a deep link both render
- [ ] Admin sign-in works (`/auth`, `/admin/applications`)

> Note: this folder (`deploy/cpanel/`) is documentation — the `.htaccess` and
> README live in the repo, the built `dist/` does not.
