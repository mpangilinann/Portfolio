# SEO and performance maintenance

## Architecture and scope

The canonical origin is `https://mikkopangilinan.vercel.app`, defined once in
`src/data/seo.js`. `PageMetadata` resolves the current pathname through that
configuration. It updates title, description, canonical, robots, Open Graph
title/description/URL/type/image/alt/site name, and Twitter large-image card,
title/description/image/alt. Canonical URLs omit query strings and fragments.
Trailing slashes resolve to the same canonical path.

All managed tags are deduplicated. The existing Google verification tag stays
intact. Not Found (including invalid project slugs) receives `noindex, nofollow`,
no canonical, no Open Graph URL, and no structured data. Indexable routes use
`index, follow`. No private contact configuration enters the metadata.

The homepage contains a JSON-LD graph with `Person` and `WebSite`, using the
existing profile and social links. Each project has a `CreativeWork` with its
catalog title, summary, canonical URL, screenshot, technologies, and existing
GitHub/live URLs. No dates, ratings, employer associations, or personal project
contribution claims are invented. One managed JSON-LD script is replaced or
removed on navigation; JSON serialization escapes `<`.

The general social image is the existing AC-CORE screenshot; individual project
routes use their own original PNG. These are accurate interface previews, not
new artwork. Original PNG/JPEG URLs are retained for social compatibility and
source editing. Browser pages use optimized WebP variants.

## Canonical paths and generated files

The five static paths are `/`, `/about`, `/projects`, `/resume`, `/contact`.
The six current project paths are `/projects/ac-core`, `/projects/flashify`,
`/projects/thryve`, `/projects/the-coffee-lab-lounge`,
`/projects/q-zone-detailers`, `/projects/techquest-jobs`.

`npm.cmd run generate:seo` writes `public/sitemap.xml`, `public/robots.txt`, and
the marked fallback metadata block in `index.html`. `npm.cmd run build` runs
this generator before Vite. The sitemap derives project paths from the catalog;
it has no API paths, Not Found URLs, PDF page entries, or invented `lastmod`
dates. Add future static indexable paths to `staticPages` in `seo.js`.

Adding a project to `src/data/projects.js` with a unique slug automatically
supplies its metadata, structured data, detail route, and next generated sitemap
entry. Its existing `description` is the meta/social description. Its original
image path remains the social image. Run the generator/build after data edits.

## SPA and crawler limitations

This remains a client-rendered Vite React SPA. No prerendering dependency or
framework migration was introduced. The initial HTML provides strong homepage
fallback metadata and homepage JSON-LD; it does not contain route-specific page
content. Some social crawlers do not execute JavaScript and may show the same
homepage preview for every route. An unknown route also initially receives the
fallback HTML, then gets `noindex` and loses its canonical after JavaScript runs.
The SPA fallback still returns HTTP 200 for unknown pages (a soft 404).

Route-specific social previews for non-JavaScript crawlers and real HTTP 404
responses would require a separately reviewed static-rendering or server-rendering
approach. No fragile prerender package was added merely to mask this limitation.
See [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

## Baseline and bundle comparison

The working tree was clean on `main`. Baseline lint, production build, and all
10 contact test groups passed. The baseline had one JS bundle containing every
page, minimal document metadata, no sitemap/robots files, large source PNGs used
directly, and no image decoding/loading hints. Fonts already used the system
stack; the `font-geist` class does not load an external font.

| Production output (decimal kB) | Before | After |
| --- | ---: | ---: |
| Entry JavaScript | 462.07 | 245.18 |
| Entry JavaScript gzip | 147.69 | 79.06 |
| All emitted JavaScript | 462.07 | 472.26 |
| Sum of emitted JS gzip sizes | 147.69 | 157.31 |
| JavaScript chunks | 1 | 19 |
| CSS | 42.12 | 42.12 |
| CSS gzip | 7.81 | 7.81 |
| HTML | 0.96 | 3.58 |
| HTML gzip | 0.55 | 1.19 |

The entry reduction is not the entire initial-route reduction. A cold local
Chrome homepage load at 1280×900, DPR 1, no scrolling, and a fresh browser profile
requested 12 JS files totaling 405.31 kB (132.61 kB sum of file gzip sizes),
versus the baseline's single 462.07 kB bundle (147.69 kB gzip). About, Resume,
Projects, ProjectDetail, and Contact page chunks were not requested by Home.
These are file-byte measurements, not a production network-speed benchmark.
No Lighthouse score or field Core Web Vitals result is claimed.

All seven page components use React lazy loading. The existing Motion dependency
and intentional animations remain. An accessible, height-reserving Suspense
fallback serves initial pending loads; React Router may keep the existing page
visible while a navigation transition waits. Scroll/focus effects are inside
the boundary so they commit after destination content is available. A delayed
chunk was checked with keyboard navigation and initial-load fallback tests.

Plain skills lists were moved without content edits to `src/data/skillLists.js`,
keeping About's React Icons code out of Home and Resume. Every direct dependency
has a confirmed source or build use; none was removed, upgraded, or added.

## Image audit

Sizes are decimal kB. The optimized column is the largest active delivery variant
for that asset, not the sum of every responsive size. Complete variant dimensions
and byte counts are in `scripts/image-audit.json`.

| Original source | Type / dimensions | Before → active variant | Usage / loading position | Finding |
| --- | --- | --- | --- | --- |
| `src/assets/logo-dark.png` | PNG, 1065×599 | 316.56 → 28.21; WebP 320×180 | Navbar above fold; opposite-theme sidebar only when open | Much larger than its 40–48px rendered height |
| `src/assets/logo-light.png` | PNG, 1069×602 | 448.30 → 26.95; WebP 320×180 | Same theme-dependent logo locations | Much larger than rendered size |
| `public/favicon.png` | PNG, 728×728 | 101.10 → 3.89; PNG 64×64 | Browser favicon, independent of fold | Oversized for browser icon |
| `public/profile-pic.jpg` | JPEG, 300×300 | 46.01 → 11.85; WebP 300×300 | About hero above fold | Dimensions suitable; encoding reduced |
| `public/ac-core.png` | PNG, 1440×734 | 171.41 → 87.67; WebP 1440×734 | Home below fold; Projects first row; dialog on demand; detail hero; social source | Encoding and smaller card variants help |
| `public/flashify.png` | PNG, 1440×767 | 136.16 → 56.47; WebP 1440×767 | Same as AC-CORE | Encoding and smaller card variants help |
| `public/thryve.png` | PNG, 1440×771 | 410.09 → 81.52; WebP 1440×771 | Same as AC-CORE | Large original |
| `public/thecoffeelab.png` | PNG, 1440×768 | 610.75 → 86.20; WebP 1440×768 | Projects later row; dialog on demand; detail hero; social source | Large original |
| `public/qzone.png` | PNG, 1440×765 | 1202.08 → 172.58; WebP 1440×765 | Same as Coffee Lab | Largest original |
| `public/techquestjobs.png` | PNG, 1440×770 | 712.95 → 107.61; WebP 1440×770 | Same as Coffee Lab | Large original |

The ten originals total **4,155,398 bytes**. Their largest optimized equivalents
total **662,950 bytes**, an **84.0%** reduction. All responsive variants together
total **1,134,596 bytes**. The largest optimized browser image is Q-Zone at
172,580 bytes. The retained source Q-Zone PNG is still 1,202,082 bytes; repository
and deployment storage increase because originals are kept. Browsers do not
download every variant. In the cold desktop Home check, image requests were one
28,206-byte logo and three 640px thumbnails (29,696 / 19,478 / 16,876 bytes).
The browser may prefetch lazy thumbnails near its viewport threshold; lazy does
not promise zero below-fold requests.

`OptimizedImage` resolves source paths through `src/data/imageAssets.json`, sets
intrinsic dimensions, async decoding, responsive `srcSet`/`sizes`, and lazy
loading by default. Existing card crops and dialog composition are unchanged;
detail and gallery images retain natural aspect ratios. Detail heroes and the
About portrait are eager/high-priority; Projects' first desktop row is eager;
homepage thumbnails and later project rows are lazy. Dialog images load when
opened. Closed sidebar logos have no `src`, avoiding an unused theme-logo fetch.

### Future images and reproducibility

Keep editable original screenshots at about 1440px wide, preserve their aspect
ratio, and target full-size WebP below roughly 200 kB where detail permits.
Use 640/960/1440px variants for cards/detail pages; aim for thumbnails around
20–60 kB. Portraits should match their actual display needs (the current 300px
source is retained); logos need transparency and a few hundred pixels of width,
not megapixels. Keep PNG/JPEG social previews at broadly compatible public URLs,
preferably near 1200×630 where the original composition permits. Do not crop a
project screenshot just to force that ratio.

`scripts/optimize-images.mjs` is an optional local maintenance tool using installed
Chrome's Canvas WebP/PNG encoder through DevTools Protocol. It downloads nothing,
has no runtime image dependency, and is not run in the Vercel build. Set
`CHROME_PATH` if Chrome is installed elsewhere. Run it from the repository with
`node scripts/optimize-images.mjs` after adding/changing local source images,
then review the output at real display sizes before committing. It reads project
image paths from the catalog and regenerates variants, the manifest, and audit.
The current conversions use WebP quality 0.95, logos quality 1, and high-quality
resampling; these are not claimed to be pixel-identical/lossless conversions.
No artwork was generated and no original or résumé PDF was modified.

## Fonts, caching, API, and verification

No font service, render-blocking font CSS, preload, or preconnect was added.
The single existing CSS bundle remains render-blocking; critical-CSS machinery
was not introduced for a small stylesheet. Explicit image dimensions reserve
space, while lazy route fallback reserves most of the main region. This is not
a claim of measured CLS improvement.

Only content-hashed `/assets/*` receives explicit one-year immutable caching.
Unhashed `/images/*`, original images, HTML, sitemap, and robots keep normal
revalidation behavior; changing their contents must not leave a year-old browser
copy. Confirm actual response headers on Vercel after your own deployment.
No broad cache rule covers API requests. See [Vercel caching guidance](https://vercel.com/docs/caching/cache-control-headers).

The API-excluding SPA rewrite is unchanged. `api/contact.js`, the email template,
validation, environment variables, and delivery behavior are untouched. The
existing mocked contact tests remain the regression check; no real Resend
request or email was sent.

Checks: `npm.cmd run test:seo`, `npm.cmd run test:contact`, `npm.cmd run lint`,
`npm.cmd run build`, and `git diff --check`. Browser checks cover all 11 direct
routes, project refreshes, unknown routes, metadata/JSON-LD, API separation,
robots/sitemap, dialogs, contact mocks, delayed route focus, themes, keyboard,
mobile overflow, image loading, and reduced motion.

Manual follow-up after your deployment: inspect HTML and HTTP cache headers,
submit the sitemap through Search Console if desired, use URL Inspection for
rendered metadata, review social previews with actual platform debuggers, inspect
image quality at high DPR, and verify announcements with NVDA/VoiceOver. Vercel
deployment behavior, social cache refreshes, actual email delivery, and real-world
performance were not tested through deployment. Nothing was committed, pushed,
merged, or deployed.
