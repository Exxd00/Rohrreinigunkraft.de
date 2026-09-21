# Mobile navigation, directories and work examples

Release: WEB-20260921-UX-MEDIA. Builds on fb89d88aede48d930a7dcc97d80504ccd06591d7.

The floating Home button could cover page headings. Inner pages now use the logo/breadcrumb for Home and the fixed header for calling, leaving filters and video controls unobstructed. Services and cities have direct desktop links and the first two prominent links in the mobile menu. The mobile call button uses the existing confirmation dialog. Theme choice remains in the mobile menu. Desktop navigation begins at 1280 px to avoid crowded tablet widths.

The city directory supports German keyboard spellings, municipality name, administrative postcode, 10/20/30 km distance, municipality type and name/distance sorting. Distances still mean straight-line distance from Nürnberg Hbf; postcodes are administrative references, not complete coverage boundaries.

The services directory supports problem search, category and the 20 reviewed city service sets. Selected city links resolve only to the existing eight core service pages. General symptom pages remain accessible without a city filter. Both directories retain filters in their URL and restore them on browser Back; invalid select values are ignored. Base pages remain statically rendered with crawlable links and self-canonical metadata.

City and service templates include one relevant existing company video with native controls, `playsInline`, `preload="none"`, a poster and a reserved aspect ratio. Playback requires interaction. A description explains the visible content and makes clear the footage is an example, not proof of a job in the selected city. No fabricated local video, automatic playback or new third-party media integration was added.

Validation: 17 tests cover existing event-routing/receiver contracts, service-area URLs and directory normalization/filter composition/valid local destinations. Production build generates 368 routes including 355 sitemap pages. Browser checks cover search, combined filters, zero results/reset, URL restoration, mobile menu keyboard dismissal and layouts at 320, 375, 768, 1024 and 1440 px. Media is checked without submitting a live form or phone event. A full public crawl is required after deployment because shared navigation changed.

Rollback: revert this release as a single commit or restore the prior production deployment for fb89d88. The existing Apps Script receiver, event names, Ads settings, DNS and environment variables are outside this change. No new public routes are introduced. Scheduled monitoring should reuse the release evidence, test homepage/alias daily and rotate three page samples weekly.
