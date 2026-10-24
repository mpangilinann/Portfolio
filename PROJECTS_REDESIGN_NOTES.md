# Projects directory redesign

## Starting point and scope

Work began on clean `main`, after commit `e30ae67` (About redesign). The complete
tracked diff was empty. Baseline contact tests (10), SEO tests (6), lint and the
production build passed. The existing Projects page used a large centered uppercase
heading, a three-column desktop grid, truncated summaries, three technology badges
per card and a full-card button opening ProjectDialog. Full project pages already
existed, but reaching them required the dialog first.

Only the Projects interior is redesigned. Existing Home/About work, shared navbar,
Sidebar/Footer, themes, accessibility hooks, catalog, images, detail pages, metadata,
resume, contact API, environment configuration and deployment configuration remain
unchanged. SHA-256 comparison of every initially tracked file identifies Projects.jsx
as the only changed existing file. No dependencies were added, removed or upgraded.

## Final information architecture

1. Compact introduction: label, moderate heading, supported academic/collaborative
   description and a project count derived from `projects.length`.
2. Project archive: desktop index and preview, or directly available mobile cards.
3. Small closing: GitHub from shared social data, plus Contact Me.

No additional project array or independent project facts were introduced.
`src/data/projects.js` remains the single source for order, IDs, names, summaries,
images, technologies, slugs and destinations. Roles, complete descriptions, features,
optional fields and Home's featured fields are preserved in that unchanged catalog
and continue to appear in the existing detail/dialog presentations where appropriate.
No results, dates, clients, contributions, metrics or case-study claims were added.

### Desktop index and preview

At 1100px and above, ProjectIndex renders a semantic ordered list in the left column.
Generated numbers follow catalog order. Each row has a native, explicitly named
Preview button, its first three original technology labels and a separate View
Project link. Buttons expose `aria-pressed` and reference the named preview region
with `aria-controls`. A selected surface, stronger name and thin neutral line make
selection visible. Links are never nested in buttons.

The first catalog project is selected initially. Click, Enter or Space commits a
selection; plain keyboard focus does not replace the preview. Hover never changes
selection, so moving across rows cannot cause preview flicker. Selection persists
through theme changes and layout breakpoint changes during the mounted lifetime.
Native Tab order reaches both Preview and View Project for every row. Full-project
links remain available in the preview as well.

The right stage shows the selected image, linked name, unchanged summary, complete
technology list, View Full Project and the available Live Demo/Source links. It is
sticky at a 104px top offset only when the viewport is at least 800px tall. The
desktop composition uses normal scrolling below that height. A 600px minimum stage
height prevents collapse during transitions; content can grow without clipping.
The stage stays inside the directory's grid and cannot overlap the closing/footer.
All six previews fit the tested 1440×800/900 sticky viewports. Shorter 600/700/799px
viewports use normal document scrolling.

### Mobile and intermediate layouts

Below 1100px, the index/preview is replaced rather than merely hidden: there are no
duplicate hidden desktop image requests. All six project cards expose their image,
name, full summary, technologies and actions without selection or hover. Cards stack
below 768px; 768–1099px uses two columns. Catalog order is unchanged. Actions wrap as
whole text/icon units, have at least 44px height and never split arrows from labels.

### Filter and dialog decisions

Filters are deliberately omitted. All six names fit the desktop index, with their
actual technologies visible for scanning. Framework filters would hide items from
a small, immediately browsable archive and add state/reset controls without a
necessary browsing step. No empty filters, search field, URL state or result-count
announcements are introduced. The static visible count is calculated from the catalog.

Projects now navigates directly to detail routes through images, names and explicit
links. The preview already provides the useful quick overview, so a second modal
step is redundant here. ProjectDialog and its accessibility hook remain unchanged
for Home's two existing project controls. No dialog component or detail page was
deleted, and no shared dialog behavior was rewritten. Existing repository tests do
not contain UI assertions that require a Projects modal; browser verification now
checks Projects navigation/selection and separately retains Home dialog checks.

## Components, surfaces and motion

- `Projects.jsx`: introduction, catalog-derived count, archive and closing.
- `ProjectArchive.jsx`: persistent selection, responsive composition and preview
  transition; uses the existing live reduced-motion hook.
- `ProjectIndex.jsx`: semantic index, selected buttons and direct links.
- `ProjectArchiveEntry.jsx`: shared visual/content presentation for the preview and
  mobile cards. Exiting previews become inert and hidden from assistive technology.
- `projects.css`: route-loaded, scoped styles using existing `--soft-*` tokens and
  local Onest typography. Existing global/Home/About CSS sources are untouched.

The page uses the approved off-white/near-black surfaces, thin borders, tiny embedded
monochrome grain and static restrained spotlight. There is no fake browser chrome,
colored glow, glass panel, carousel or pointer-following React state.

Preview image and information crossfade together over 0.2 seconds with an 8px entrance;
the outgoing layer fades over 0.12 seconds. The stage reserves height throughout.
Nothing cycles automatically. Existing Reveal gives the introduction a small entrance.
Fine-pointer image hover scales only to 1.025 with a soft neutral overlay; coarse
pointers do not receive that effect. Initial and live reduced motion remove movement,
make selection immediate and preserve all controls/state. There is no pointer depth.

## Accessibility and image delivery

One primary heading and ordered h2/h3 headings remain. Both layouts have semantic
project lists, named links, meaningful project-interface alternatives and decorative
icons hidden from assistive technology. No preview changes are announced through a
live region. Focus outlines use shared ink; image links also receive an inset
two-tone focus frame so clipping or screenshot colors cannot hide the focus edge.
External links preserve catalog URLs, project-specific accessible names,
`target="_blank"` and `rel="noopener noreferrer"`.

OptimizedImage still owns delivery URLs, srcset, intrinsic dimensions and async
decoding. Responsive sizes match preview/card widths. The initial project image is
eager/high-priority. Later desktop images load only when selected; mobile images
after the first are lazy. Native lazy loading can fetch nearby images before they
enter the viewport. Browser caching is reused normally; no large variants are
preloaded and no image files or optimization scripts were changed.

## Before/after measurements

Production build served locally, fresh Chromium profile, DPR 1, cache disabled,
1440×1000 direct `/projects` load, before scrolling/selection. JS includes all cold
route scripts, not just the named Projects chunk. CSS includes requested stylesheets.
Image bytes include the shared logo. These are file-size measurements, not network
benchmarks or field Core Web Vitals results.

| Measurement | Before | After |
| --- | ---: | ---: |
| Cold Projects JavaScript | 394,486 B | 390,895 B |
| Cold Projects JavaScript, gzip | 129,883 B | 128,806 B |
| Named Projects chunk | 3.07 kB | 5.17 kB |
| CSS requested on Projects | 49,257 B | 54,327 B |
| CSS requested on Projects, gzip | 10,339 B | 12,142 B |
| Initial project-image requests | 6 | 1 |
| Initial images including logo | 7 | 2 |
| Initial image bytes including logo | 187,850 B | 79,632 B |
| Page height at 390×844 | 2,913px | 3,690px |
| Page height at 1440×1000 | 1,353px | 1,562px |

Cold JS drops by 3,591 B despite the larger page chunk because Projects no longer
loads the dialog. Vite reshuffles shared chunks; Home source remains untouched.
CSS increases by 5,070 B: 6.50 kB route CSS is added while Tailwind removes obsolete
Projects-only utilities from the global output (now 47.83 kB). Initial image bytes
drop about 58%. The new desktop preview requests AC-CORE's 960px variant instead of
six 640px images. Initial measured layout shift is 0.

Page height increases deliberately: the desktop gives all six index entries space;
mobile now includes untruncated summaries, every technology and direct external/detail
actions, plus a natural closing. It does not hide content to achieve a shorter metric.
All requested viewport widths pass without horizontal overflow or clipped actions.

## Verification

- `npm.cmd run test:contact`: 10 passing; provider calls are mocked, no real email.
- `npm.cmd run test:seo`: 6 passing, including catalog metadata, optimized image
  variants and deep-link behavior.
- ESLint, production build and `git diff --check` pass.
- Both themes checked at 320, 390, 768, 900, 1024, 1200, 1440 and 1920px. All catalog
  entries retain their order; summaries, every technology, detail URLs and external
  URLs match shared data. No horizontal overflow.
- Mouse, Enter/Space selection, focus-only stability, separate keyboard detail
  links, touch selection, breakpoint selection persistence and absence of hover
  switching checked. Initial and live reduced motion preserve selection/functionality.
- Every preview tested against short-height/sticky boundaries; no closing overlap.
- `/projects` and all six detail routes checked through direct load and refresh,
  matching metadata and Projects active navigation. Browser Back, route focus,
  skip link, theme switching and mobile menu/Escape/focus restoration checked.
- Home's dialog retains initial focus, inert background, scroll locking,
  forward/reverse focus containment, Escape and exact opener restoration after its
  exit animation finishes. The shared implementation is unchanged.
- Home and About text match the baseline. Full-page screenshots at 390/1440 in
  both themes match pixel-for-pixel: zero changed pixels across all eight comparisons.
- Console checks found no new errors or warnings. Final mobile screenshots were
  captured after scrolling through all lazy images, then returning to the top.

Final screenshots:

- `C:/Users/user/AppData/Local/Temp/portfolio-home-3l751M/projects-dark-390.png`
- `C:/Users/user/AppData/Local/Temp/portfolio-home-3l751M/projects-light-390.png`
- `C:/Users/user/AppData/Local/Temp/portfolio-home-3l751M/projects-dark-1440.png`
- `C:/Users/user/AppData/Local/Temp/portfolio-home-3l751M/projects-light-1440.png`

Remaining manual checks: physical-phone touch/reading comfort, NVDA/VoiceOver selected
state and link announcements, Safari/Firefox sticky rendering, actual browser zoom
and forced-colors mode, screenshot quality on high-DPR displays, and external demo
availability. External services were not contacted to validate uptime.

Modified: Projects.jsx. Added: three Projects components, projects.css and this
document. Deleted: none. All project facts/URLs and other page interiors are
preserved. No real email, commit, push, merge or deployment was performed.
