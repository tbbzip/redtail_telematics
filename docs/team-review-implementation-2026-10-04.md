# Team review implementation matrix

Reviewed October 4, 2026 against the current `new_redtail` working tree. This is a local implementation review, not a deployment receipt or a product release statement.

## Current completion boundary

- All sixteen spreadsheet topics are addressed in public copy or intentionally excluded according to the accompanying team email.
- Requested policy-administration and Hours of Service topics are present with limited data/workflow wording. Their inclusion does not establish an independent policy platform, an ELD product, certification, or released integrations.
- Merriweather headings and Verdana body copy are configured in the current code and verified in computed browser styles at desktop/mobile widths. Typography follows the requested brand standard.
- The first Platform & Apps and Fleet Management figures now use a verified current Fleet Map capture from October 4, 2026. The Platform prediction, odometer, driving-behaviour, maintenance, journey-activity and alert figures also use current portal captures. The clean journey recapture is verified; both first hero images are confirmed loaded in the local browser.
- Decorative card/workflow numbers are removed in code. CMS ordinal prefixes are removed for display, and ordered article lists display bullets. Meaningful specifications, dates, reference numbers, pagination and accessible progress information remain.

Current-portal source authenticity, first-image placement and the clean journey recapture are verified. Latest lint, Node 22 production build, computed-font and desktop/mobile route checks pass. All seven current Platform body-image placements loaded with `object-fit: contain`, native proportions and full-image links. Local implementation and review are complete; no push or production deployment has been performed.

## How the team feedback was applied

The attachment provides a sixteen-topic gap analysis, including an extra odometer row after the fifteen items mentioned in the email. The email supplies the product scope: its statements that features are internal, unavailable or not fully tested take precedence over a spreadsheet marker such as “because we built it.” Those markers are not evidence of public availability.

Status meanings:

- **Implemented:** the requested customer-facing wording is present in code.
- **Scoped:** wording is present with a boundary that prevents an unsupported availability or compliance claim.
- **Intentionally excluded:** the team explicitly advised against marketing the topic; related genuine customer benefits may remain.

## Sixteen-topic matrix

| Team topic | Required handling | Current implementation and status | Code evidence |
| --- | --- | --- | --- |
| Trip Replay | Retain the existing journey/replay benefit. | **Implemented.** Journey replay covers route, distance, duration, speed, stops and idle time. Past journeys are also in the Fleet App list. | `components/platform-and-apps/sections.tsx` — `FleetAndJourneyStory`, `fleetAppDetails`; `components/platform-features.tsx` — journey feature. |
| Route planning | Do not sell a route planner that does not work in the portal. Describe trip preparation using recorded journeys. | **Scoped.** The Platform story says previous journeys are a reference for upcoming trips. Sector copy uses completed journeys and preparation, without route-optimization promises. | `components/platform-and-apps/sections.tsx:346`; `lib/industry-sector-copy.ts:107`, `:130`. |
| Vehicle Lookup | Optional/obvious functionality, not a priority standalone benefit. | **Implemented within fleet visibility.** The site describes finding vehicles, filtering activity and focusing on one vehicle. No extra vehicle-lookup selling tile was added. | `components/platform-and-apps/sections.tsx:348`; `fleetAppDetails` at `:40`. |
| Fuel Monitoring | Only available through OBD; cover efficiency and idling rather than imply universal fuel telemetry. | **Intentionally excluded as a general feature.** Driving behaviour, idling and vehicle use support efficiency reviews. No general fuel-monitoring tile is marketed. OBD hardware references do not establish fuel-data availability. | `components/platform-and-apps/sections.tsx` — `DrivingBehaviourStory`; `lib/industry-sector-copy.ts:98`, `:122`, `:259`. |
| Location Intelligence | Restore predicted location and useful map/context topics; do not claim ETAs. | **Implemented with scope and current proof.** Reported/predicted positions, satellite view, geographic overlays, journey/event context and geofencing are present. The current Location Prediction capture shows historical day/hour confidence. Specific weather, traffic, charging-station overlays and ETA promises are not added. Historic satellite/geofence artwork is kept distinct from the current prediction screen. | `components/platform-and-apps/sections.tsx` — `LocationIntelligenceStory`; `/platform-screenshots/current/location-prediction.jpg`; `components/fleet-management-solutions-section.tsx:61`; `lib/industry-pages.ts:203`. |
| Device Diagnostics | No general OBD diagnostics yet; internal device health is not a public selling point. | **Intentionally excluded.** The internal Device Health marketing section and generic DTC/diagnostic wording were removed. Battery status and hardware specifications remain separate customer information. | Current `components/platform-and-apps/sections.tsx`, `components/devices-page.tsx`, `components/about-us-page.tsx`; audience FAQ curation documented in `lib/audience-pages.ts`. A current marketing-source search found no diagnostic selling copy. |
| Installation Monitoring | Internal; installation itself may be discussed. | **Scoped.** The Installer App supports professional fitting, setup and confirmation of requirements. Copy does not market internal installation-health monitoring or installer diagnostics. | `components/platform-and-apps/sections.tsx:51` — `installerAppDetails`; Installer App body at `:737`; `components/fleet-management-faq.tsx:40`. |
| Tri-channel Alerting | Already covered; retain clear email/SMS/push benefit. | **Implemented with current proof.** Delivery controls and proof captions explicitly identify email, SMS and push. The current capture shows those three channel checkboxes; it is not a test of message delivery. | `components/platform-and-apps/sections.tsx` — `AlertsStory`; `/platform-screenshots/current/alert-channels.jpg`. |
| Policy Administration | Andrew was named for product review; requested follow-up adds the topic without inventing its release scope. | **Scoped.** Insurance copy describes telematics data informing insurer workflows and defining reporting/integration with existing systems. It does not claim Redtail issues policies or supplies a complete policy-administration platform. Andrew/product confirmation is still needed for specific integration or release claims. | `components/usage-based-insurance-solution.tsx:68`; `components/usage-based-insurance-faq.tsx:54`. |
| Circuit Driving | Restore on the Car Rental page. | **Implemented.** Rental has a Circuit Driving tile and dedicated circuit section with directory/map images and a link to Platform analysis. GPS-derived lap times are described as approximate; available analysis depends on setup. | `lib/industry-pages.ts:222`; `components/industry-page.tsx:514` — `RentalCircuitSection`; `components/platform-and-apps/sections.tsx:571` — `CircuitStory`. |
| Vehicle Maintenance | Mention clearly; avoid unsupported detail. | **Implemented with current interface proof.** General maintenance/service planning appears on Platform, Fleet Management, rental and sector pages. The current screenshot shows Upcoming/History and a calendar with no populated maintenance items in the inspected fleet; it does not imply completed services or active schedules. Generic automated OBD fault detection is not presented as a feature. | `components/platform-and-apps/sections.tsx` — `MaintenanceStory`; `/platform-screenshots/current/maintenance-calendar.jpg`; `components/fleet-management-faq.tsx:35`; `lib/industry-pages.ts:167`; `lib/industry-sector-copy.ts`. |
| Vehicle and Device Battery | Add a concise benefit and better presentation. | **Implemented using accurately identified historical proof.** Both battery types are named in maintenance copy and the Fleet App list. Genuine established app artwork shows their status. October and September vehicle-battery views had no data in the inspected portal, and the selected device had no internal battery. No new battery chart was invented. This is status information, not internal fault diagnosis or a guaranteed battery-life prediction. | `components/platform-and-apps/sections.tsx` — `MaintenanceStory`, `fleetAppDetails`; `/platform-screenshots/fleet-battery-journeys-legacy.png`; `components/fleet-management-solutions-section.tsx:122`. |
| Safe Remote Disable | Mention, but the team says testing is incomplete. | **Scoped.** Copy invites a discussion of availability, safeguards, compatibility, configuration and completion of testing. It does not claim universal availability, completed testing, or disablement while a vehicle is moving. | `components/platform-and-apps/sections.tsx:379`; `lib/industry-pages.ts:229`. |
| Refurbishment and Testing | Internal; do not market it. | **Intentionally excluded.** No public refurbishment/system-repair feature is added. OEM/SVT development testing remains legitimate customer program/process content and is not a refurbishment dashboard benefit. | Current marketing-source search; `lib/audience-pages.ts` — OEM deployment/SVT development process. |
| System Health and Monitoring | Internal; detecting Redtail’s own problems is not a customer selling point. | **Intentionally excluded.** No public internal-system-health or fault-detection selling section remains. Customer battery monitoring and customer telemetry/IoT metering are separate topics. | Current `components/platform-and-apps/sections.tsx`, `components/devices-page.tsx`, `components/about-us-page.tsx`; current marketing-source search. |
| Odometer Tracking | Restore mileage/tax recordkeeping benefits and address the attachment’s HOS mention. | **Implemented with scope.** Odometer/mileage records and tax recordkeeping are restored. HOS wording is limited to journey timing/vehicle-use context and discussing required records/integrations. A separate conditional Section 179 hardware-deduction topic is included; it is not a mileage deduction or fixed tax saving. | `components/platform-and-apps/sections.tsx:475` — `ReportsStory`; HOS at `:506`; `components/fleet-management-faq.tsx:45`; `lib/industry-pages.ts:209`; `lib/tax-benefits.ts`. |

## Related website requirements

| Requirement | Current state | Evidence and scope |
| --- | --- | --- |
| Authentic first Platform & Apps image | **Verified locally.** Hero uses `/platform-screenshots/current/fleet-map.jpg`, captured from the authenticated live portal on October 4, 2026. | Current first image loaded; reserved native aspect ratio and `object-contain` confirmed. Desktop/mobile route checks found no horizontal overflow. |
| Authentic first Fleet Management image | **Verified locally.** `FleetVisual` uses the same clean current Fleet Map capture. The crop omits the account header and private identifiers. | Hero image loaded. Desktop/mobile routes found no horizontal overflow; saved hero captures were visually inspected. |
| Merriweather headings / Verdana body | **Verified locally.** `app/layout.tsx` loads Merriweather; CSS heading/body tokens use Merriweather and Verdana. Previous Manrope/IBM Plex Sans imports are removed. | Seven routes at both widths computed the Merriweather/fallback/Georgia heading stack and Verdana/Geneva/Arial body stack. |
| Similar old website copy, preserved design | **Implemented with product curation.** Nine sector bodies have 85 solution tiles and 85 FAQs. Rental has 14 tiles. Dedicated Auto OEM and Stolen Vehicle Tracking pages restore their overview, processes and 9/8 FAQs. Premium layout primitives remain in use. | Latest core browser checks include rental and OEM; build generates the routes. Old unsupported diagnostics, routing, recovery, savings and support promises remain excluded or qualified. |
| Existing hero copy preserved | **Implemented with documented factual corrections.** Existing hero headlines are retained. The homepage body’s internal-installation-health phrase was corrected to customer fleet activity, and ETA/internal-health chips were corrected. New OEM/SVT routes use old source hero wording, with SVT counts/recovery claims curated. | Current Fleet and Platform saved hero captures retain their respective headline wording. Image/font work did not replace those headlines. |
| Visible enumeration removed sitewide | **Code audit and core browser checks pass.** Decorative card/workflow/device ordinals removed; Get Started uses descriptive captions; article list markers are bullets; numeric prefixes are stripped from Portable Text display and TOC. | Seven checked templates displayed no pure decorative numeric labels; Fleet capability cards returned an empty numeric-label set. CMS prefix coverage is source/renderer evidence, not a claim that every CMS article was revisited in this latest browser pass. |

### Font evidence

- `app/layout.tsx:2`, `:10`, `:60`: Merriweather import, font variable and root application.
- `app/globals.css:18`, `:20`: Verdana body stack and Merriweather heading stack.
- `app/globals.css:135`: h1–h6 heading rule; `:143`: body/root sans rule.
- `components/ui/card.tsx:40`: card titles use the heading token.
- `components/editorial-hero.module.css`: hero typography inherits the global tokens; no prior font-family override remains.

### Enumeration evidence

- `components/resource-detail-page.tsx:37`: numeric prefix recognizer limited to one/two-digit ordinals followed by a period or closing parenthesis and whitespace.
- `components/resource-detail-page.tsx:135`: clean TOC display title.
- `components/resource-detail-page.tsx:200`: display cleanup across Portable Text spans, including ordinary paragraphs and h4 source blocks.
- `components/resource-detail-page.tsx:252`: article lists render as bulleted lists.
- `components/get-started-flow.tsx:510`, `:540`, `:571`: “Your industry,” “Fleet size,” and “Contact details” captions.
- A read-only scan of 116 public Sanity source documents found 22 literal ordinal prefixes across six articles and numbered-list blocks in six others. The display transformations cover these source patterns without changing stored CMS copy or stable heading anchors.

## Copy and tax provenance

Old-copy baseline: the user-supplied [tbbzip/redtail_web repository](https://github.com/tbbzip/redtail_web), pinned at `47acfca3438a5e67a7a07e43c5ed7d21c8e0b58d`. The team’s current corrections supersede conflicting older claims.

- [Old feature copy](https://github.com/tbbzip/redtail_web/blob/47acfca3438a5e67a7a07e43c5ed7d21c8e0b58d/data/features.ts) and [old FAQs](https://github.com/tbbzip/redtail_web/blob/47acfca3438a5e67a7a07e43c5ed7d21c8e0b58d/data/faqs.ts) are the sector/rental baseline.
- `lib/audience-pages.ts` documents exact old route/component sources for OEM and SVT content and its claim curation.
- The restored Section 179 topic follows conditional equipment-purchase rules in [IRS Publication 946](https://www.irs.gov/publications/p946). GPS eligibility is conditional on qualifying equipment and the business’s circumstances; the old fixed “up to 35%” claim is excluded.
- Mileage/tax recordkeeping is a separate benefit supported by [IRS Publication 463](https://www.irs.gov/publications/p463). The site does not label a portal screenshot as a tax document or automatically compliant mileage record.

## Current-portal screenshot evidence

The parent reviewer captured the authenticated current Redtail portal on October 4, 2026. The following public files are browser screenshot crops of the actual interface. Their local pixels were independently inspected for topic accuracy. They contain no account header, VIN/IMEI/device identifiers or private street-address detail; public map labels and venue names remain where relevant. No interface or data chart was generated or redrawn.

| Public asset under `public/platform-screenshots/current/` | Dimensions | Visible evidence and limitation |
| --- | --- | --- |
| `fleet-map.jpg` | 1380 × 763 | Fleet Map controls, vehicle status filters, map/satellite controls, vehicle marker, geofence tools and replay controls. First Platform/Fleet figures and secondary White Label/OEM/Technology views now use it. The displayed fleet state is a captured example, not an aggregate customer result. |
| `odometer.jpg` | 1126 × 295 | Current entered-plus-journey odometer calculation, projected mileage and Set Odometer Reading control. It is neither a tax record nor proof of an automatic deduction. |
| `location-prediction.jpg` | 1126 × 424 | Historical location-pattern confidence by weekday/hour, with the portal’s thresholds and data-period context. No ETA or destination-arrival calculation is shown. |
| `maintenance-calendar.jpg` | 1338 × 483 | Upcoming/History views and maintenance calendar. The inspected fleet has no populated maintenance items in this view. |
| `driving-behaviour.jpg` | 1126 × 1033 | Behaviour selection, event counts, geographic heatmap and weekday/hour heatmap. Counts describe the captured data set rather than measured improvement. |
| `journey-activity.jpg` | 1126 × 345 | Verified clean Activity Calendar with journey/distance/duration controls, exports, filters and selected-period totals. The recaptured heading is unobscured and the saved image uses its native ratio. |
| `alert-channels.jpg` | 1126 × 223 | Email, SMS and push notification settings. Showing settings does not establish that notifications were sent or received. |
| `circuit-directory.jpg` | 1324 × 500 | Actual venue/session/vehicle/lap records in the current directory. Historical session dates are product records; they do not change the capture date. GPS lap times remain approximate. |

The current battery inspection did not yield usable populated vehicle/device battery proof. The established Fleet App battery image stays accurately labeled as historical artwork. A current policy-associations screen is empty; it is not used as proof of operational policy administration. The scoped insurance data/integration copy remains sufficient without a populated policy screenshot.

See `docs/screenshot-review-2026-10-04.md` for the current capture provenance and the distinction from earlier asset decisions. `docs/current-portal-captures-2026-10-04.json` records the eight selected image dimensions, SHA-256 values and latest local verification state, without portal query identifiers.

## Latest local verification

The parent reviewer supplied these final-gate results after the latest typography/current-screenshot changes:

- `npm run lint`: exit 0.
- Production build under Node 22 / Next.js 16.3.0: exit 0, compilation and TypeScript checks passed, 159 static pages generated.
- Local browser viewports: 1440 × 1000 and 390 × 844.
- Routes checked at both widths: `/solutions/fleet-management`, `/platform-and-apps`, `/solutions/usage-based-insurance`, `/solutions/white-label`, `/our-technology`, `/industries/auto-oem`, and `/industries/car-rental`.
- All seven routes used the requested computed heading/body families, had no horizontal overflow and had no pure decorative numeric labels. Fleet `#fleet-solutions` capability titles were reviewed and its numeric-label result was empty.
- Current Fleet Map hero images loaded on Platform and Fleet. Source captures, including the tooltip-free journey image, were independently visually inspected. Genuine older mobile/replay artwork remains accurately identified in its appropriate context.
- At 390px, all seven current Platform body images—driving behaviour, alerts, maintenance, journey activity, odometer, location prediction and circuit directory—loaded successfully with `object-fit: contain` and native proportions. Full-image links were present in every corresponding section.

Saved proof images exist at `output/playwright/final-fleet-desktop-2026-10-04.jpg`, `final-platform-desktop-2026-10-04.jpg`, `final-fleet-mobile-2026-10-04.jpg`, and `final-platform-location-mobile-2026-10-04.jpg`. The mobile location capture shows the heading/details portion; it is not a full prediction-image frame. The saved proof images were independently viewed in this report review.

Machine-readable browser evidence is saved at `output/playwright/final-brand-screenshot-review-2026-10-04.json`. Its initial immediate-navigation Platform hero check recorded `loaded: false`; the later `platformHeroConfirmation` records `loaded: true`, displayed at approximately 1022 × 565 in the 1440px viewport. The later settled-image observation is the authoritative load result. The JSON also records all seven successful current body-image checks and the final Fleet hero confirmation.

**Delivery state:** locally implemented and verified. Source images, typography, copy scope, enumeration cleanup, production build and final browser/image checks are complete. No push or production deployment was performed; the live marketing website was not deployed or verified as changed.
