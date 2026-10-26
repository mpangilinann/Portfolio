# Passive Code-to-Interface Studio

Replaces the interactive Interface Lab while preserving the uncommitted motion
system, left hero JSX/styles/timing and all Home sections below the hero. Earlier
motion notes remain as historical baselines.

## Component and composition

`src/components/home/CodeInterfaceStudio.jsx` is a passive, labeled figure with a
minimal `interface.jsx` header, Preview label and stationary status dot. No file
tree, OS controls, simulated collaboration, fake branch, buttons, inputs, typing,
instructions, hover depth or continuous animation.

The editor shows the requested valid JSX: a principles array containing
Accessible, Responsive and Maintainable, then an exported Interface function that
returns Experience with the principles and considered-motion props. A shared
array generates both the displayed code and the rendered principle list.

The preview shows “Rendered interface”, “Designed to adapt.”, the supporting
sentence about clear structure/accessibility/considered motion, and the three
principles. It uses the existing monochrome tokens, borders, radii and primary
font. Code intentionally uses a local system monospace stack at 12.5px; no font
asset or external font request is introduced.

The desktop grid gives the preview 52% of the body. Narrow containers stack the
two areas, and mobile always places preview first. Code uses pre-wrap and safe
wrapping rather than horizontal scrolling. Wider layouts retain the previous
438px right-side reservation, preserving the left hero's vertical position and
page heights. Mobile grows naturally to accommodate readable code and preview.

The existing outer 420ms-delayed entrance is retained with identical motion values
under the renamed studio preset. Header, code, preview and canvas follow at
490/560/600/630ms with 420ms entrances. No typing or replay loop. All approved
stronger left-hero and scroll variants are untouched. Initial/live reduced motion
uses the existing HomeReveal safeguards and shows the full scene immediately.

The figure is not a second application or landmark. Its caption explains the
illustration; code remains selectable. Nothing inside enters the tab order or
submits/navigates. Reading order starts with the preview, matching mobile layout.

## Baseline and final measurements

Cold direct Home load, local production Chrome, cache disabled, 1440x900, DPR 1.
Requested asset byte sums and individual gzip sums:

| Resource | Before | After | Difference |
| --- | ---: | ---: | ---: |
| JavaScript | 436,611 B | 434,755 B | -1,856 B |
| Gzipped JavaScript | 146,265 B | 145,816 B | -449 B |
| CSS | 52,723 B | 49,981 B | -2,742 B |
| Gzipped CSS | 11,352 B | 11,089 B | -263 B |

11 JavaScript requests, two CSS requests and three initial image requests remain
unchanged. Global CSS stays byte-identical. No media or dependency changes.

Page heights in either theme at 900px viewport height:

| Width | Before | After |
| --- | ---: | ---: |
| 320 | 3,921px | 4,128px |
| 390 | 3,737px | 3,913px |
| 768 | 2,993px | 2,993px |
| 1024 | 2,476px | 2,476px |
| 1440 | 2,650px | 2,650px |
| 1920 | 2,665px | 2,665px |

## Verification

- Final 14-case Home matrix: both themes at 320/390/768/1024/1440/1920px and
  1440x600. Studio/code fit their bounds without horizontal scrolling; mobile
  preview comes first. Displayed JSX parses with the existing Babel JSX parser.
- Left hero text and every section below the hero match the baseline. Left hero
  screenshot regions match pixel for pixel at 768/1024/1440 in both themes.
- The stronger hero/scroll reveals remain once-only. Recorded entrance frames,
  completed filter cleanup, initial/live reduced motion and preference on/off,
  selectable code, correct figure semantics and passive Tab order pass.
- Existing Home regression checks pass: project dialogs, focus trapping/isolation,
  scroll lock, Escape and exact opener restoration, keyboard/touch, technology
  relationships, route returns, Back/Forward, refresh at different positions,
  fast/slow scrolling, image decoding and one-request image delivery.
- All 44 static comparisons of non-Home routes match pixel for pixel: About,
  Projects, Resume, Contact, six detail pages and Not Found, both themes at
  390/1440. Reduced motion freezes existing animation phases for comparison.
- Final 500/599/600px checks cover the mobile/tablet boundary and stacked separator.
- Measured layout shift is zero in all Home matrix cases. No console warnings or
  errors. The Studio creates no overflow; the existing opposing About entrance
  remains unchanged (its offscreen 24px offset can transiently extend 4px beyond
  the 320px viewport before revealing). No global overflow-hiding workaround added.
- All 19 existing tests pass: Contact 10, SEO 6, project-detail 3. Lint, production
  build and git diff --check pass. Contact tests use provider mocks only.
- Hash audit confirms unrelated source/styles, assets, data, API, tests and PDF
  match the starting working tree. Previous uncommitted work is preserved.

Baseline normal Home screenshots/heights:
`C:/Users/user/AppData/Local/Temp/portfolio-home-dAVieJ/`
Baseline static routes and bundle sizes:
`C:/Users/user/AppData/Local/Temp/portfolio-home-eiGruh/`
44 static route comparisons:
`C:/Users/user/AppData/Local/Temp/portfolio-home-PRuZ5H/`
Final Home screenshots, dimensions and matrix:
`C:/Users/user/AppData/Local/Temp/portfolio-home-6D1MZl/`
Home interaction regression:
`C:/Users/user/AppData/Local/Temp/portfolio-home-DMpkzu/`
Final Studio accessibility/entrance frames:
`C:/Users/user/AppData/Local/Temp/portfolio-home-eN7CxJ/`
Final breakpoint checks and bundle measurements:
`C:/Users/user/AppData/Local/Temp/portfolio-home-gh1mme/`

The full non-Home comparison preceded the final Studio-only height reservation
and mobile separator adjustment. Final Home/accessibility/breakpoint checks were
rerun; non-Home styles were never changed.

## Files

Added: `src/components/home/CodeInterfaceStudio.jsx`, this document.
Modified: `src/pages/Home.jsx`, `src/components/home/homeMotion.js`,
`src/styles/home-motion.css`.
Removed: `src/components/home/InteractiveInterfaceLab.jsx` after confirming Home
was its only importer. All Lab-only controls, state, layout timing, depth and CSS
are removed; no shared utility was deleted or changed.

Remaining manual checks: physical-device readability and perceived pacing,
Safari/Firefox container-query and mask rendering, screen readers, zoom and
forced-colors. Browser touch checks use Chrome emulation.

No real email, commit, push, merge or deployment occurred.
