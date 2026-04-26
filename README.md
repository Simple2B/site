# Simple2B Website

Static marketing site for [simple2b.com](https://www.simple2b.com), built with Next.js 14 (App Router, static export) and deployed to GitHub Pages.

## Development

```bash
cd front/
yarn install
yarn dev        # dev server at http://localhost:3000
yarn build      # static export → front/out/
yarn lint
yarn test
```

CSS (Tailwind) compiles automatically during build. To watch during development:

```bash
yarn css-watch
```

## Content

All dynamic content lives in static JSON files — edit and push to update the site:

| File | Content |
|------|---------|
| `front/src/data/cases.json` | Portfolio cases (en + de entries per case) |
| `front/src/data/feedbacks.json` | Client feedback quotes |
| `front/src/data/stacks.json` | Technology stack list |

Translation strings are in `front/src/i18n/dictionaries/en.json` and `de.json`.

## Languages

URL-based routing: `/en/*` and `/de/*`. Switch via the flag icon in the navbar.

## Deployment

Push to the `deploy` branch → GitHub Actions builds and deploys to `gh-pages` → served at [www.simple2b.com](https://www.simple2b.com).

```bash
git push origin HEAD:deploy
```

## Versioning

```bash
./site-version.sh patch   # or minor / major
```

Bumps version in `front/package.json` and creates a git tag.

## Images

Static assets (images, logos) are served from `static.simple2b.de` via CloudFront.
