# Redtail Website

Redtail Telematics' public marketing and Sanity CMS site, built with Next.js App Router, React, Tailwind CSS, and an embedded Sanity Studio.

## Local development

Use the Node version in `.nvmrc`, copy `.env.example` to `.env.local`, then run:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. The Studio is available at `/studio`.

## Main areas

- Marketing routes: `app/(site)/`
- Lead intake endpoint: `app/api/leads/route.ts`
- Non-sensitive deployment readiness: `app/api/health/route.ts`
- Shared lead validation and delivery: `lib/leads/`
- Navigation and reusable sections: `components/`
- Sanity configuration, schemas, and queries: `sanity/`

## Quality checks

The complete local gate matches CI:

```bash
npm run check
npm run build
npx playwright install chromium
npm run test:e2e
npm audit --omit=dev
```

See `docs/production-readiness.md` for deployment variables, lead-delivery requirements, security controls, and the launch checklist.
