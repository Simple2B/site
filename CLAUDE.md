# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo Structure

Monorepo: Next.js static frontend (`/front`) + FastAPI backend (`/back`, legacy — no longer connected to frontend).

```
/front   — Next.js 14, TypeScript, Tailwind — static export → GitHub Pages
/back    — FastAPI, SQLAlchemy 2.0, PostgreSQL (legacy, not used by frontend)
```

## Commands

### Frontend (`/front`)

```bash
yarn dev          # dev server (port 3000)
yarn build        # yarn css && next build  → outputs to front/out/
yarn lint         # ESLint
yarn test         # Vitest
yarn css          # compile Tailwind (prod)
yarn css-watch    # watch Tailwind
```

### Backend (`/back`)

```bash
poetry install
poetry run pytest
poetry run flake8 .         # max-line-length: 120
```

### Versioning

```bash
./site-version.sh patch   # bumps version in package.json + pyproject.toml, creates git tag
```

## Frontend Architecture (`/front/src/`)

**Static export** — `output: 'export'` in `next.config.js`. No server runtime.

- `app/` — Next.js App Router
  - `app/page.tsx` — root redirect to `/en`
  - `app/[lang]/page.tsx` — home (en/de)
  - `app/[lang]/(content)/` — inner pages: about, cases, cases/[slug_name], services, process, privacy-policy
- `components/` — React components
- `data/` — **static JSON data**: `cases.json`, `feedbacks.json`, `stacks.json` — edit these to update content
- `lib/staticData.ts` — helpers: `getCases()`, `getCaseBySlug()`, `getStacks()`, `getFeedbacks()`
- `types/data.ts` — TypeScript types for static data (`CaseData`, `FeedBackData`, `StackData`)
- `i18n/` — en/de dictionaries (JSON). `getDictionaryByLang(lang)` — main i18n helper
- `hooks/` — custom React hooks

Path alias `@/` → `src/`.

## Language Routing

URL-based: `/en/*` and `/de/*`. All pages export `generateStaticParams()` returning `[{lang:'en'},{lang:'de'}]`. No cookies, no server-side detection. Language toggle: `TranslationToggle` component does client-side `router.push`.

## Static Content

All dynamic data (cases, feedbacks, stacks) lives in `front/src/data/*.json`. To update content: edit JSON files and push to `develop` — CI rebuilds and deploys.

**cases.json** fields: `lang` (en|de), `is_main` (bool), `title`, `slugName`, `description`, `subTitle`, `projectLink`, `role`, `stacksNames[]`, `screenshotsUrls[]`, `mainImageUrl`, `previewImageUrl`.

## Images

Served from S3 via CloudFront (`static.simple2b.de`). `next.config.js` has `images.unoptimized: true` (required for static export).

## CI/CD

- Push to `develop` → `deploy-pages.yaml` → `yarn build` → deploy to `gh-pages` branch → `web.simple2b.com`
- Requires GitHub Pages enabled on repo and `GA_COM_ANALYTICS_ID` secret (optional)

## Backend (`/back`) — legacy

```bash
# Still operational independently, not connected to frontend
alembic upgrade head
alembic revision -m '<msg>' --autogenerate
```
