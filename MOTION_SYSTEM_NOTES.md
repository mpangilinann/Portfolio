# Portfolio motion system

## Scope and baseline

Started on clean `main` and inspected the existing motion, Contact entrance,
reduced-motion subscription, route focus, modal focus trap, pointer hooks and shared
navigation. The existing dependency is Framer Motion; no dependency changed.
Contact's reference sequence is 600ms, with a 200ms form delay and 300ms information
column delay, using the library's default easing. Contact.jsx is byte-identical to
the starting file, including its validation, announcements, values and submission
states. Its existing entrance and hover/tap behavior are retained.

The current Resume canvas is preserved. The request's reference to a dossier does
not restore its removed sidebar. No content, facts, fonts, colors, spacing, image
delivery sizes, page order, navigation design or existing page backgrounds changed.

Baseline screenshots, heights, main-content text and initial resource URLs:
`C:/Users/user/AppData/Local/Temp/portfolio-home-8CmC8u/baseline.json`
Baseline bundle bytes/gzip:
`C:/Users/user/AppData/Local/Temp/portfolio-home-8CmC8u/bundles.json`

## Shared system

- `utils/motion.js`: 200ms interaction, 460ms entrance, 400ms section and 70ms
  stagger tokens; easing `[0.22, 1, 0.36, 1]`; named rise, left/right, portrait,
  image, document, snapshot and opacity-only presets.
- `components/motion/Reveal.jsx`: semantic Motion elements replace existing tags
  without inserting layout wrappers. The old Primitives export delegates here.
  Viewport reveals use Motion's observer feature, once, at 8% visibility with a
  64px early-entry margin. There are no application scroll listeners or per-frame
  React updates. Observers are cleaned up by the existing library on unmount.
- Initial content opacity is 0.78, rather than completely hidden. Maximum travel
  is 12px, portrait scale 0.96, image scale 0.985 and snapshot scale 0.99.
  Stagger delay is capped at 280ms; the full Home introduction finishes in 740ms.
  Reading and keyboard access do not wait for that sequence.
- Focus immediately removes opacity/transform effects on all containing reveals.
  A live reduced-motion change also marks already mounted content as instantly
  shown for the rest of that visit, so turning the preference back off cannot
  resume a delayed fade. Initial reduced motion has no delay or movement.
- Keyboard focus also bypasses the existing modal/menu and Contact-form entrance
  layers. Their pointer-opened/default timing and all functionality stay intact;
  a focused control cannot remain behind an opacity or transform delay.
- `styles/motion.css`: shared 200ms microinteraction tokens; 2px arrow feedback;
  focus/reduced-motion safeguards for changing previews and skill panels; print
  output always shows revealed content. No clipping masks or progress bar were
  needed, and no scrolling library or global smooth-scroll behavior was added.

## Page behavior

### Home

Availability precedes name/role, supporting copy/location, actions and the snapshot.
Text enters from the left; the snapshot enters from the right with a 0.99 scale.
Existing major-section Reveal calls now use the shared once-only behavior. The
approved pointer surfaces, image hover, project dialogs and card interactions are
preserved instead of adding another competing lift/tilt effect.

### About

The introduction uses coordinated text groups and a separate soft portrait scale
reveal. The portrait stays circular and full color. Education/direction reveal as
a group. The internship entry uses a document preset; responsibilities use three
quick timing groups (3/3/2), rather than eight successive slow delays.

Skill panels now crossfade in the same relative container. The incoming panel
supplies its normal layout immediately, while the outgoing panel is absolute during
its fade, avoiding an intermediate empty/collapsed panel. Existing desktop minimum
height is unchanged. Mobile still follows the selected category's natural content
height; no oversized spacer or animated height was added. Inactive panels become
hidden after the fade and are aria-hidden/inert immediately. Tab IDs, controls,
arrow-key behavior and reading order remain intact. Professional skills use a short
paired stagger when first shown; technical skills are not animated individually.

### Projects

The compact introduction fades, index rows progress in a capped 70ms sequence, and
mobile/tablet cards reveal as complete cards. Existing selection state persists
through layout changes. The stage keeps the current preview visible until the
incoming image element finishes decoding; image and information then crossfade
together over 200ms with a 0.995-to-1 scale. There is no separate preload image or
second request. A latest-selection ref prevents stale image completion from
changing the chosen project. Pending/outgoing previews are inert and excluded from
the accessibility tree; the region exposes aria-busy while an image is pending.
Native image errors finish the busy state rather than leaving an endless wait.

The 104px sticky offset, 600px stage reservation, short-height fallback, direct
links, catalog order and mobile cards remain unchanged. No archive dialogs added.

### All six Project Detail pages

One shared sequence: label/title, summary, metadata/actions, primary image, then
overview/technology groups. Image reveal uses a small scale, with its reserved
frame and original optimized asset behavior intact. Features and populated optional
sections retain their existing grouped Reveal calls; previous/all/next navigation
now reveals together with directional arrow feedback. No reading-progress indicator
was added because these compact pages do not need another persistent control.

### Resume

Identity and PDF actions coordinate at entry. Experience uses a document preset;
education, skills and certification sections reveal once. Each selected project
animates as a whole entry. Credential rows use three short timing groups, retaining
their existing focus/hover treatment. View/Download arrows gain small feedback.
All factual data, disclosures, projects, nine certifications, links and PDF behavior
remain unchanged. Print still exposes all eight responsibilities and 35 skills.

### Shared elements and invalid routes

Navbar, mobile menu, route focus, skip link and modal accessibility hooks are
unchanged. Footer text and Back to top reveal together while the black footer
background remains opaque. It uses the lighter existing Motion mini API plus an
observer, so the full page-motion runtime is not forced into a Not Found load.
Not Found content remains immediately available; its footer uses the same reveal.

## Before/after measurements

Production build, local Chrome, DPR 1, cache disabled, dark theme, 1440x900 direct
loads. JS/CSS measurements sum cold route resource file sizes, not just named page
chunks. Gzip values are individual file gzip sums, not field performance metrics.

| Route | JS before / after | Gzip before / after |
| --- | ---: | ---: |
| Home | 429,423 / 432,073 B | 143,640 / 144,792 B |
| About | 431,798 / 435,608 B | 145,130 / 146,848 B |
| Projects | 391,254 / 394,087 B | 128,883 / 130,205 B |
| AC-CORE detail | 389,188 / 391,094 B | 127,826 / 128,573 B |
| Resume | 392,431 / 394,277 B | 129,045 / 129,799 B |
| Contact | 389,406 / 391,003 B | 127,738 / 128,352 B |
| Not Found | 267,199 / 268,780 B | 87,358 / 87,964 B |

Global CSS: 44,952 -> 47,211 B; gzip 9,690 -> 10,122 B. Route CSS files are unchanged.
Cold JS grows by 1.6-3.8 kB per route (less than 1% raw). Three routes request one
additional small, reusable Reveal chunk. No additional page chunks are eagerly
loaded, no new font/media/dependency is added, and initial image requests do not
increase. The delayed-image test confirms one request for the incoming image.

| Page | 390px height before = after | 1440px height before = after |
| --- | ---: | ---: |
| Home | 3,664px | 2,650px |
| About | 3,644px | 2,576px |
| Projects | 3,690px | 1,562px |
| Resume | 5,081px | 3,216px |
| Contact | 1,722px | 1,127px |

All six detail-route heights and invalid-route heights also match their baselines.
Measured initial layout shift is zero across the 120-case responsive matrix.

## Verification and artifacts

- Contact tests: 10 passing, using provider mocks.
- SEO tests: 6 passing; project-detail regression tests: 3 passing.
- ESLint, production build and git diff --check pass.
- 120 normal-motion cases: all 12 routes, both themes, 320/390/768/1024/1440 widths.
  Scrolled through every page and returned upward; tested fast jumps as well.
  Active content remains visible, with no pending reveals after scrolling, no
  horizontal overflow, no increased initial image requests and no console warnings
  or errors. Available 390/1440 baseline content and heights match exactly.
- Recorded actual entrance frames show a small initial transform/fade reaching the
  final state. Enter, Space, rapid selection and an intercepted/delayed image request
  verify preview readiness and selection. 700px/900px desktop heights verify the
  short-screen/sticky boundary. Touch checks cover menu and Resume disclosures.
- About tab crossfades retain a single active semantic panel; hidden/inert state,
  Home/End/arrow keyboard behavior and live reduced-motion transitions pass.
- Initial and live reduced motion, including turning the preference back off during
  entry, pass. Focus into a pending reveal finishes all containing layers instantly.
  Revealed entries do not replay on scroll re-entry. Print shows all 8/35 entries.
- Direct load, refresh, Back/Forward, route focus, skip link, menu focus trap,
  Escape, scroll locking and exact opener restoration pass. These hooks are unchanged.
- Contact browser fetches were replaced with local mock promises: invalid focus,
  live status, sending, retry/error and success/cleared values pass. No real email.
- PDF View opens its existing URL; native Download emits the expected filename.
  The download was denied after observing the event, avoiding another saved copy.
  No initial PDF fetch or inline embed. Original and build copy match SHA-256:
  `0c23c58c14dee5eec71f86e01167d0fb97819eacf89d1657bf68028d7645bc76`.

Full matrix/screenshots:
`C:/Users/user/AppData/Local/Temp/portfolio-home-0g3MOX/`
Each main page has `motion-{page}-{dark,light}-{390,1440}.png`; Home uses `home`,
and AC-CORE uses `projects-ac-core`. `matrix.json` contains all responsive results.
Final interaction/entrance frames:
`C:/Users/user/AppData/Local/Temp/portfolio-home-qJZJjG/entrance-frames.json`
Final cold resource comparison:
`C:/Users/user/AppData/Local/Temp/portfolio-home-uLt2AL/metrics.json`

Final keyboard-only modal/menu/form visibility and focus restoration checks:
`C:/Users/user/AppData/Local/Temp/portfolio-home-pgOlXl/`

The normal-motion matrix preceded the final reduced-motion latch refinement,
keyboard-only focus guards and equivalent token substitutions. Targeted interaction
tests were rerun on the final production build, including the live-preference edge
case and About panel controls. No normal-state layout or timing values changed in
those refinements.

## Files

Added: this document, components/motion/Reveal.jsx, utils/motion.js and
styles/motion.css.

Modified: index.css; components/home/Primitives.jsx; components/Footer.jsx;
components/about/AboutIntroduction.jsx and AboutSkillsDirectory.jsx;
components/projects/ProjectArchive.jsx, ProjectArchiveEntry.jsx, ProjectIndex.jsx
and ProjectNavigation.jsx; components/resume/ResumeActions.jsx; pages/Home.jsx,
About.jsx, Projects.jsx, ProjectDetail.jsx and Resume.jsx. No files deleted.

Contact, navbar/menu, accessibility hooks, catalog/factual data, API/environment,
fonts, original assets, dependency files and PDF match the starting file hashes.

Remaining manual checks: perceived pacing on physical phones and low-power/high-Hz
displays; Safari/Firefox observer and native-animation rendering; VoiceOver/NVDA
announcements during crossfades; forced-colors and browser zoom. Optional project
content still uses the existing data-driven branches; future populated content
should receive a visual review. No actual email delivery or PDF replacement tested.

No commit, push, merge or deployment occurred.
