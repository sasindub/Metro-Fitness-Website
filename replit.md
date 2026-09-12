# Metro Fitness

A responsive marketing website for Metro Fitness in Barigama, Sri Lanka, focused on clear membership enquiries and local discovery.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/metro-fitness/src/App.tsx` — single-page website structure, content, and interaction links
- `artifacts/metro-fitness/src/index.css` — site tokens, typography, animation, and responsive styles
- `artifacts/metro-fitness/public/images/` — local training and gym imagery
- `artifacts/metro-fitness/index.html` — SEO metadata and favicon

## Architecture decisions

- The first version is frontend-only; public gym information is static and verified from the supplied Google listing.
- WhatsApp is the primary conversion path, with prefilled enquiry messages for general membership and package-specific questions.
- Google Maps is used as the source of truth for directions and reviews; the page embeds the map and links out for the live listing.
- Package names are enquiry-led rather than showing invented prices or unsupported offers.

## Product

- Hero with direct WhatsApp and phone CTAs
- Gym positioning, hours, location, gallery, membership paths, reviews, and map
- Responsive mobile navigation and floating WhatsApp action
- SEO metadata and reduced-motion support

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
