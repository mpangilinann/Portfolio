# Expanded interior motion audit

Implemented on the existing uncommitted `main` working tree. Earlier work was preserved. No dependencies, catalog content, assets, PDF, Contact behavior, commits, pushes, merges, or deployments were changed by this task.

## Motion and page choreography

The baseline Home already used visible 24–32px entrances, masked headings, selective blur, and decode-aware images. Interior pages used the earlier restrained 6–10px, opacity-0.78 reveals. Interiors now share Home's easing and expressive vocabulary while retaining their own sequences. Entrance/section/image durations are 520/600/700ms; replacement crossfades are 380ms. Viewport reveals trigger once at 20%, remain visible on return, and clear clipping/blur afterward.

- About: eyebrow, masked title, biography, circular color portrait, supporting details/actions. Portrait starts at 0.97 scale with a circular mask; dimensions/crop remain unchanged. Education uses directional groups; internship responsibilities use three waves. Skills controls enter in a short stagger and active panels crossfade without replaying their section entrance. Existing desktop minimum panel height remains; natural mobile category heights are retained. Professional qualities reveal in grouped waves.
- Projects: masked introduction, archive header, complete staggered rows, preview stage. Fine-pointer hover, focus, click, Enter, and Space select projects. Incoming images decode before coordinated image/text replacement; the previous preview remains available while waiting. Latest-selection guards and cached-image re-notification handle rapid A/B/A selection. A synchronous text-only measurement reserves the initial preview height for every selection without cloning/requesting images or animating dimensions. Mobile cards use complete-item entrances and decoded image masks.
- All six detail routes: label, masked title, summary, metadata, primary decoded image; then heading-first overview/features/optional sections and one navigation band. Features use capped grouped waves. Contributions, challenges, lessons, and gallery work when populated and stay omitted when empty. Endpoint navigation is preserved.
- Resume: current canvas layout retained; no old sidebar restored. Label/title/role/location/actions lead into structured summary, education, complete project entries, grouped experience/skills, and three certification waves. Existing disclosures, all nine certificates, résumé-only project format, print expansion, and PDF actions remain intact.
- Home: only shared state/preset extraction plus a mobile gutter overflow guard. The guard clips off-viewport directional travel below 600px, retains the approved motion values, and leaves visible composition/focus outlines unchanged. Home JSX, Studio, and Home design styles were preserved.
- Contact: component, API, validation, animation, and submission flow unchanged. Shared chrome remains unchanged.

## Implementation inventory for this task

Added:

- `src/utils/revealMotion.js`: shared expressive presets and timing.
- `src/hooks/useRevealState.js`: one-time reveal state, readiness, live reduced-motion latch.
- `src/components/motion/DecodedImage.jsx`: existing optimized image delivery with native decode gating, error completion, stale-callback protection, cached reentry, and settled state.
- `src/components/projects/usePreviewHeight.js`: responsive, text-only preview-height reservation and observer cleanup.
- `EXPANDED_MOTION_NOTES.md`: this audit.

Modified:

- `src/utils/motion.js`
- `src/components/motion/Reveal.jsx`
- `src/components/home/HomeReveal.jsx`
- `src/components/home/homeMotion.js`
- `src/components/OptimizedImage.jsx`
- `src/components/about/AboutIntroduction.jsx`
- `src/components/about/AboutSkillsDirectory.jsx`
- `src/pages/About.jsx`
- `src/pages/Projects.jsx`
- `src/components/projects/ProjectIndex.jsx`
- `src/components/projects/ProjectArchive.jsx`
- `src/components/projects/ProjectArchiveEntry.jsx`
- `src/pages/ProjectDetail.jsx`
- `src/pages/Resume.jsx`
- `src/components/resume/ResumeExperience.jsx`
- `src/components/resume/ResumeSkills.jsx`
- `src/styles/projects.css`
- `src/styles/motion.css`

Some modified files were already untracked at task start. No files were deleted by this task; the pre-existing DeveloperSnapshot deletion was preserved. No dependencies were added or removed. Route splitting remains intact; interiors do not import Home-only code. Projects/details request one additional shared image-helper JS chunk, without additional images.

## Cold-route resources (bytes)

Measured production build, 1440×900 dark, browser cache disabled. Each value is before → after. Gzip sums individual requested assets; these are resource sizes, not field performance measurements.

| Route | JS raw | JS gzip | CSS raw | CSS gzip |
| --- | ---: | ---: | ---: | ---: |
| Home | 434755 → 435044 | 145816 → 146079 | 49981 → 52245 | 11089 → 11423 |
| About | 435600 → 436675 | 146864 → 147281 | 51230 → 53494 | 11613 → 11947 |
| Projects | 394079 → 397634 | 130218 → 131926 | 50819 → 53113 | 11596 → 11936 |
| AC-CORE detail | 391081 → 393281 | 128591 → 129695 | 51312 → 53576 | 11671 → 12005 |
| Flashify detail | 391081 → 393281 | 128591 → 129695 | 51312 → 53576 | 11671 → 12005 |
| Thryve detail | 391081 → 393281 | 128591 → 129695 | 51312 → 53576 | 11671 → 12005 |
| Coffee detail | 391081 → 393281 | 128591 → 129695 | 51312 → 53576 | 11671 → 12005 |
| Q-Zone detail | 391081 → 393281 | 128591 → 129695 | 51312 → 53576 | 11671 → 12005 |
| TechQuest detail | 391081 → 393281 | 128591 → 129695 | 51312 → 53576 | 11671 → 12005 |
| Resume | 394264 → 395724 | 129809 → 130264 | 53013 → 55277 | 11653 → 11987 |
| Contact | 390995 → 390818 | 128362 → 128299 | 44530 → 46794 | 9650 → 9984 |
| Not Found | 268772 → 268595 | 87975 → 87908 | 44530 → 46794 | 9650 → 9984 |

Global CSS grew 2264 raw / 334 gzip bytes. Route CSS is unchanged except Projects (+30 raw bytes). Target-route raw JS growth is below 1%.

## Geometry and delivery

Default page heights unchanged in both themes, listed as 390px / 1440px widths (900px viewport height): Home 3913/2650, About 3644/2576, Projects 3690/1562, Resume 5081/3216, Contact 1722/1127, AC-CORE 1786/1603, Flashify 1813/1603, Thryve 1787/1603, Coffee 1822/1562, Q-Zone 1782/1590, TechQuest 1653/1562, Not Found 1006/992.

Observed CLS was 0 in the route matrix. No initial image-request increases against available baselines. At 1440px, counts remain Home 3, About 2, Projects 2, each detail 2, Resume 1, Contact 1, Not Found 1. Mobile Projects retains its existing responsive/lazy image delivery (5 initial images at 390px). All six desktop preview selections retain the same measured height (615.65625px at 1440px), including responsive remeasurement. No horizontal overflow remained after final checks.

The unchanged PDF SHA-256 is `0C23C58C14DEE5EEC71F86E01167D0FB97819EACF89D1657BF68028D7645BC76`.

## Verification

- 168 normal-motion route/theme/viewport cases: Home, About, Projects, Resume, Contact, six details, invalid route; light/dark; 320, 390, 768, 1024, 1440, 1920px plus short desktop. Slow/fast scrolling, upward return, no stuck reveals/replays, no console errors/warnings.
- 48 settled screenshots (12 routes × both themes × 390/1440) pixel-identical to baseline using reduced motion to freeze animation phases. Text and default heights match. Final Home/Projects follow-up: all eight screenshots also pixel-identical.
- Final targeted checks supplement the full matrix after preview-height, cached-image, stage-entrance, and mobile gutter refinements: actual entrance frames on all nine target routes, About circle mask, rapid cached A/B/A, delayed image decoding, preview resize, fine-pointer hover retention, initial Home gutter travel, native Tab focus, all detail endpoints/refresh/history/Home-dialog navigation, optional gallery/section fixtures, and professional qualities.
- Optional-section fixtures existed only in the isolated browser realm; catalog files were not edited. Existing tests cover omitted/empty/duplicate-gallery behavior.
- Keyboard: skip link, route focus, native selection buttons, About arrows/Home/End/Tab, mobile-menu trap/Escape/focus restoration, project navigation, Resume actions/disclosures, visible focus indicators.
- Touch/coarse-pointer emulation: mobile menu, About category selection, Resume disclosures; no hover requirement. Fine-pointer selection tested independently.
- Initial and live reduced motion: all content shown immediately, transforms/filter/clipping/staggers/crossfades removed; turning preference off does not replay completed entrances. Focus immediately reveals delayed targets. Print exposes all eight responsibilities and all 35 skills.
- Contact mock-only browser flow: invalid fields/focus/live status, submitting state, retry/error with retained values, successful reset. No real email.
- Native PDF View URL and Download filename verified; automated download saving denied. PDF content unchanged.
- Contact tests: 10/10. SEO tests: 6/6. Project-detail tests: 3/3. Lint, production build, and `git diff --check` passed. Git reports existing LF/CRLF conversion warnings; no whitespace errors.

## Local evidence

Browser artifacts are temporary local evidence, not committed repository assets:

- Baseline: `%TEMP%/portfolio-home-AdEIZc`.
- Narrow/wide route matrices: `portfolio-home-WBMEy0`, `portfolio-home-Y3n6qR` (earlier wide screenshots also in `portfolio-home-o1V8ER`).
- Settled 48-case screenshots: `portfolio-home-3PeUFG`.
- Final interactions and entrance frames: `portfolio-home-tfltWh`.
- Final rapid-selection/navigation/resize/focus checks: `portfolio-home-lPt5nQ`.
- Optional-section fixture: `portfolio-home-YEVRoj`.
- Final cold-route metrics: `portfolio-home-FNmHqJ/metrics.json`.
- Final eight-case Home/Projects static comparison: `portfolio-home-Wx7liu/static.json`.

Remaining manual checks: physical touch devices, Safari/Firefox, assistive-technology reading/announcements, zoom and forced-colors. Automated checks used Chromium and emulated preferences/pointers/viewports; they do not replace those checks.
