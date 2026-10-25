# About redesign

## Scope and hierarchy

About now uses the approved Home tokens and local Onest Variable font. Home,
Navbar, Sidebar, Footer, accessibility hooks, image assets, shared factual data,
other page interiors, SEO and contact infrastructure are unchanged. No dependencies
were added. Starting-file SHA-256 comparisons identify About.jsx as the only
modified pre-existing source file; all other implementation files are additions.

The former circular portrait, decorative grid, uppercase heading, badges and long
sequences of individual skill cards are replaced by:

1. An asymmetrical introduction with name, role, location, all three existing
   biography paragraphs, résumé PDF/contact actions and the color portrait.
2. A split education and development-direction section.
3. One focused IT Support internship panel with a short date rail.
4. A four-category skills directory, including professional qualities.
5. A compact résumé/contact closing.

Professional qualities remain inside the directory rather than being repeated in
another section. The internship remains IT support experience, separate from the
front-end development positioning. No dates, honors, metrics or credentials were
added to education. New direction/closing copy only connects supported facts;
the biography, experience summary and eight responsibilities retain their wording.

## Content and component architecture

- `profile.js`: name, role, all biography paragraphs, degree and institution.
- `contact.js`: location and existing PDF URL.
- `experience.js`: role, company, period, arrangement, summary and responsibilities.
- `skills.jsx`: existing About skill names, descriptions and icons.
- `skillLists.js`: complete Resume skill lists and approved professional qualities.
- `about.js`: presentation categories, a short direction statement and an adapter
  joining existing sources. JavaScript/ES6+, React/React.js, Angular/Angular 18 and
  VS Code/Visual Studio Code aliases resolve to one entry each. Resume labels are
  displayed while existing About descriptions/icons are retained.

The directory contains 38 distinct skills: Front-End 9, Back-End 5, Tools & Platforms
7 and Professional Skills 17. Professional Skills groups the nine distinct qualities
from About/Resume separately from eight IT support/system skills. TypeScript and
AWS are included from Resume. No invented descriptions or proficiency ratings are
added for entries without existing descriptions.

`AboutIntroduction` owns portrait presentation and `AboutSkillsDirectory` owns tab
interaction. About.jsx composes the page. Existing Home Reveal/ActionLink/SectionHeading
primitives are reused without editing their implementation. The existing shared
ExperienceEntry remains untouched for Resume; About presents the same experience
data with its own scoped markup.

## Portrait, surfaces and motion

The existing 300×300 optimized WebP is delivered through OptimizedImage with its
manifest srcset, responsive sizes, explicit width/height, eager loading and high
fetch priority. A reserved 4:5 frame crops the existing image without changing it.
The portrait is 280px wide on desktop, 240px at tablet widths and 180px on phones.
It retains the alternative text “Portrait of Mikko Pangilinan”. No filter, blend,
grayscale, added background or large shadow is applied. A small offset border
gives the frame depth. Home renders no portrait.

About's route-loaded CSS scopes every rule to About. It consumes existing
`--soft-*` tokens, with the same tiny embedded monochrome grain and a static
low-contrast radial light. No font, texture or other external request is added.

Existing Framer Motion Reveal uses a 10px entrance without hiding text behind an
opacity gate. The portrait reuses usePointerSurface with a maximum 0.4-degree tilt
per axis, fine mouse pointers only, RAF-batched CSS updates and no pointer-driven
React renders. Category content fades from 0.6 opacity with a 5px movement over
0.18 seconds. There is no autoplay, continuous animation or paragraph animation.
Initial and live reduced motion reset pointer transforms, remove movement and
make category transitions immediate. Touch/coarse pointers have no depth effect.

## Accessibility and responsive behavior

There is one h1, ordered section headings, biography before portrait in DOM order,
decorative icons hidden from assistive technology, and named links. Tabs expose a
labelled tablist, responsive vertical/horizontal orientation, selected state,
roving tabindex and associated tabpanels. Both arrow axes wrap, Home/End select
first/last, and Tab reaches the active focusable panel. Inactive panels are hidden.
Focus outlines use the shared ink token. Controls have at least 44px targets.
Muted text against the relevant neutral section surfaces measures at least
5.30:1 in light theme and 7.43:1 in dark theme.

Desktop uses a left category list and two-column directory. Its 520px panel minimum
reduces unnecessary movement between ordinary categories; longer content can grow
without clipping. Mobile wraps controls and uses natural panel height rather than
reserving a large empty area. Skills become one column below 360px. Introduction,
education, experience and closing stack at their respective breakpoints. Text
and actions wrap without horizontal scrolling. The desktop introduction ends
around 667px from the viewport top at 1440px width.

The existing floating navbar, theme control, active state, menu focus management,
route focus, skip link and scroll clearance are retained.

## Measurements

Production build, cache disabled, local Chromium, DPR 1. Heights include shared
header/main/footer, default Front-End selection; both themes give the same heights.
The pre-redesign measurements were captured before the interrupted edit and retained
in the temporary browser artifacts. Cold-route JS includes all scripts requested
by a direct About load, avoiding misleading comparisons between reshuffled chunks.

| Measurement | Before | After |
| --- | ---: | ---: |
| Cold About JavaScript, raw | 430,686 B | 432,744 B |
| Cold About JavaScript, gzip | 143,893 B | 145,701 B |
| Named About chunk, raw | 26.24 kB | 26.23 kB |
| CSS requested on About, raw | 52,626 B | 56,220 B |
| CSS requested on About, gzip | about 10.81 kB | 12,409 B |
| Optimized portrait | 11,852 B | 11,852 B |
| Page height, 390px | 5,865px | 3,639px |
| Page height, 1440px | 3,157px | 2,576px |

Cold JS increases by 2,058 B (0.48%); CSS by 3,594 B. The shared CSS is now
49.00 kB, with a 7.22 kB About-only stylesheet loaded on the route. Tailwind drops
utilities no longer referenced by About; global source CSS is unchanged. Vite
also reshuffles shared primitives/data between chunks. No runtime dependency was
added. The portrait request and font are unchanged. Measured initial layout shift
is 0. Mobile page height falls 38%; desktop falls 18%, despite including the full
approved internship responsibilities and additional Resume skills.

## Verification and artifacts

- Contact tests: 10 passing. SEO/image/deep-link tests: 6 passing.
- ESLint, production build and git diff --check pass.
- Chromium checks cover both themes at 320, 390, 768, 900, 1024, 1200, 1440 and
  1920px, including every category at every width: no horizontal overflow.
- All 38 skills are reachable and distinct; every Resume skill/quality is included.
  Biography, company, period, arrangement, summary and all responsibilities match
  the shared sources.
- Mouse, native keyboard arrows/Home/End/Tab, visible panel focus, touch categories,
  initial/live reduced motion and fine-pointer depth are checked.
- Portrait loads from the optimized URL with reserved dimensions. Canvas inspection
  detects 36,343 colored pixels; all image ancestors have filter:none and normal
  blend mode in both themes. Initial layout shift is 0.
- About active state, opaque navbar surface, scroll state, theme switching, mobile
  menu/Escape/focus restoration, route focus, skip link, direct loading/refresh,
  PDF/resume/contact targets and Home's absence of a portrait are checked.
- All 11 indexable routes load with one h1 and matching metadata. Browser console
  verification records no new errors or warnings.

Final full-page screenshots:

- `C:/Users/user/AppData/Local/Temp/portfolio-home-1S06Zg/about-dark-390.png`
- `C:/Users/user/AppData/Local/Temp/portfolio-home-1S06Zg/about-light-390.png`
- `C:/Users/user/AppData/Local/Temp/portfolio-home-1S06Zg/about-dark-1440.png`
- `C:/Users/user/AppData/Local/Temp/portfolio-home-1S06Zg/about-light-1440.png`

Remaining manual review: visual preference at normal browser zoom; reading comfort
on a physical phone; VoiceOver/NVDA tab announcements; Firefox/Safari rendering;
and opening the résumé PDF in the preferred viewer. Automated touch emulation is
not a physical-device check. No real contact email was sent.

Only About.jsx is modified; AboutIntroduction.jsx, AboutSkillsDirectory.jsx,
about.js, about.css and this document are added. No files are deleted. Home and
other page interiors were not redesigned. No commit, push, merge or deployment
was performed.

## Circular portrait restoration - 2026-10-25

This focused update preserves the redesigned About content, section order, tabs,
monochrome surfaces and navigation. AboutIntroduction now uses a square portrait
frame with border-radius: 50%, object-fit: cover and object-position: center (50% 50%).
The source is already square; this centers the face naturally without an extra crop
shift. A thin neutral border and very soft 0 8px 24px shadow replace the rectangular
offset frame. No extra ring or animation dependency was introduced. Pointer tilt
and its wrapper/hook were removed so mouse/touch cannot rotate or distort the circle.
The existing section Reveal remains and honors initial/live reduced motion.

Rendered sizes, verified in both themes:

| Viewport | Circle |
| --- | --- |
| 320px | 200 x 200px |
| 390px | 230 x 230px |
| 768px | 240 x 240px |
| 1024px and 1440px | 300 x 300px |

Mobile uses clamp(200px,60vw,230px), centered in its existing position after the
introductory copy. Tablet retains a 240px supporting column; desktop uses 300px.
No education, experience, skills, professional qualities or closing copy changed.
The same full-color /images/profile-pic-300.webp (11,852 bytes), responsive-image
component, explicit 300 x 300 source dimensions, eager priority and accurate alt
text remain. CSS reserves a 1:1 aspect ratio. No filters or grayscale are applied.
Home still requests no portrait. Image files and manifest remain unchanged.

Verification: all 19 contact/SEO/project-detail tests, lint, build and diff checks
pass. Browser checks at 320/390/768/1024/1440 in both themes confirm equal dimensions,
50% radius, cover/center, full-color unfiltered asset, no overflow and measured CLS 0.
Mouse/touch preserve a stable crop; initial/live reduced motion removes Reveal
movement. Certificate keyboard checks and shared navigation remain functional.
Protected-page screenshot comparisons are documented with the current Resume notes.
Actual screen-reader announcements and Safari/Firefox/physical-device rendering
remain manual checks.

Build impact: About CSS 7.22 -> 6.89 kB; named About JS 26.27 -> 26.19 kB. Vite also
redistributes the existing pointer helper between shared/Home chunks; Home source
and behavior are untouched. No added media, font or dependency requests. Asset
sizes are local build measurements, not field performance benchmarks.

Screenshots and measurements:
C:/Users/user/AppData/Local/Temp/portfolio-home-rXiNOi/about-{dark,light}-{390,1440}.png
C:/Users/user/AppData/Local/Temp/portfolio-home-rXiNOi/portrait-{dark,light}-{390,1440}.png
C:/Users/user/AppData/Local/Temp/portfolio-home-rXiNOi/measurements.json

The companion certificate update adds two Simplilearn completions to the shared
source (nine total). No PDF modification, email, commit, push, merge or deployment.

Protected visual regression result: all 20 full-page comparisons match exactly
(Home, Projects, AC-CORE detail, Contact and Not Found; 390/1440; both themes).
Contact's existing pulse animation was paused in both captures for deterministic
comparison. Final captures: C:/Users/user/AppData/Local/Temp/portfolio-home-daYCJI.
Hash audit reports zero changes outside the five intended files. Resume JSX/CSS
and every protected source/image/PDF remain unchanged.
