# Production readiness runbook

This runbook covers the external configuration and launch proof that cannot be
safely committed to the repository.

## Verified migration state (2026-08-13)

The live domain and the rebuild currently belong to different Vercel projects:

- `redtailtelematics` owns `www.redtailtelematics.com` and is connected to the
  legacy private repository `tbbzip/redtail_web`. Its current production build
  uses Node.js 20 and the existing SendGrid/reCAPTCHA email flow.
- `redtail-telematics` is connected to this repository,
  `tbbzip/redtail_telematics`, but owns only the Vercel-generated domain. It has
  no production lead-delivery environment variables or custom domain.

The lower-risk migration is to keep the established `redtailtelematics`
project, domains, and rollback history; connect it to this repository; select
Node.js 22; add the environment contract below; deploy a Preview; and promote
only after the acceptance checks pass. Moving the domains to the rebuild
project is possible, but requires recreating and revalidating more external
configuration.

Do not remove the legacy reCAPTCHA variables until the rollback window closes.
The rebuilt form does not depend on them. The production `SENDGRID_API_KEY` is
marked as needing attention in Vercel and must be rotated or explicitly
revalidated before launch.

## Required environment

Create separately scoped Preview and Production values from `.env.example`.
Every environment requires:

- `SITE_URL` with that environment's canonical HTTPS origin.
- The three `NEXT_PUBLIC_SANITY_*` variables for the approved project and
  dataset.
- `LEAD_DELIVERY_PROVIDER` set explicitly to `sendgrid` or `webhook`.
- `LEAD_RATE_LIMIT_HASH_SECRET` with at least 32 random characters.
- `LEAD_DELIVERY_TIMEOUT_MS` if the default 8-second timeout is unsuitable.

Production fails closed when `LEAD_DELIVERY_PROVIDER` is absent. It never falls
back from one provider to another after a configuration or delivery failure.

### SendGrid mode (migration-compatible)

Set:

- `SENDGRID_API_KEY` to a dedicated, least-privilege Mail Send key.
- `LEAD_EMAIL_FROM=no-reply@redtailtelematics.com` after confirming domain
  authentication and sender approval.
- `LEAD_EMAIL_FROM_NAME=Redtail Telematics Website`.
- `LEAD_EMAIL_RECIPIENTS` to the comma-separated approved recipients. The
  current production routing is `sales@redtailtelematics.com` and
  `aldo@thebrandingbull.com`; each receives an isolated message so addresses
  are not disclosed to one another. In Vercel Production, readiness requires
  that exact two-address set and rejects missing, extra, or substituted
  recipients.

Preview must use a separate API key and a disposable/internal test mailbox. It
must not target either production recipient. The server fails readiness and
delivery unless `VERCEL_ENV=production` while either protected Production
recipient is configured; this also prevents an accidental local send to those
mailboxes. `.env.example` therefore leaves the recipient list blank.
`FORM_TEST_RECIPIENT` from the legacy application is intentionally not consumed
by this application; confirm whether it exists, then retire it after the
migration decision is approved.

### Webhook mode (future CRM/automation)

Set:

- `LEAD_WEBHOOK_URL` to the approved HTTPS ingestion endpoint.
- `LEAD_WEBHOOK_ALLOWED_HOSTS` to its exact comma-separated hostname allowlist.
- `LEAD_WEBHOOK_BEARER_TOKEN` when the receiver supports bearer authentication.

Never expose a provider key, webhook URL, bearer token, or rate-limit secret as
a `NEXT_PUBLIC_*` value. Rotate a credential immediately if it appears in logs,
commits, client bundles, or an unapproved environment.

## Lead-delivery contract

`POST /api/leads` validates and normalizes submissions, rejects untrusted
origins and oversized bodies, applies a process-local fallback rate limit, and
calls only the explicitly selected server-side provider. Accepted payloads
include the form placement, current site path, allowlisted UTM fields, external
referrer origin, and the versioned consent record. The browser does not persist
attribution in cookies or local storage.

The API returns:

- `202` only after the selected provider accepts the request;
- `503 DELIVERY_NOT_CONFIGURED` when its selected provider is not configured;
- `502 DELIVERY_FAILED` for provider rejection, timeout, or network failure.

Provider response bodies and submitted personal data are not returned or
logged. Logs contain only the opaque `requestId` and error code.

### SendGrid guarantees

SendGrid HTTP `202` means accepted for processing; it does not prove inbox
delivery. Email delivery is at-least-once: `request_id` is a correlation value,
not a provider-side deduplication key, so an ambiguous timeout followed by a
retry can create a duplicate message. Do not describe this mode as exactly-once
or as durable CRM capture.

For launch, prove receipt in both approved Production mailboxes and retain a
SendGrid Activity receipt for the canary request ID. Configure alerts or an
operator process for bounces, blocks, drops, and deferred messages. A durable
CRM webhook or outbox with a unique request ID is still required if exactly-once
business capture becomes a requirement.

### Webhook guarantees

The webhook receiver must persist or enqueue before returning 2xx, deduplicate
retries using `Idempotency-Key` or the `requestId` UUID, retain the consent
record, retry transient CRM failures, maintain a dead-letter queue, and alert an
operator. Return non-2xx if durable acceptance did not occur.

## Health, edge protection, and monitoring

`GET` or `HEAD /api/health` returns `200 {"status":"ready"}` only when the
canonical URL, Sanity values, rate-limit secret, explicit provider selection,
and selected provider configuration pass validation. It returns a
non-descriptive 503 otherwise.

The process-local limiter is a fallback, not distributed production control.
Before launch:

1. Add a Vercel Firewall path-and-method rule for `POST /api/leads` in log-only
   mode.
2. Observe legitimate traffic, office/NAT behavior, and bot patterns.
3. Publish a conservative rate limit and tune it from evidence.
4. Keep Vercel DDoS and bot protection enabled.
5. Alert on lead API 5xx responses, repeated 429s, provider failures, and Sanity
   fetch failures without logging names, emails, phone numbers, or companies.
6. Add external checks for `/`, `/api/health`, `/robots.txt`, and
   `/sitemap.xml`, and prove the rollback path.

## Launch checklist

- [ ] Production project is connected to `tbbzip/redtail_telematics`, uses Node
      22, and retains an independently verified rollback deployment.
- [ ] Preview and Production environment values are separately scoped; Preview
      cannot send to production recipients.
- [ ] The SendGrid key is rotated/revalidated, least-privilege, and never exposed
      client-side; the sender domain is authenticated.
- [ ] `/api/health` returns 200 in Production and 503 when a required value is
      removed in a disposable Preview test.
- [ ] A real canary receives `202`, appears in SendGrid Activity, and reaches both
      approved Production mailboxes with the correct consent metadata.
- [ ] Duplicate-email risk and mailbox ownership/retention are accepted, or a
      durable CRM/outbox is implemented instead.
- [ ] Firewall protection is published after a log-only observation period.
- [ ] Runtime alerts, provider-event monitoring, and uptime checks notify the
      correct owner.
- [ ] Sanity member roles, dataset access, and CORS origins are reviewed.
- [ ] Legal approves the privacy, cookie, terms, and consent language.
- [ ] Cookie behavior matches the published policy before analytics or advertising
      tags are introduced.
- [ ] Business owners approve claims, logos, testimonials, addresses, company
      registration details, recipients, and the login destination.
- [ ] A clean checkout passes `npm ci`, `npm run check`, `npm run build`,
      `npm run test:e2e`, `npm audit --omit=dev`, and `npm audit`.
