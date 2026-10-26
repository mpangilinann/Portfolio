# Home motion refinement

Built on the existing uncommitted shared motion work on `main`. That work is
preserved; no shared utility, other page, navbar, footer, dialog, factual data,
asset, dependency, Contact form or API was changed by this refinement.

## Choreography

The existing navbar stays immediately visible. Home uses the shared 70ms stagger,
460ms entrance, 400ms section, 200ms interaction and ease-out curve. The hero starts
availability at 0ms, masked name at 70ms, role at 140ms, description at 210ms,
location at 280ms, both actions at 350ms and Snapshot at 420ms. The final entrance
finishes at 880ms. Controls remain usable during entry.

The selectable name stays one accessible heading, with an 8px vertical movement
and shallow clip mask. Final mask bounds extend beyond the glyph box to preserve
descenders. No letters, words or sentences are split. Other text starts at 0.78
opacity, retaining the shared system's readable initial state.

Snapshot enters from the right at scale 0.99. Its existing frame-batched pointer
hook drives translation rather than text tilt: outer layer maximum 1.95px per
axis, inner additional 2.1px, returning over 400ms. There is no floating loop.
Fine-pointer capability and motion preference gate the hook; keyboard focus and
coarse/touch mode remove the transforms immediately.

## Scroll and interaction

- Home-only observer reveals run once, at 1% visibility with a 96px early margin.
  Re-entry does not replay; there are no new scroll listeners or per-frame React
  state updates. Existing section navigation and ambient pointer surface remain.
- About preview: gently masked heading, complementary body/link movement after
  70ms, with paragraph and link kept together.
- Selected work: heading first, complete cards at 70/140ms. Images use a shallow
  6% bottom mask and 1.03-to-1 scale over 600ms, starting after the actual image
  element decodes. No duplicate image/preload is created. Image opacity stays 1,
  frames retain their aspect ratio, and decode errors release the wait.
- Project hover/focus: 1.025 image scale, restrained inset surface response and
  2px diagonal arrows. The old pointer-driven image perspective and title movement
  are replaced with stable text and a simple image response. The surface response
  is instantaneous, avoiding a new shadow animation.
- Approach: whole items at 70/140/210ms; existing progress line retained. Static
  text has no new hover/click affordance.
- Technologies: four short waves (4/4/4/1), 70ms apart. Existing relationships,
  selection, Escape and touch behavior remain. Only icons lift/scale subtly on
  hover/focus; labels stay still.
- Closing message: shallow masked rise; supporting text at 70ms, actions at 140ms.
- Buttons: 0.98 press scale, 2px arrow feedback using existing interaction tokens.
  Hero availability pulses twice over 1.8s, then stops. Footer reveal is unchanged.

The optional progress bar was omitted: existing section navigation already shows
position, and another persistent indicator would add noise to the approved header.

## Accessibility and scope

Initial and live reduced motion show every Home reveal immediately with no mask,
translation, scale, delay, pointer depth or pulse. The existing preference hook is
reused; a per-visit latch prevents delayed animation resuming when the preference
is turned off again. Keyboard focus bypasses containing reveals immediately;
focused project cards also unmask their image. The image link's existing outline
is inset 4px so the card's existing overflow clipping cannot cut it off.

No animated wrapper hides or makes controls inert. DOM reading order, content,
headings, fonts, dimensions, spacing, surfaces and responsive breakpoints remain.
The existing project dialog and focus hook are untouched, including trapping,
Escape, isolation, scroll lock, opener restoration and its exit animation.

## Production measurements

Chrome direct Home load, cache disabled, 1440x900, DPR 1; sums of route resource
file bytes and individually gzipped file sizes, not field performance estimates:

| Resource | Before | After | Increase |
| --- | ---: | ---: | ---: |
| Cold Home JavaScript | 432,073 B | 433,487 B | 1,414 B (0.33%) |
| Gzipped JavaScript | 144,792 B | 145,404 B | 612 B |
| Home-loaded CSS | 47,211 B | 50,236 B | 3,025 B |
| Gzipped CSS | 10,122 B | 10,863 B | 741 B |

JavaScript requests stay at 11. The additional stylesheet is lazy-loaded with Home
and every rule is Home-scoped. Global CSS remains byte-identical at 47,211 B.
Initial image request counts are unchanged at every tested Home viewport.
No media, fonts or dependencies were added.

## Verification

- Final Home matrix: both themes at 320/390/768/1024/1440/1920px and 1440x600.
  All 14 cases retain baseline main text and exact page height. Measured layout
  shift is zero; no horizontal overflow, pending/faded content after scrolling,
  repeated reveals, or new console errors/warnings.
- Actual entrance frames, name text selection, bounded depth and neutral reset,
  keyboard/coarse depth disabling, native Tab focus, arrow and press feedback,
  limited pulse completion, Back to top and stable technology labels pass.
- Initial/live reduced motion, including preference on/off during entrance, pass.
- Native touch project dialog, technology selection and mobile menu pass. Keyboard
  dialog trapping, Escape, isolation, scroll lock and exact return focus pass after
  the existing exit animation completes.
- Returning from About/Projects/Resume/Contact, browser Back/Forward, direct load,
  reload at three scroll positions, fast jumps and slow scrolling pass.
- A delayed actual project image request confirms decode-gated reveal, reserved
  image frame and exactly one request; no separate preload or real email request.
- Other routes: all six details, About, Projects, Resume, Contact and invalid route
  retain baseline text and heights at 390/1440px in both themes. About, Resume,
  sampled detail and mobile Projects screenshots match pixel for pixel. Desktop
  Projects captures differ in existing once-reveal timing; Contact differs only
  in its existing status-dot pulse phase (sample: 124 pixels within a 12px square).
  Those sources/styles were untouched; no cross-page CSS was introduced.
- Contact tests 10/10, SEO tests 6/6, project-detail regression tests 3/3,
  ESLint, production build and git diff --check pass. Contact tests use mocks.

Artifacts (local temporary files):

- Before Home matrix: `C:/Users/user/AppData/Local/Temp/portfolio-home-tsGWme/`
- Before other routes/bundles: `C:/Users/user/AppData/Local/Temp/portfolio-home-mAxzAx/`
- Final Home matrix/screenshots: `C:/Users/user/AppData/Local/Temp/portfolio-home-7zg1qV/`
- Cross-route comparison: `C:/Users/user/AppData/Local/Temp/portfolio-home-29oZ0H/`
- Final feedback and bundle metrics: `C:/Users/user/AppData/Local/Temp/portfolio-home-BP8Qsd/`
- Final interaction/entrance frames: `C:/Users/user/AppData/Local/Temp/portfolio-home-zdILgT/`

The cross-route matrix preceded the final 70ms Snapshot timing and removal of the
new shadow transition; the final Home matrix and targeted interactions were rerun
on the completed build. Other page code remained unchanged throughout.

## Files in this refinement

Modified: `src/pages/Home.jsx`, `src/components/home/Approach.jsx`,
`DeveloperSnapshot.jsx`, `FeaturedProjectCard.jsx`, `TechnologyGrid.jsx`.

Added: `src/components/home/HomeReveal.jsx`, `src/styles/home-motion.css`,
this document. Deleted: none. Earlier uncommitted files are preserved.

Shared motion tokens/presets and existing reduced-motion, fine-pointer and pointer
surface hooks are reused without modification. HomeReveal keeps Home's extra mask
and decode timing local rather than changing the shared Reveal used elsewhere.

Remaining manual checks: perceived pacing on physical phones and low-power/high-Hz
displays; Safari/Firefox masking and native focus rendering; VoiceOver/NVDA reading
experience; forced-colors and zoom. Automated touch uses Chrome emulation.

No real email, commit, push, merge or deployment occurred.
