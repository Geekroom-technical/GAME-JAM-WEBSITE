# Geek n Jam — Static Site

This folder contains the static HTML page for Geek n Jam. To deploy on Vercel:

1. Rename `Untitled-1.html` to `index.html` (or replace `index.html` with the full file contents).
2. If you have the Vercel CLI installed:

```bash
npx vercel login
npx vercel
```

3. Or push this repository to GitHub and import the repo at https://vercel.com/new.

Notes:
- `vercel.json` is included with `cleanUrls` enabled.
- All assets are referenced via absolute CDN links; no build step required.

If you want, I can rename `Untitled-1.html` to `index.html` for you now so the project is deploy-ready immediately.
