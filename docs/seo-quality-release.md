# SEO and page quality release — 2026-09-29

## Scope

- Preserve all 355 existing public routes and the 30 km coverage model.
- Keep the homepage as the primary Nürnberg business landing page. Do not merge city routes based only on overlapping search queries.
- Add symptom-based service navigation to the 97 place pages, with destinations limited to existing reviewed city/service routes or the matching general service.
- Add provider identity, evidence links and scope/pricing guidance to all 345 city, city/service and general service pages. Regional footage is not a local case study for every town.
- Extend the existing repair guidance to the Kanalsanierung service page.
- Remove the automatic €89 fallback from 79 services without an explicit configured price; omit their numeric structured offers. Preserve the nine configured starting prices.
- Replace static staff availability and blanket arrival promises with telephone confirmation. Do not change phone-event handlers, conversion configuration or customer event routing.
- Remove self-serving business review markup and the homepage FAQ markup that lacked a matching visible FAQ block. Preserve visible customer reviews.
- Use the actual shared public-content revision date in the sitemap rather than the service-area dataset date.
- Add eight exact permanent 308 redirects from retired local service URLs to matching services. Do not redirect retired out-of-area routes or old CSS to the homepage.

## Editorial follow-up

City-specific completed-job evidence, photos, outcomes, team credentials and service terms must come from real business records and approved assets. Do not generate or relabel generic footage as city-specific proof. Do not create additional city/service combinations merely to increase the URL count. Compare page results within their own query, country and device cohorts and allow re-crawling before drawing conclusions.

## Verification and rollback

Run TypeScript, the existing routing/event/directory/coverage tests, pricing regression tests and the production build. Check rendered HTML and a representative mobile page, including service navigation, canonical URLs, H1s and valid JSON-LD. Do not submit production forms or initiate calls. Preserve the previous production commit `9bacc8d0544710373620aa627f8f98b6a7607cae` as the rollback baseline; rollback only by an authorized explicit action.
