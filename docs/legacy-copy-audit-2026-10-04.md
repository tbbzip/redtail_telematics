# Redtail legacy copy audit

Reviewed and updated October 4, 2026. This document records the original content gaps, the corrections implemented locally, and the remaining decisions. It is not a deployment receipt or a verification of every portal feature.

## Implemented locally

The corrections below are saved in the `new_redtail` working tree. The premium page layouts and hero headlines have been retained.

- **Nine industry bodies restored:** Construction, Education, Emergency Vehicles, Field Services, Food & Beverage, Government, Logistics, Passenger Transit, and Utilities now have sector-specific content adapted from the supplied old repository: **85 solution tiles and 85 FAQs** across those nine pages. Unsupported route optimization, general diagnostics, fixed tax savings, and guaranteed insurance savings were excluded or rewritten.
- **Rental coverage restored:** Car Rental now has **14 solution tiles**, including circuit-driving context, location intelligence, mileage recordkeeping, battery monitoring, and qualified remote-disable discussion. The page uses actual circuit images and requires compatibility and completed deployment testing before remote disable is used.
- **Platform & Apps corrected:** Location Intelligence replaces the internal Device Health selling section. Reported/predicted location, satellite view, general geographic map context, mileage/tax recordkeeping, battery status, broad maintenance benefits, and focused installation guidance are covered. The fixed “32 report templates” count was removed.
- **Established app capabilities restored:** The Fleet App list includes arming movement monitoring and viewing/setting mileage. Arming monitoring is kept separate from remote disable. Installation copy no longer sells internal installer oversight or device diagnostics.
- **Authentic visuals restored:** The first Platform & Apps and Fleet Management visuals use the established laptop/phone product composition. Additional report, map-marker, and battery images come from the old repository; their captions identify the actual views rather than presenting reconstructed product output.
- **Related copy corrected:** Homepage/shared marketing copy now focuses on customer fleet activity rather than internal installation/device health. Devices-page ETA, route-optimization, and internal-health wording and About-page internal-health wording were cleaned up. The logistics ETA chip and passenger-transit vehicle-health chip were corrected. Hero headlines and layouts are unchanged; the homepage hero body changed “keep installations healthy” to “manage fleet activity” to follow the team's product correction.
- **Follow-up cleanup:** The remaining VAM-OBD DTC/VIN-extraction and timed installation claims were removed. Devices use-case descriptions now focus on supported vehicle location, journeys and driving-event context; the homepage carousel's traffic-support wording was corrected.
- **Feature proof improved:** Existing original Fleet App artwork now complements odometer, vehicle/device battery, satellite view and geofence benefits. Product figures have full-size image links. Driving-behaviour and circuit screenshots retain their complete interfaces on mobile. The Fleet App list includes a short battery-status benefit.
- **Policy administration and HOS added:** Following the user's instruction to add these topics, the insurance solution card/FAQ covers connecting telematics data with insurer policy-administration workflows. Platform reporting and the Fleet FAQ cover vehicle-activity context for Hours of Service reviews and defining required driver records, reporting and integrations. Neither section promises an out-of-the-box policy system or certified HOS/ELD compliance.
- **Dedicated audience pages restored:** Auto OEM and Stolen Vehicle Tracking now have dedicated pages, old-site source photographs, overview/process content, nine OEM FAQs and eight tracking FAQs, navigation links, metadata and sitemap entries.

**Verification status:** Final ESLint and the production build passed, including the build's TypeScript checks and generation of 159 pages. Manual browser review confirmed HTTP 200, one H1, sector-specific solutions/FAQs, and no desktop overflow across all nine restored industry routes. Construction was visually checked at 1440px and 390px; rental circuit imagery and qualified remote-disable links were checked on mobile. Platform & Apps was checked at 1440px and 390px: all images loaded, no horizontal overflow or broken local anchors, and the mobile-app deep link cleared the fixed header. The existing Platform E2E expectations were updated for the corrected content; the automated E2E suite was not run. The two restored audience routes also returned HTTP 200 with one H1, loaded images and no overflow at 1440px and 390px; both appear in the sitemap. Policy-administration and HOS FAQ interactions were checked on mobile, and the Devices page no longer advertises DTCs. No changes from this correction work have been pushed or deployed.

**Scope requiring product confirmation:** Exact policy-administration integrations, driver-duty/ELD capabilities for HOS, specific weather/traffic/charging map overlays, and stronger remote-disable availability or release claims still require product evidence. The requested topics are present with appropriate scope; the website does not claim those unverified capabilities are generally released. A clean current fleet-overview and predicted-location result capture would improve future product proof. Existing public Fleet App artwork is accurately captioned.

## Baseline and source status

The supplied [old website repository](https://github.com/tbbzip/redtail_web) is the primary baseline. The local checkout at `/Users/aldold/Documents/dev/redtail_website/redtail_web` points to that repository. A read-only remote check confirmed that local HEAD and remote `main` both resolve to `47acfca3438a5e67a7a07e43c5ed7d21c8e0b58d` (January 16, 2026). The old checkout has local changes, including its Platform & Apps route; those changes were excluded from the committed-copy comparison.

Sources below are pinned to that commit so later website edits do not silently change the audit:

- [Old industry feature copy](https://github.com/tbbzip/redtail_web/blob/47acfca3438a5e67a7a07e43c5ed7d21c8e0b58d/data/features.ts)
- [Old industry and solution FAQs](https://github.com/tbbzip/redtail_web/blob/47acfca3438a5e67a7a07e43c5ed7d21c8e0b58d/data/faqs.ts)
- [Old Platform & Apps route and active component imports](https://github.com/tbbzip/redtail_web/blob/47acfca3438a5e67a7a07e43c5ed7d21c8e0b58d/app/platform-and-apps/page.tsx)
- [Old platform feature section](https://github.com/tbbzip/redtail_web/blob/47acfca3438a5e67a7a07e43c5ed7d21c8e0b58d/app/platform-and-apps/_components/FeatureSection.tsx)
- [Old platform mobile-app section](https://github.com/tbbzip/redtail_web/blob/47acfca3438a5e67a7a07e43c5ed7d21c8e0b58d/app/platform-and-apps/_components/MobileAppsSection.tsx)
- [Old homepage solution content](https://github.com/tbbzip/redtail_web/blob/47acfca3438a5e67a7a07e43c5ed7d21c8e0b58d/components/Carousel.tsx)

The public [Platform & Apps URL](https://www.redtailtelematics.com/platform-and-apps/) yielded mixed crawler versions during the review: an older 187-line cached page in one retrieval and the new 360-line page in subsequent retrievals. Fleet and rental URLs also return the new site. Public search results are therefore secondary evidence, not a reliable complete old-site snapshot. An Internet Archive lookup did not return a usable snapshot during this review.

The older cached platform page highlighted satellite maps, map overlays, geofencing, driver behaviour, asset management, connectivity, trip reporting, alerts, and focused fleet/installer apps. It also included mileage and monitoring controls in the Fleet App. Several older claims conflict with the latest team corrections and should not be copied back automatically.

## Pre-correction findings in brief

These findings describe the website at the start of this review. The “Implemented locally” section above is the current status; the statements below should not be read as a list of gaps that are all still open.

1. **The largest copy loss is on nine industry pages.** Their dedicated old solution tiles and FAQs were replaced with three priority chips and generic product links. The page designs can stay; relevant sector content needs to return.
2. **Platform & Apps shifted toward portal navigation and internal operations.** It still covers journeys, behaviour, geofences, alerts, maintenance, reports, and mobile access, but lost some clear customer uses of location and mileage. It overpromotes internal device health and installer oversight.
3. **The missing location, odometer, rental circuit, and remote-disable points are confirmed by the team's new comments.** Exact historical wording for predicted location, mileage tax recordkeeping, rental circuit driving, and safe remote disable was not found in the supplied repository. Their restoration should follow the team's current direction, not an invented quotation from the old website.
4. **OEM and stolen-vehicle material survives in homepage detail panels, but dedicated journeys are missing.** IoT content is also present in the homepage; it is not wholly absent.
5. **Some omissions were useful corrections.** Old route optimization, universal diagnostics, guaranteed insurance savings, fixed tax savings, and invented ROI outputs should not return.

## Original team correction matrix

The screenshot contains 16 rows when Trip Replay and Odometer Tracking are counted, although the email calls them fifteen items. The team's written explanations are the current product guidance. This matrix preserves the initial finding and treatment used for the local corrections.

| Topic | Finding before these corrections | Recommended treatment |
| --- | --- | --- |
| Trip replay | Present prominently on Platform & Apps. | Keep authentic journey screenshots and replay benefits. |
| Route planning | Journey replay exists; older copy and metadata sometimes imply optimization. | Describe trip preparation and reviewing past journeys as a reference for upcoming trips. Do not advertise a working route planner or optimized routes. |
| Vehicle lookup | Fleet search/status filtering already makes this implicit. | Keep search/filter benefits where useful; no separate promotional tile needed. |
| Fuel monitoring | Efficiency and idling are valid topics; older material overstates universal fuel data. | Keep efficiency/idling language. Mention measured fuel data only for a confirmed compatible OBD setup. |
| Location intelligence | Current copy emphasizes where events occurred, but omits predicted location and some older map uses. | Restore reported/predicted location and practical map context. Exclude ETAs. Restore satellite/map-overlay points only where current portal availability is confirmed. |
| Device diagnostics | A prominent Device Health section exposes faults, SIM, power, first fix, and heartbeat. Rental text also advertises diagnostics. | Remove internal device diagnostics/health as a customer benefit and remove general OBD diagnostic promises. |
| Installation monitoring | Installer app and managed installer activity are promoted. | Keep installation options and appropriate installer-app guidance; remove internal installation oversight as a fleet customer selling point. |
| Email, SMS, push alerts | Already covered clearly. | Keep existing coverage; avoid adding a duplicate tile. |
| Policy administration | No clear customer-facing policy administration offer is described. | Leave a decision for Andrew. Portal menu presence alone does not prove the website should advertise it. |
| Circuit driving | Detailed circuit material is on Platform & Apps, but absent from the rental page. | Add rental circuit-driving context where misuse/vehicle-use risks are explained. Keep the description brief and avoid introducing lap-analysis promises beyond the confirmed offering. |
| Vehicle maintenance | Present, but described with extensive portal workflow details and diagnostics in places. | Keep a simple maintenance benefit and genuine image. Do not imply diagnostic prediction or universal engine-health data. |
| Vehicle/device battery | Explicit support exists in the established Fleet App listing; new copy emphasizes device timeline instead. | Add one concise battery-status line to Fleet App or asset visibility. Avoid another large section. |
| Safe remote disable | Missing. Team says it is not fully tested but should be mentioned. | Mention as an option to discuss for supported deployments. Do not imply universal availability, completed testing, or that a moving vehicle can safely be stopped. |
| Refurbishment/testing | Not an existing public selling section. | Keep internal. |
| System health/monitoring | Internal health language is visible in homepage/platform/footer copy. | Remove internal system-problem detection from the marketing story. Quality/security certifications can remain separately. |
| Odometer tracking | General journey distance appears, but the useful mileage-recordkeeping story is missing. | Restore mileage tracking/records and a restrained tax-recordkeeping benefit. Do not promise a deduction, percentage saving, or Hours of Service compliance. |

## Copy considered for restoration

These proposed concise additions informed the local implementation. They are not verbatim legacy quotations or an exact transcription of the final working-tree wording. The customer benefits are now covered, with the confirmation limits noted below.

| Placement | Suggested wording | Basis and limits |
| --- | --- | --- |
| Location section | **Location intelligence:** “Use reported and predicted location to support vehicle visibility and review where driving events happen.” | Current team direction confirms predicted location. Do not substitute “ETA” or promise an accuracy/update interval. |
| Journey section | **Trip preparation:** “Review past journeys, stops and driving events to help prepare for upcoming trips.” | Team direction replaces the nonworking route-planning offer. |
| Mileage tile/app list | **Odometer and mileage records:** “Track vehicle mileage and maintain records that support business-use and tax recordkeeping.” | Team requested the benefit. It is a recordkeeping aid, not tax advice, guaranteed deductibility, or a certified HOS log. |
| Fleet App list | “Review vehicle and device battery status.” | The [published Redtail Fleet App listing](https://apps.apple.com/pl/app/redtail-fleet/id1375435783) explicitly describes both battery states. |
| Map context | **Satellite view:** “Use satellite map views for a clearer picture of vehicle and asset locations.” | Older public copy and old repository metadata support the historical topic. Confirm the view in the current supported customer portal. |
| Map context | **Map overlays:** “Add relevant map context to the vehicle view.” | Old material mentions weather/traffic/charging information; do not list each overlay as currently available without confirming it. |
| Maintenance | **Vehicle maintenance:** “Manage vehicle maintenance and reminders to help keep your fleet ready for use.” | Matches the team's request for broad customer wording. |
| Rental use | **Circuit driving:** “Review circuit-driving activity alongside vehicle journeys to support rental agreement follow-up.” | Team confirms relevance to rental operations. |
| Supported rental/asset deployments | **Remote disable options:** “Talk with Redtail about remote disable options for supported deployments and the operating safeguards required before use.” | Team says testing is incomplete. Availability and conditions need confirmation; not a standard fully released button promise. |

The older committed Fleet App copy retains position/heading, recent trails, activity colours, filtering, vehicle focus, and past journeys. These are substantially present in the new copy. The older cached website and commented lines in `components/FleetAppCTA.tsx` also document monitoring arm/disarm and vehicle mileage, but the comments are not proof they were rendered by the latest old route. **Arming movement monitoring is not the same feature as remotely disabling a vehicle.**

The old repository's `components/platform/PlatformLandingPage.tsx` contains satellite, overlay, location-sharing, time-on-site, and device-management copy, but it is **not imported by the pinned old Platform & Apps route**. Treat it as historical working material, supported in part by the older public cache, not as proof every feature was on the final published old page. Its location-sharing text promises ETAs, which the current team explicitly rejects.

## Original industry-page copy gaps

Before this correction work, the new route used `IndustryHeroOnlyPage` for the sectors below. That component had generic priority cards and links to Fleet Management, Devices, and Platform & Apps. The old routes imported sector-specific `data/features.ts` and `data/faqs.ts` content. Those nine sector bodies and selected FAQs have now been restored locally in the current design, with the claim limits below applied.

| Industry | Relevant old customer topics to restore | Old claims requiring removal or confirmation |
| --- | --- | --- |
| Construction | Vehicle/equipment location, jobsite geofences, driver behaviour, theft-response context, maintenance, usage/performance reporting. | PTO-specific reporting requires compatible hardware confirmation; no fixed tax or insurance savings. |
| Education | Vehicle locations, journey/stop history, geofences, driver behaviour, maintenance, reporting. | Do not imply passenger attendance sensing, optimized routes, or a guaranteed emergency response workflow. |
| Emergency Vehicles | Location awareness, journey review, driving events, incident context, restricted-zone geofences, maintenance, reports. | Avoid promising response-time improvements or emergency coordination functions without a defined integration. |
| Field Services | Crew/vehicle visibility, jobsite arrival/departure context, idling/usage insights, maintenance, safety, reports. | Replace route optimization with trip preparation. Distinguish vehicle presence from a job-management system or verified job completion. |
| Food & Beverage | Delivery vehicle visibility, journey logs, maintenance, geofences, driver efficiency, operational reports. | Do not promise temperature, emissions, fuel volume, route optimization, or food-compliance monitoring from standard tracking. |
| Government | Fleet locations, geofences, usage/accountability reports, idling, maintenance, driver behaviour, security management credentials. | Avoid automatic regulatory compliance, HOS certification, emissions measurement, or tax-saving percentages. |
| Logistics | Locations, journeys, geofences, driver behaviour, idling/usage, maintenance, reporting. | Remove the existing “Live ETAs” chip; do not restore route optimization or compliance guarantees. |
| Passenger Transit | Vehicle positions, arrivals/departures, journey review, driving events, geofences, maintenance, utilization/reports. | Do not promise passenger counting, occupancy monitoring, optimized scheduling, or passenger identification without confirmed sensors/integration. |
| Utilities | Vehicle/equipment visibility, driver safety, maintenance, incident context, off-hours use, restricted-zone alerts, reports. | Remove route optimization, universal diagnostics, and fixed tax/insurance-saving claims. |

The legacy ROI calculator used hard-coded per-vehicle saving assumptions. It is intentionally excluded from the restoration list. Sector relevance can be retained without inventing measurable outcomes.

## Restored dedicated audience journeys

| Legacy route/story | New state | Recommendation |
| --- | --- | --- |
| [Auto OEM page](https://github.com/tbbzip/redtail_web/blob/47acfca3438a5e67a7a07e43c5ed7d21c8e0b58d/app/industries/auto-oem/page.tsx) | Restored at `/industries/auto-oem`, with navigation and sitemap entries. | Collaboration, device/data access, APIs, desktop/mobile delivery, trial and rollout content plus nine FAQs are adapted from the old source. |
| [Stolen Vehicle Tracking page](https://github.com/tbbzip/redtail_web/blob/47acfca3438a5e67a7a07e43c5ed7d21c8e0b58d/app/solutions/stolen-vehicle-tracking/page.tsx) | Restored at `/solutions/stolen-vehicle-tracking`, with navigation and sitemap entries. | Specialist engineering, VHF/GPS requirements, development, manufacture, supply and support context plus eight FAQs are restored. Recovery guarantees and unverified counts are excluded. |
| IoT applications | Still present in homepage detail content and Our Technology. | Improve discoverability if needed; do not report it as absent. Confirm sensor/remote activation specifics before expanding them. |

## Screenshot authenticity

Keep the approved premium design. For Platform & Apps and Fleet Management, use established Redtail portal/app screenshots at a readable size and their natural proportions. Avoid reconstructed maps, fake browser controls, invented scores, ETAs, vehicle counts, or miniature crops presented as live product output. Image captions should identify the actual view rather than implying that a general behaviour/map screen is a crash-reconstruction interface.

The old repository contains `public/redtail_lap-mob.png`, showing the established laptop/phone product composition. It is a useful provenance-backed option. Real screenshot provenance confirms authenticity; it does not by itself validate every feature shown as generally available to customers.

## Original restoration plan and remaining work

1. **Implemented locally:** Apply the team's product corrections across Platform & Apps, Fleet Management, rental, homepage and shared footer/FAQ copy.
2. **Implemented locally:** Restore concise location, mileage, battery, rental circuit, and qualified remote-disable coverage; replace the questionable first screenshots with established authentic visuals.
3. **Implemented locally:** Restore the nine sector bodies and selected FAQs from the supplied source, filtering out claims contradicted by the current team notes.
4. **Implemented with scoped wording:** Add policy-administration and Hours of Service workflows. Exact integrations, certified logging capabilities and remote-disable release readiness still require product evidence before stronger wording.
5. **Implemented locally:** Restore dedicated OEM/SVT journeys, navigation and sitemap entries.
6. **Verified locally:** Complete focused responsive visual and content QA. Publication remains a separate step; a local build or lint result does not establish a deployed/live outcome.

## HOS wording basis

The source and scope for the separate tax benefit are recorded below.

[FMCSA's ELD overview](https://eld.fmcsa.dot.gov/About) describes engine-synchronised driver-duty logging and HOS data transfer. The website's new HOS text describes vehicle-activity context and defining records/integration requirements. It does not describe Redtail as a registered or compliant ELD provider. The user's instruction authorizes including the topic, but does not establish a particular regulated logging capability.

## Section 179 tax benefit restored

The user requested the numbered tax-code benefit from the old website. The pinned old [fleet feature list](https://github.com/tbbzip/redtail_web/blob/47acfca3438a5e67a7a07e43c5ed7d21c8e0b58d/data/features.ts#L217) confirms **Section 179**, alongside an old “up to 35%” savings claim. The code reference is restored; a fixed percentage saving is not used.

[IRS Publication 946](https://www.irs.gov/publications/p946) describes eligible purchased business equipment, placed-in-service timing, business use and applicable limits. [Form 4562 instructions](https://www.irs.gov/instructions/i4562) also distinguish government/tax-exempt and predominantly overseas use. The IRS pages do not specifically classify every Redtail device, so the copy describes a potential deduction for **qualifying purchased GPS or telematics hardware used by eligible U.S. businesses**, with eligibility to be confirmed by the customer's tax adviser.

The shared wording in `lib/tax-benefits.ts` appears on Fleet Management, its FAQ, Platform & Apps, Car Rental, Construction, Field Services, Food & Beverage, Utilities and Transportation & Logistics. Industry tiles link directly to the IRS guidance. Government, Education, Emergency Vehicles and Passenger Transit retain their recordkeeping content without a Section 179 selling tile. Mileage recordkeeping remains a separate benefit.

Current industry totals are 85 solution tiles and 85 FAQs across the nine sector pages, plus 14 solution tiles and 10 FAQs on Car Rental. For this addition, targeted ESLint, TypeScript and diff checks passed. Browser review confirmed the Fleet tax tile, expanded FAQ and IRS links at 1440px and 390px with no overflow; Platform, Rental and Construction show the new tile, while Government does not. These edits remain local and unpublished.

The user asked to keep the design and similar copy. The local implementation retains the visual hierarchy and hero headlines while restoring source-backed customer benefits and correcting unsupported capability claims.
