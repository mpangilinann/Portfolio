# Interface Lab and expressive Home motion

This refinement builds on the uncommitted shared motion and Home motion work on
`main`. Earlier notes remain as historical baselines; this document describes the
current Home. All other pages, navigation, footer, dialogs, Contact/API behavior,
factual data, original assets, dependencies and resume PDF are preserved.

## Interface Lab

`src/components/home/InteractiveInterfaceLab.jsx` replaces DeveloperSnapshot.
The accessible region is named **Interface Lab**, with the visible supporting
label **Responsive component study** and a screen-reader description explaining
that this is an interactive demonstration, not a separate website or submission.

Visible preview content:

- MP mark; decorative Work and Process labels; Reset control.
- Responsive interface.
- Designed to adapt.
- Clear structure, accessible interaction, and considered motion.
- Try interaction / Selected toggle, exposing aria-pressed.
- Accessible and Responsive principle cards.

Wide and Compact are native buttons in a labeled group, with aria-pressed and
aria-controls. Default is Wide above 599px and Compact below. The current choice
persists through resizing and theme changes. Reset clears only the demonstration's
selected state. No Lab control submits, navigates, sends information or creates a
notification. The miniature labels/menu/mark are decorative and not focusable.
All four Lab controls have 44px minimum heights.

The existing two-column/stacked hero breakpoints are retained. The preview stage
reserves 324px in either mode. Compact narrows to at most 260px, simplifies the
miniature navigation and stacks copy above the reorganized principle cards. Wide
restores the two-column miniature layout where space permits; at small widths it
adapts without horizontal scrolling.

Framer Motion projects the layout change through transforms over 450ms using the
shared ease-out curve. Position-layout children reduce text scaling. A brief
200ms copy fade accompanies the change. There is one preview tree throughout,
with no overlapping outgoing layout or duplicate interactive controls. The primary
button and its state remain mounted when the viewport changes.

Fine-pointer depth uses the existing frame-batched pointer hook: outer maximum
3.2px per axis and inner additional 1.6px (combined diagonal under 7px), returning
over 400ms. No text rotation, floating loop or per-pointer React state update.
Touch/coarse pointers, keyboard focus and reduced motion remove depth immediately.

## Home motion

`homeMotion.js` extends existing shared timing/easing locally. Shared restrained
reveals on other pages are not changed.

Hero starts: availability 0ms, masked name 70ms, role 140ms, description 210ms,
location 280ms, actions together 350ms, outer Lab 420ms. Main entrances use 520ms.
Lab header starts at 490ms, preview frame 560ms, copy 600ms and cards 630ms; their
420ms entrances finish nominally by 1050ms. Recorded Chrome frames finish around
1.1s including scheduling overhead. Buttons remain operable throughout; native
focus immediately finishes containing entrance layers.

Text begins at opacity 0, with 24–32px motion. The name stays a single selectable
heading with a vertical mask and final bounds extending beyond descenders. Only
the supporting description uses a brief 7px blur; its filter is removed at the
end rather than retained. Surfaces use scale 0.98 where appropriate.

Viewport reveals run once at 20% intersection, without fading out on scroll exit:

- About heading and paragraph/link use opposing 24px horizontal movement, with
  the body following after 70ms.
- Selected work heading rises before complete project cards at 70/140ms.
- Actual decoded project images reveal from 0.4 opacity and scale 1.04 through a
  35% bottom mask over 700ms. Frames keep their aspect ratio, text reveals
  independently, image errors release readiness, and no preload/image is added.
- Approach entries fade/rise as blocks at 100/200/300ms; existing line retained.
- Technologies fade/rise/scale in three desktop or four narrower waves; existing
  selection, relationships and Escape behavior are preserved. Labels stay stable
  during icon interaction.
- Closing message uses a calm mask, then supporting text and actions. Existing
  button/arrow feedback and the shared black footer reveal remain intact.

The mask depth is bounded at 0.55em: a single-line heading still has enough
unclipped area to meet the observer's 20% threshold. This avoids a permanently
pending heading on layouts where the closing message fits one line.

## Reduced motion and focus

Initial/live reduced motion immediately shows all Home content, removing filters,
masks, transforms, pointer depth, delays and pulses. The existing HomeReveal latch
prevents re-hiding when the preference is disabled again. Focusing a Lab control
also latches all internal entrance layers visible for that visit.

Lab mode transitions have zero duration under reduced motion. Local CSS cancels
transitions entirely: the existing global 0.01ms reduced-motion duration would
otherwise create a short width/padding transition on elements whose default
transition-property is `all`. Recorded frames verify the Compact target width
from the first frame, with no animations or transforms. Live changes during a
layout transition settle immediately and do not resume a stale projection.

DOM order, one main landmark, heading hierarchy, focus outlines, text selection,
dialog trapping, Escape, inert background, scroll lock and trigger restoration
remain intact. No animated reveal makes its controls hidden or inert.

## Production comparison

Local Chrome, direct cold Home load, cache disabled, DPR 1, 1440x900. Values sum
requested asset bytes and individual gzip sizes; they are not field metrics.

| Resource | Before | After | Difference |
| --- | ---: | ---: | ---: |
| Home JavaScript | 433,487 B | 436,611 B | +3,124 B (0.72%) |
| Gzipped JavaScript | 145,415 B | 146,265 B | +850 B |
| Home-loaded CSS | 50,401 B | 52,723 B | +2,322 B |
| Gzipped CSS | 10,889 B | 11,352 B | +463 B |
| JavaScript requests | 11 | 11 | unchanged |
| CSS requests | 2 | 2 | unchanged |
| Initial image requests | 3 | 3 | unchanged |

Removing Snapshot-only styles shrinks global CSS from 47,376 to 44,530 B. Home's
own stylesheet grows from 3,025 to 8,193 B. No fonts, media or dependencies added.

Page heights, identical in both themes at 900px viewport height:

| Width | Before | After |
| --- | ---: | ---: |
| 320 | 3,857px | 3,921px |
| 390 | 3,664px | 3,737px |
| 768 | 2,973px | 2,993px |
| 1024 | 2,457px | 2,476px |
| 1440 | 2,650px | 2,650px |
| 1920 | 2,665px | 2,665px |

Smaller layouts grow only to accommodate the new Lab; other section content,
spacing and order are unchanged. Switching modes never changes page/hero height,
including per-frame checks. Initial and full matrix layout shift measurements are 0.

## Verification

- Both themes at 320/390/768/1024/1440/1920px and 1440x600: 14 Home cases, both
  modes, no internal or page overflow, no pending/faded content after scrolling,
  unchanged left hero wording and content below the hero, and three initial images.
- Mouse, Tab, Enter, Space, native emulated touch, clear pressed/focus states,
  interaction toggle/reset, rapid latest-mode selection, stable frame dimensions,
  no duplicate/stale preview, depth bounds/reset and live theme changes pass.
- Actual entrance, layout and reduced-motion frames checked. Text remains
  selectable, blur clears, once-reveals persist on upward scrolling. Initial/live
  reduced motion and on/off changes during entrances and layout transitions pass.
- Direct Home load, returns from every main page, Back/Forward, reload at three
  scroll positions, fast jumps, slow scrolling, technology interaction, project
  image decoding, one-request image delivery, project dialog trapping/isolation/
  scroll-lock/Escape and exact opener restoration pass.
- Static non-Home screenshots: About, Projects, Resume, Contact, all six detail
  pages and Not Found match baseline pixel for pixel in both themes at 390/1440px
  (44 comparisons). Reduced motion freezes existing animations for comparison.
  Their main text/heights also match; their source files and page styles are
  unchanged. The Home stylesheet remains loaded during those comparisons.
- Contact tests 10/10, SEO tests 6/6, project-detail tests 3/3; lint, production
  build and git diff --check pass. Contact provider tests use mocks only.
- Hash audit confirms unrelated source, data, API, assets, PDF, dependencies,
  navbar/footer, accessibility hooks and the earlier notes are unchanged.

Baseline Home screenshots/frames:
`C:/Users/user/AppData/Local/Temp/portfolio-home-y4VcI4/`
Static route/bundle baseline:
`C:/Users/user/AppData/Local/Temp/portfolio-home-FNjMEn/`
Home matrix and 44 cross-route screenshot comparisons:
`C:/Users/user/AppData/Local/Temp/portfolio-home-LGwYnx/`
Final touch/theme/layout frames and bundle measurements:
`C:/Users/user/AppData/Local/Temp/portfolio-home-0Rf2Im/`
Final reduced-motion frame proof:
`C:/Users/user/AppData/Local/Temp/portfolio-home-hIkPdv/`
Final Lab/Home interaction and entrance frames:
`C:/Users/user/AppData/Local/Temp/portfolio-home-xcr8WO/`

The complete matrix preceded the final Lab-only reduced-transition cancellation;
final interaction/frame checks were rerun against the completed build. Normal
Home layout/timing and all non-Home styles were unchanged by that correction.

## Files and cleanup

Added: `src/components/home/InteractiveInterfaceLab.jsx`,
`src/components/home/homeMotion.js`, this document.

Modified: `src/pages/Home.jsx`; `src/components/home/HomeReveal.jsx`,
`Approach.jsx`, `TechnologyGrid.jsx`; `src/styles/home.css`, `home-motion.css`;
`src/utils/motion.js`; `src/hooks/usePointerSurface.js`.

Deleted: `src/components/home/DeveloperSnapshot.jsx`, after confirming no other
imports. Its styles/responsive overrides, unused shared Snapshot preset and
unused word-opacity variables in the pointer hook are removed. Shared utilities
remain available; no other preset or pointer behavior changed. All unrelated
uncommitted work is preserved.

Remaining manual checks: physical touch devices and low-power/high-refresh
screens; Safari/Firefox layout projection and masks; VoiceOver/NVDA reading flow;
native zoom and forced-colors readability. Automated touch uses Chrome emulation.

No real email, commit, push, merge or deployment occurred.
