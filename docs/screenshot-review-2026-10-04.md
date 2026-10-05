# Platform and fleet screenshot review

Reviewed October 4, 2026 against the team's feedback. The visual layout and main hero wording are preserved.

## Current portal capture update

The authenticated current Redtail portal was captured on October 4, 2026. This update supersedes the earlier decision to use legacy laptop/Fleet App artwork as the first visual. Platform & Apps and Fleet Management now use `/platform-screenshots/current/fleet-map.jpg` first. The Platform prediction, odometer, behaviour, maintenance and alert stories also use current captures. White Label, OEM and Technology use the current Fleet Map where their copy describes the web portal.

The parent reviewer confirmed the live source and performed the browser captures; the saved public images were independently inspected. These are crops of the real browser interface, with no generated/reconstructed UI or invented values. Crops omit account headers, VIN/IMEI/device identifiers and private street-address detail. Relevant public map labels, attribution and venue names remain. Product states and historical records are examples visible at capture time, not promises of fleet outcomes or feature testing.

| Public file under `public/platform-screenshots/current/` | Dimensions | Actual content / limitation |
| --- | --- | --- |
| `fleet-map.jpg` | 1380 × 763 | Current Fleet Map with location/device controls, active/engine-off/offline filters, trails/heatmap controls, geofence tools, map/satellite switch and replay controls. Used first on Platform & Apps and Fleet Management. |
| `odometer.jpg` | 1126 × 295 | Current odometer calculation from the entered reading plus journey distances, projected mileage and reading-entry control. Supports mileage product context; it is not a tax form or IRS compliance demonstration. |
| `location-prediction.jpg` | 1126 × 424 | Location Prediction confidence by weekday/hour based on historical location patterns, with the actual portal legend and time/data context. This is direct prediction proof; it does not show ETAs. |
| `maintenance-calendar.jpg` | 1338 × 483 | Current Vehicle Maintenance Upcoming/History and calendar view. No maintenance items are populated for this inspected view, so its caption describes the interface rather than activity outcomes. |
| `driving-behaviour.jpg` | 1126 × 1033 | Current behaviour filters/counts, location heatmap and day/hour heatmap. The complete source shows the actual event set and spatial/time context. |
| `journey-activity.jpg` | 1126 × 345 | Verified clean Activity Calendar with journey/distance/duration controls, exports, filters and selected-period totals. The recaptured heading is unobscured, and the website ratio matches the native image. |
| `alert-channels.jpg` | 1126 × 223 | Current email, SMS and push notification controls. No send/delivery test is claimed. |
| `circuit-directory.jpg` | 1324 × 500 | Current portal directory with actual venue, session, vehicle, lap and historical-activity records. Public venue addresses are not private vehicle/address details. GPS-derived lap timings are approximate. |

Battery inspection returned no vehicle-battery data for October or September, and the selected device has no internal battery. No empty live battery view or invented replacement chart was marketed. `/platform-screenshots/fleet-battery-journeys-legacy.png` remains as accurately captioned established Fleet App battery/status artwork. The empty current policy-associations view is not suitable benefit proof; policy-administration copy stays scoped to data and integration with insurers’ existing workflows.

Source capture, code placement, latest lint/build and core browser/font/layout checks are verified locally. `npm run lint` exited 0. The Node 22 production build under Next.js 16.3.0 exited 0, passed compilation/TypeScript and generated 159 static pages. At 1440 × 1000 and 390 × 844, Fleet, Platform, UBI, White Label, Technology, OEM and Rental used the Merriweather/fallback/Georgia heading stack and Verdana/Geneva/Arial body stack, with no horizontal overflow or pure decorative numeric labels. Both fresh Fleet Map hero images were confirmed loaded, and Platform's first figure retained its native ratio with `object-contain`.

Latest local proof images were independently viewed: `output/playwright/final-fleet-desktop-2026-10-04.jpg`, `final-platform-desktop-2026-10-04.jpg`, `final-fleet-mobile-2026-10-04.jpg`, and `final-platform-location-mobile-2026-10-04.jpg`. The last frame covers location headings/details rather than the complete prediction image; the actual prediction source image was independently inspected separately.

The final mobile image checks confirmed all seven current Platform body images loaded with `object-fit: contain`, native proportions and full-image links: driving behaviour, alerts, maintenance, journey activity, odometer, location prediction and circuit directory. Results are saved in `output/playwright/final-brand-screenshot-review-2026-10-04.json`. Its initial immediate-navigation Platform hero result was unsettled (`loaded: false`); the later `platformHeroConfirmation` verified `loaded: true` at approximately 1022 × 565 in the 1440px viewport. That later observation is the final hero load result. Local implementation and screenshot/font/browser review are complete. No push or production deployment was performed, and the live marketing website was not verified as changed.

Capture SHA-256 values at this review snapshot, including the clean journey recapture. The machine-readable dimensions/hash manifest is `docs/current-portal-captures-2026-10-04.json`; it contains no private portal query identifiers.

```text
70592520a92fa3383ac65ac2b04bbda5bfe0cb4a9ba140aefe55088595831722  fleet-map.jpg
752e5c11cc685b90839b46f84cb93493fc04f1675819487c3eb5aa7fb0ba5721  odometer.jpg
4acfc17b44e6573fdc6f1a996252e2f4aa6466348f3c42bf5c0ababceaec3579  location-prediction.jpg
c5cd925baa0f5826d2ad178df6303dffa9a76fc35cd712f6b854dea74130daee  maintenance-calendar.jpg
2f7fa904b514c3b496a3ab39dbbd16cf640ccb338ea2cacd489bf613849aa71f  driving-behaviour.jpg
641d396e7a3309b8ac920ccf0aaaac313da5cdd3de058019a1e99aa6873e6947  journey-activity.jpg
c293ab83aba7a629b20f51ba4949d58d6746d51b6da039cbe9611ba4d9a6c761  alert-channels.jpg
61900989e40371f7194b5a1a039275f2c63d48075d46acb510f95539bf39ce1f  circuit-directory.jpg
```

## Earlier changes and asset decisions

The following sections preserve the earlier source review and local QA history. References to the laptop/app artwork as the “first” choice describe that earlier stage and are superseded by the current portal update above.

- The first product visual on Platform & Apps and the Fleet Management hero now uses the established Redtail portal and Fleet App artwork, fully visible at its original 3:2 ratio.
- The Journey Showcase remains in the journey replay section. It now uses `object-contain` at its original wide ratio on mobile as well as desktop, preserving the complete interface and map attribution.
- No product interface, vehicle count, fleet metric, map, or screenshot was generated or redrawn for these changes.

## Earlier asset provenance and decisions

| Asset | Evidence | Decision |
| --- | --- | --- |
| `public/platform-screenshots/redtail_lap-mob.png` | Exact SHA-256 match to `/Users/aldold/Documents/dev/redtail_website/redtail_web/public/redtail_lap-mob.png`. Existing old-site code uses that artwork in `components/industries/CTA.tsx`. Added to this repository in commit `ad47a92ac858ce5ca7792ca7082850ed6b363f71` on April 19, 2026. | Earlier first choice, now superseded by the current Fleet Map. Remains useful as established portal/Fleet App artwork in the mobile-app context. Preserve the complete artwork and original device frames/map attribution. |
| `public/platform-screenshots/journey-showcase.jpg` | Existing repository asset added in `28e5c49f94375d799454812a300a99da6c2a9cf6` on September 2, 2026. Native dimensions 1918 × 848. The view is predominantly water and a 3D map, with a Journey Showcase summary. | Keep in its specific journey replay context; remove from the two first product visuals. This asset alone does not establish that the classic fleet portal was being shown. |
| `public/platform-screenshots/fleet-map-controls.jpg` | Existing repository crop added in `28e5c49f94375d799454812a300a99da6c2a9cf6`. Native dimensions 385 × 470. Only a controls panel is visible. | Supporting detail only. It does not show a complete fleet management screen and is unsuitable as the main hero visual. |
| Old-site `public/platform/web-app-ss.png` | Inspected in the old website checkout. Shows established portal navigation, an incident replay map, vehicle impact diagrams, and accelerometer/gyro graphs. | Do not substitute for the fleet hero: this is an incident analysis view. |
| Old-site `public/platform/hero-platform.png` | Inspected in the old website checkout. Composite includes incident analysis, a geofence dialog, app store artwork, and mobile screens. | Do not use first: the busy composite and several different workflows make the primary product story less clear. |

SHA-256 of both copies of `redtail_lap-mob.png`:

```text
bfb49ae13211da5375559a33eb87a71abff0a7ea40026b123dbf0cc4acea0456
```

## Earlier verification boundaries

The selected artwork is established Redtail material; it is not labeled as a fresh capture of the current portal. This review did not sign in to customer accounts or test portal functions. A current portal capture would need a sanitized demonstration fleet and verified product access. Existing main hero copy remains intact; only visual labels, alt text, and captions were updated to describe the actual selected artwork.

The installed Next.js image guide was read before editing. The images retain responsive `sizes`, reserved aspect ratios, and eager loading for the first visual.

Focused local browser review at `http://localhost:3000` confirmed both first visuals load and use `object-fit: contain`; Platform & Apps and Fleet Management have no horizontal overflow at 1440px or 390px. The Fleet desktop view and both mobile product visuals were inspected. Their original H1 wording remains intact. Targeted ESLint and `git diff --check` passed. Browser captures are under `output/playwright/` with `authentic` and `2026-10-04` in the filenames. These are local review artifacts, not deployment evidence.

## Customer-facing report and location assets

Three unchanged original image files were copied from the committed old website tree at `47acfca3438a5e67a7a07e43c5ed7d21c8e0b58d`. The old checkout contains unrelated working changes; `git show HEAD:<path>` was used to copy committed bytes rather than the working files. Each copy's SHA-256 also matches the existing source file on disk.

| New public asset | Committed old source | Dimensions | What is actually visible |
| --- | --- | --- | --- |
| `platform-screenshots/fleet-trip-history-legacy.jpg` | `public/app-bg.jpg` | 1448 × 745 | Legacy Redtail Fleet Mapping & Location interface: mapped route, moving/parked trips, trip start/end, duration, distance, and trip points with time, location, heading, and velocity. Suitable for trip-history and distance/reporting context. It is not an odometer log, tax document, or a fresh current-portal capture. |
| `platform-screenshots/fleet-battery-journeys-legacy.png` | `public/platform/recentjourneys.png` | 791 × 528 | Existing Fleet App detail crop, with the identifier already blurred in the source. Vehicle/device battery status and a highlighted recent-journeys entry are visible. It supports a modest customer-facing battery/status mention, not diagnostics or internal fault monitoring. The image is an existing documentation-style crop, not a full-screen capture. |
| `platform-screenshots/fleet-map-markers-legacy.png` | `public/platform/map-devices.png` | 649 × 376 | Existing map detail crop with vehicle and event markers. Suitable for fleet location context. It does not show predicted location, ETA calculations, satellite view, or map overlays. |

The committed `components/platform/PlatformLandingPage.tsx` references `public/platform/recentjourneys.png` in its Time on Site topic and `public/platform/map-devices.png` in its location topic. The component's old ETA wording should not be reused: the team's October 4 notes explicitly say Redtail does not provide ETAs. `public/app-bg.jpg` is present in the committed old asset library; its specific UI/topic recommendation is based on visible screenshot content rather than a current active component reference.

Hashes:

```text
d1b46e03fa851862c43e9149e22d46dbb9363df4e347a2a22453fe8ec0c6e38e  fleet-trip-history-legacy.jpg
2042ebdff8a7e31ad42e91b7746e335fbddf244391eca861a73028da3669b702  fleet-battery-journeys-legacy.png
b04f785398f42bf766430dc2469a6dd13fc410c8e612bb25b352911a19f918d7  fleet-map-markers-legacy.png
```

Other reviewed original assets were excluded from this delivery:

- `trip-history.png` is a laptop mockup of incident analysis, despite its trip-history name.
- `alert-summary.png` is existing laptop marketing artwork around a legacy chart; it is not a raw report screen.
- `speed-bg.jpg` is a genuine high-speed email-report image but exposes a recipient name and device identifier, so it was not copied for new use.
- `platform/2.png`, `platform/4.png`, and `platform/6.png` use tilted phone mockups; `platform/7.png` adds explanatory marketing graphics. They contain useful historical journey, odometer, battery, and geofence evidence, but are not raw screenshots.
- `platform/track-1.png`, `platform/track-2.png`, and `platform/track-3.png` are photography/screenshot composites.
- `app-2.png` and `app-3.png` show satellite/geofence UI inside device artwork. No standalone raw satellite/map-overlay screenshot was found in the committed asset library.

No newly generated UI, edited product values, crops, or marketing composites were produced for these three copies.

## Additional benefit proof after the user's follow-up

The user authorized adding the missing benefit proof and using the existing platform screenshots. This expands the selection to unmodified original public Redtail artwork that contains genuine established app views. The earlier exclusions above describe the first delivery, which prioritized raw screenshots; they do not mean the original public device artwork is fabricated.

Three additional images were copied directly from committed old-site tree `47acfca3438a5e67a7a07e43c5ed7d21c8e0b58d`. They contain the original device frames and white padding. No pixels, product values, interface elements, identifiers, or crops were changed.

| Selected new asset | Original committed asset | Dimensions / ratio | Recommended placement and supported visible topic |
| --- | --- | --- | --- |
| `platform-screenshots/fleet-odometer-battery-app.png` | `public/platform/4.png` | 1638 × 2319; 0.70634 | Mileage/odometer and battery section. The established Fleet App visibly shows Device odometer, Set Reminder, vehicle-battery states, and device-battery states. The vehicle label is already blurred in the original. This is a device artwork view, not a tax form or proof of a guaranteed tax saving. |
| `platform-screenshots/fleet-satellite-app.png` | `public/app-2.png` | 3000 × 2000; 1.5 | Location-intelligence section. The established Fleet App shows satellite imagery, vehicle/event markers, activity filters, and fleet status tiles. This does not show predicted location or an ETA. |
| `platform-screenshots/fleet-geofence-app.png` | `public/app-3.png` | 3000 × 2000; 1.5 | Location-intelligence/geofencing section. The established Fleet App shows Geofence Details with a radius and entry/exit options over a satellite map. It supports a geofence configuration story; it does not demonstrate dispatch, route optimization, or tested remote-disable controls. |

Keep accurate artwork captions and preserve the complete phone UI. The portrait odometer/battery visual suits a side-by-side story with restrained width. Centered CSS `object-cover` at a 1.08 display ratio removes its excess white canvas while keeping the full phone; its bottom edge is close to that frame boundary, so do not tighten the ratio further. The satellite and geofence artwork uses two adjacent portrait views: centered `object-cover` at a 0.52 display ratio removes blank side padding while preserving the original phones, map content and attribution. These are display choices only; the public image files retain their complete original bytes. Their UI states and numbers are illustrative states in historical Redtail material, not measured customer outcomes or fresh live readings.

Hashes:

```text
f1d560548cbd9d35139abd85f989175c97dceba9dc95c3e95c91ff645fecdf2e  fleet-odometer-battery-app.png
fcdf27372681368386a97da29b823b5c307f588d35911a17a097ea307a2a2db8  fleet-satellite-app.png
eb046025937bf8dc6c20395feebaf340253f0e1eab9ebad00f755256e302c3c8  fleet-geofence-app.png
```

### Wider local screenshot inventory

The source audit directory `/Users/aldold/Documents/Codex/2026-08-26/u-x20/outputs/redtail-portal-audit/screenshots` contains **136 PNG captures**, rather than only the seventeen images already served in the current website. Its `SCREENSHOT-CATALOG.md` classifies these as private audit evidence and distinguishes useful marketing concepts from images ready for publication. The captures were inspected as source evidence; none of the private raw screenshots were copied into the served public directory.

Relevant original candidates and limitations:

| Original audit image | Product evidence | Why it was not copied publicly |
| --- | --- | --- |
| `28-fleet-map.png` | Complete current-generation Fleet Map interface, status filters, vehicle layers, geofence controls, map/satellite switch, and replay controls. Best future fleet-overview candidate. | Named fleet and vehicle labels plus precise recorded locations are visible. Needs a clean demonstration capture or sanitized source. |
| `29-fleet-map-device-card.png` | Same fleet map with a location/status detail card. | Contains a vehicle label and precise location/address. |
| `17-device-details.png` | Device overview with odometer, battery, location/prediction navigation and vehicle information. | Contains VIN, registration, device and SIM identifiers, plus internal tool/navigation areas. |
| `19-device-journeys.png` | Full journey history with activity calendar, trips, start/end locations, mileage and events. | Contains named vehicle and detailed location history; the extremely tall full-page image is also poor first-view media. |
| `22-device-location.png` | Current and frequent locations, plus location/prediction navigation. | Contains confirmed home/work labels, precise addresses and device identity. It is not a screenshot of the Prediction results. |
| `07-dashboard.png` | Fleet dashboard. | Includes internal fault, refurbishment/repair, installation and data-integrity tiles; conflicts with the team's scope comments. |
| `134-mobile-fleet-map.png` | Mobile attempt at the fleet map. | The captured layout is narrow within mostly blank space; unsuitable product proof. |

The separate `/Users/aldold/Documents/dev/redtail_portal/docs/device-details-parity-2026-09-16/02-production-odometer.png` is genuine production UI evidence for entered odometer baselines, calculated distance, reading history, and progression. It contains a VIN and device identifier; the parity review records that source screenshots should stay in their authorized portal context. It was not copied publicly. The adjacent `04-showcase-overview.png`, `05-showcase-activity.png`, and `06-showcase-mobile.png` are explicitly frontend prototype/fixture captures, so they were not selected as authentic product images.

The September source audit documents a Prediction view with an hour-of-week basis, confidence thresholds, and historical data. No clean standalone image of its results was found among the selected local captures. The satellite/map/geofence artwork must not be captioned as a prediction result. Predicted-location copy can be covered accurately without substituting an unrelated image or inventing a confidence/ETA result.

### Earlier first fleet visual conclusion — superseded

At the earlier asset-selection stage, no cleaner already-public full overview of the current-generation portal was found, so `redtail_lap-mob.png` was selected first. `fleet-trip-history-legacy.jpg` was a cleaner raw screenshot alternative, but it depicted a legacy trip/replay workflow rather than a current fleet overview. The private audit's `28-fleet-map.png` remained outside the served public assets. The fresh clean `current/fleet-map.jpg` capture now supersedes that first-image choice; the private audit screenshot was not published.

Further inspected committed originals do not improve that choice: `public/platform-1.png` combines a map/status card, truck render and testimonial headline; `public/fleet-app-bg.jpg` combines car-lot photography with app reminders and braking graphics; and `public/landing/7.png` combines driver photography with app marketing panels. They are historical marketing composites, not clean full fleet screens. `public/platform/mobile-app.png` shows a small demonstration Fleet App view at 301 × 600; it is genuine existing artwork but too small to improve the main hero media.

### Focused review of the added audience routes

Local browser checks of `/industries/auto-oem` and `/solutions/stolen-vehicle-tracking` at 1440px and 390px confirmed HTTP 200, exactly one H1 each, both main images loaded, and body/document width equal to the viewport. Their hero views were visually inspected; captures are in `output/playwright/audience-{auto-oem,stolen-vehicle-tracking}-{1440,390}-2026-10-04.png`. Both routes appear in `components/nav-links.tsx` and the locally served sitemap. No form was submitted. Console errors in the session originated from Cloudflare's challenge iframe diagnostic logger, rather than the route components.

The added Platform mileage, satellite and geofence images were also reviewed at both widths. Their complete phones and product views remain visible at the selected 1.08 and 0.52 frame ratios, including the odometer/battery fields, activity tiles, and satellite attribution. Captures are in `output/playwright/audience-platform-{mileage,satellite,geofence}-{1440,390}-2026-10-04.png`. The mobile location views initially used undersized optimized images. The parent implementation now uses responsive `sizes` of `(max-width: 640px) 290vw, (max-width: 1024px) 145vw, 600px`, which accounts for the wide original canvas being enlarged inside the portrait frame. A focused repeat at 390px fetched width-1200 optimized images for both views, replacing the original width-390 selection. Both updated mobile captures were visually inspected and are sharp, with the complete phone UI still visible.
