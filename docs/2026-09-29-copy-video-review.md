# Customer copy and hero-adjacent videos — review draft

Base production: `34759d4dfca881c0556406f1aacee533c3a03c6f` (21 September 2026).
Owner request: revise unappealing page/hero copy and show the homepage video section immediately after the hero on every public page.

## What changes

- Homepage: “Festpreis VOR dem ersten Handgriff.” becomes “Rohrreinigung in Nürnberg. Damit Ihr Alltag wieder läuft.” The introduction starts with the customer's blocked-drain problem and explains the next step.
- 97 city pages: retain the location H1, introduce the problem, availability enquiry and price-before-work process. Local preparation details remain below the videos.
- 160 city/service pages: eight service-specific benefit/intro variants replace administrative preparation text in the hero. Individually authored local information remains in the body and FAQ.
- 88 service pages: name the service and Nürnberg explicitly; use a service-specific or category-aware benefit and introduction.
- General commercial pages: clearer enquiry, services, prices and business-customer introductions. No new price or arrival-time promises.
- All 355 sitemap pages: the existing homepage video showcase follows the hero, once per page. The previous lower-page single-video blocks are removed from the three dynamic templates. Legal text remains intact; legal pages retain a direct jump link. Contact retains a direct form jump link.
- Before/after videos share a desktop row, stack on mobile. Reel cards load poster images until opened. Featured video waits until visible and respects reduced-motion preference. Existing footage is identified as company examples, not proof of a job in each town.

## Validation

- Production build passed, including 368 generated routes (355 public sitemap pages plus framework/system routes).
- All 17 existing routing, area, directory and customer-event tests passed.
- Generated HTML for all 355 public URLs checked: exactly one H1; self-canonical; exactly one video section directly after the hero section; both existing before/after clips present.
- TypeScript and diff whitespace checks passed.
- Cloud preview visual verification to be recorded in the PR before release approval.

## Release decision

Draft only. Production publish/merge awaits owner's approval of this concrete version, as required by RUNBOOK. The current live website remains the base release. Rollback, if a future approved release requires it: revert this PR to the exact base above; retain the existing phone-event contract and campaign configuration.
