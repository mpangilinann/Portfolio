# Compact project-detail refinement

## Scope and confirmed baseline

The work started on `main` with the completed Projects archive still uncommitted;
About was already committed. Those changes were preserved. A starting SHA-256
snapshot includes tracked and untracked files, so preservation covers the complete
pending Projects implementation and its notes, not just committed sources.

The six detail routes previously shared a functional but oversized template: a
106.9px desktop title, a 651–684px full-width image, large header/section margins,
long numbered feature rows, separated metadata and a generously spaced closing.
Baseline contact tests, SEO tests, lint and build passed. Every existing detail
route was measured before changing the template. All six optimized screenshots
were inspected individually; their similar proportions need no catalog overrides.

Only ProjectDetail.jsx is changed from the starting implementation. New files are
ProjectNavigation.jsx, project-detail.css, utils/projectDetail.js, the focused
project-detail.test.mjs checks and this document. Nothing is deleted. The existing
Projects.jsx diff and untracked archive files remain byte-identical to the start.
No package, catalog, asset, global style source, metadata, navbar, accessibility
hook, API, environment variable or deployment configuration is modified.

## Final reusable architecture

All six routes continue to use one catalog-driven ProjectDetail template:

1. All projects breadcrumb and a compact header grid: position, name and summary
   beside the supported role and Live Demo/Source actions.
2. A controlled primary image frame.
3. Compact project information beside the fuller overview.
4. A shared two-column feature grid in the main content column.
5. Optional extended sections and gallery only when populated.
6. One previous/all/next navigation band.

The header uses the shared summary once; Overview retains fullDescription without
repeating that summary. All existing words, feature names, technology strings,
supported roles, URLs and catalog order remain unchanged. No explanations, metrics,
case-study claims or project-specific content were invented.

## Title, header and image treatment

Short titles use `clamp(42px, 4.8vw, 64px)` on larger screens. Names longer than
13 characters use `clamp(38px, 4vw, 52px)`, covering Coffee Lab, Q-Zone and TechQuest
without a second list of project-specific rules. Phones use 40px and 36px
respectively. The old title was 44px at 390px and 106.875px at 1440px. Titles wrap
naturally and do not require a screen-sized header. Summary line length is bounded;
actions use the existing monochrome primary/secondary button styles, complete
text/icon units, descriptive names and secure new-tab attributes.

The frame is centered, at most 960px wide and 480px tall on desktop, with a 2:1
ratio, restrained border/radius and the existing neutral surface. `object-fit:
contain` displays the complete screenshot, including navigation, sidebar and
bottom content. There is no crop, artificial browser toolbar, zoom animation,
pointer depth or colored effect. All six images use that default successfully;
the project catalog needs no additional presentation fields.

At tablet widths the frame ratio is 1.9:1. On phones it is 16:10 (about 219px tall
at 390px and 175px at 320px). The smaller 320px frame follows the available width
rather than manufacturing empty height. The image element fills the frame while
the contained bitmap retains its natural proportions and may have neutral gutters.

OptimizedImage still supplies responsive variants, explicit intrinsic dimensions,
async decoding and accurate alternatives. The primary image remains eager/high
priority. Responsive sizes now match the 960px maximum; DPR 1 desktop loads the
960px variant rather than 1440px. Gallery images remain lazy. No adjacent project
images are requested. The frame reserves layout before decoding; measured initial
layout shift is 0 for all tested detail loads.

## Information, features and optional content

Metadata sits beside Overview and Key features at desktop/tablet widths, with
compact labels and a plain wrapping technology list. There is no sticky sidebar
or oversized pill collection. On phones, metadata becomes a small grid above
Overview, with the complete technology list spanning both columns for readability.
The overview uses a controlled line length and 15px/14px text with comfortable
line spacing. All information stays directly available rather than in accordions.

Features are one semantic ordered list with subtle horizontal/internal separators:
two columns at 768px and above, one column below. Numbers are restrained and
decorative; only the existing feature names are shown. A feature group reveals
together, with no per-item staggering or added explanations.

`getProjectDetails` only selects optional presentation content from the catalog.
Type/status/team context render as metadata when meaningful. Target users retain
their order. Contributions span the content width; Challenges/Lessons can share a
pair of columns. A lone section takes the available width. Gallery images use a
responsive two-column/one-column sequence, captions and the existing image system.
Repeated primary images, duplicate gallery sources and entries without a meaningful
source/alternative are omitted. Missing and whitespace-only optional values create
no heading, placeholder or reserved space. No catalog object is mutated.

Current real projects have no extended optional sections. Their omission was
verified on every route. Populated branches were additionally tested with isolated
browser fixtures served in memory: type, status, audience, team, contributions,
challenges, lessons, captioned gallery and duplicate exclusion. These fixtures never
change repository data or production assets. Three focused Node tests cover empty
values, preserved wording/order/non-mutation and gallery validation/deduplication.

## Navigation, motion and accessibility

ProjectNavigation owns one compact band: previous when available, Back to all
projects, and next when available. Directional links include project names and
`rel="prev"`/`rel="next"`. The catalog defines order without wrapping. Flex layout
adapts to first/last projects without an empty placeholder column; mobile stacks
the actual links with 44px or larger targets. Closing margins are reduced.

The page reuses local Onest, `--soft-*` tokens, embedded monochrome grain and a
static low-contrast header spotlight. It has one h1, ordered h2 sections, semantic
metadata/feature lists, accurate image alternatives, named external links and
theme-aware visible focus. Buttons cannot split their labels from their icons.
DOM reading order matches visual order.

Existing Reveal/Framer Motion handles coordinated header, image and section
entrances: at most 10px movement over 0.35s, no artificial delay and no opacity
gate hiding text. Features reveal as a group. Initial and live reduced motion
remove movement immediately and show all content. No pointer depth or continuous
animation is introduced. Shared skip link, route focus, mobile menu and floating
navbar behavior remain unchanged; Projects stays active on every detail route.

## Before/after measurements

Production build served locally in fresh headless Chromium, DPR 1, cache disabled.
Page heights include shared main/footer. Widths use 390×844 and 1440×1000 viewports;
both themes produce the same heights. Below-fold reveals were settled before final
geometry capture. File bytes are not a production speed benchmark or Lighthouse
claim. Initial image bytes below include the shared logo.

| Project | Height at 390px: before → after | Height at 1440px: before → after |
| --- | ---: | ---: |
| AC-CORE | 2,506 → 1,786px | 2,475 → 1,603px |
| Flashify | 2,507 → 1,813px | 2,475 → 1,603px |
| Thryve | 2,479 → 1,787px | 2,479 → 1,603px |
| The Coffee Lab & Lounge | 2,545 → 1,822px | 2,476 → 1,562px |
| Q-Zone Detailers | 2,477 → 1,782px | 2,474 → 1,590px |
| TechQuest Jobs | 2,337 → 1,653px | 2,449 → 1,562px |

Heights decrease about 28–29% on phones and 35–37% on desktop. This comes from
structure, image sizing and spacing rather than deleting or collapsing content.

| Production resource | Before | After |
| --- | ---: | ---: |
| Cold detail-route JS | 388,835 B | 388,822 B |
| Cold detail-route JS, gzip | 127,703 B | 127,719 B |
| Named ProjectDetail chunk | 6.84 kB | 5.99 kB |
| CSS requested on detail route | 47,883 B | 52,521 B |
| CSS requested on detail route, gzip | 10,154 B | 11,823 B |
| Initial layout shift | 0 | 0 |

Cold JS is effectively unchanged. The new 6.78 kB detail-only stylesheet is offset
partly by Tailwind dropping old detail-only utilities from the global output,
now 45.74 kB. Shared source CSS is untouched. Vite redistributes shared image/reveal
code between chunks, so the named chunk alone is not the cold-load cost.

| Project | 390px image element height: before → after | 1440px image element height: before → after | 390px heading-to-overview: before → after | 1440px heading-to-overview: before → after |
| --- | ---: | ---: | ---: | ---: |
| AC-CORE | 173.2 → 216.8px | 651.4 → 478px | 933.8 → 713.3px | 1,030.2 → 698.7px |
| Flashify | 181.2 → 216.8px | 680.7 → 478px | 851.7 → 688.1px | 1,059.5 → 698.7px |
| Thryve | 182.2 → 216.8px | 684.3 → 478px | 852.8 → 688.1px | 1,063.0 → 698.7px |
| The Coffee Lab & Lounge | 181.2 → 216.8px | 681.6 → 478px | 919.3 → 722.6px | 1,060.3 → 685.8px |
| Q-Zone Detailers | 180.6 → 216.8px | 678.9 → 478px | 851.2 → 657.2px | 1,057.7 → 685.8px |
| TechQuest Jobs | 181.7 → 216.8px | 683.4 → 478px | 852.3 → 657.2px | 1,062.1 → 685.8px |

The new frame heights are 218.75px and 480px, including borders. On phones, the
image element includes neutral containment gutters; the actual bitmap is not
stretched or cropped to that element ratio. The page remains substantially shorter.

| Project | Initial image bytes at 390px, unchanged | Initial image bytes at 1440px: before → after |
| --- | ---: | ---: |
| AC-CORE | 56,644 B | 114,616 → 79,632 B |
| Flashify | 46,426 B | 83,422 → 60,518 B |
| Thryve | 43,824 B | 108,472 → 60,430 B |
| The Coffee Lab & Lounge | 57,496 B | 113,150 → 76,218 B |
| Q-Zone Detailers | 62,898 B | 199,528 → 108,104 B |
| TechQuest Jobs | 55,302 B | 134,554 → 87,530 B |

## Verification and review artifacts

- Contact tests: 10 passing; SEO tests: 6 passing; focused optional-content tests:
  3 passing. ESLint, production build and `git diff --check` pass.
- All six routes checked in both themes at 320, 390, 768, 900, 1024, 1200, 1440 and
  1920px: 96 combinations. No horizontal overflow, oversized title wrapping,
  clipped content, unexpected optional sections or adjacent-image requests.
- Summary, full description, every technology, every feature, external link and
  previous/next destination match the existing catalog. Canonical, description,
  title and CreativeWork JSON-LD match the existing metadata resolver.
- Each route checked through direct loading, refresh, browser Back, native keyboard
  navigation, skip link, visible focus, initial/live reduced motion and touch
  navigation through the archive. Main receives route focus correctly.
- Every route checked at desktop heights 700, 768 and 900px. The first viewport
  includes identity and more than half the primary image; at taller sizes it shows
  the entire image. No sticky layout or navbar overlap is introduced.
- Unknown slug retains Not Found, noindex/nofollow, no canonical and no JSON-LD.
- Optional populated fields/gallery verified in isolated fixtures at 390/1440px.
- Home, About and the pending Projects archive retain their source hashes and
  pixel-identical full-page screenshots at 390/1440px in both themes: 12 comparisons.
- Browser console checks record no new errors or warnings. No real email was sent.

Screenshots are in `C:/Users/user/AppData/Local/Temp/portfolio-home-ehRDV4/`:

- `detail-ac-core-dark-390.png` / `detail-ac-core-light-390.png`
- `detail-ac-core-dark-1440.png` / `detail-ac-core-light-1440.png`
- `detail-the-coffee-lab-lounge-dark-390.png` / `detail-the-coffee-lab-lounge-light-390.png`
- `detail-the-coffee-lab-lounge-dark-1440.png` / `detail-the-coffee-lab-lounge-light-1440.png`

Raw before/after measurements are retained in the temporary files
`detail-baseline.json` and `detail-final-measurements.json`. Baseline/protected
screenshots are in `portfolio-home-v1A4sT`; protected after captures in
`portfolio-home-LWIFJq`, under the same temporary directory.

Remaining manual review: physical-phone reading and touch comfort, NVDA/VoiceOver
announcements, Safari/Firefox image/layout behavior, actual browser zoom and
forced-colors mode, high-DPR screenshot readability and external demo uptime.
No deployment, external service availability or real email delivery was tested.

All project facts, routes and URLs remain unchanged. Home, About, Projects archive,
Resume, Contact and Not Found interiors were not redesigned. No commit, push,
merge or deployment was performed.
