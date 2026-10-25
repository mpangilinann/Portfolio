# Resume readability refinement

## Preserved working tree and scope

Continued the existing uncommitted Resume implementation on main. Inspected git
status, the full working diff and staged Projects/project-detail work before editing.
Baseline contact (10), SEO (6), project-detail (3), lint and production build passed.
All protected source-file hashes and staged Git object IDs remain unchanged. Only
Resume presentation and this document changed; no dependencies changed.

## Why the dossier was difficult to read

Reviewed full-page captures and computed styles at all eight requested widths.
The persistent 220-250px sidebar consumed reading space and competed with the body.
A second introduction repeated the identity/actions; section navigation added another
mobile block. Three long project summaries preceded Experience. Responsibilities
were uninterrupted, and most content used muted 13px text (11px metadata/technology
lines). Summary was only 14px on phones. Certifications used 13px text and tighter
rows. Skills were already plain wrapping text, rather than 35 actual bordered pills;
the problem was their small type and dense horizontal grouping.

Fresh baseline artifacts: C:/Users/user/AppData/Local/Temp/portfolio-home-lITRXt
The 390px desktop-mode capture measured 5,353px because its reserved scrollbar
reduces available content width. The prior mobile-emulation measurement and request
baseline is 5,254px; comparisons below explicitly use that mobile baseline.

## Final composition

1. Compact identity header: shared name/title/location/availability and PDF actions.
2. Professional Summary, bounded to 760px and directly readable.
3. Experience, one restrained surface with role/company/department and visible dates.
4. Open Education / Selected Project Experience columns, stacked education first
   below 900px. Existing graduation year and honors remain shared-data driven.
5. Five skill groups, development first.
6. Seven certification links as divided rows.
7. Small closing with View PDF and Contact Me only.

The 1,180px canvas has no sidebar, sticky content or section-navigation data.
Education uses a 340px supporting column on wide screens; project copy uses 776px.
There are no project images, nested project cards, ratings or proficiency claims.
The original three complete resumeDescription/resumeTechnologies fields remain
unchanged and linked to their existing project detail routes.

## Type, spacing and contrast

Summary: 17px / 1.7 (28.9px), primary ink. Experience summary: 16px / 1.7.
Responsibilities: 16px / 1.65 (26.4px). Project copy and certification links:
15px / 1.65. Technologies, dates and metadata: 14px / 1.7. Skill lists: 15px / 1.7.
Section headings: 30px desktop / 28px phone; entry headings: 20-24px. Secondary
copy mixes 78% primary ink into the page background, giving stronger contrast than
the previous muted token. Approved monochrome theme tokens and local Onest remain.
Desktop major gaps are 72px; phone gaps are 48px. No per-item animation or tiny text
is used to achieve the shorter mobile page. Decorative grain/spotlight were removed.

## Disclosures and content preservation

Experience shows the first four existing responsibilities (onboarding, troubleshooting,
workstation configuration and networking). A native button exposes aria-expanded and
aria-controls, shows all eight, and changes to Show fewer responsibilities. The
summary always remains visible. Exact shared wording and original list order remain.
State survives theme and responsive changes during the mounted page lifetime.
Expansion is immediate, without height animation, including reduced motion.

Skill presentation labels reference the existing shared lists rather than copying
35 strings: Front-End Development, Back-End Development, Tools and Platforms,
IT Support and Systems, Professional Skills. Wide screens use three columns, with
IT Support spanning two available columns to avoid an unnecessarily tall narrow list.
Tablets use two columns. Phones use one column, Front-End and Back-End always
visible, and three optional native disclosure buttons for the supporting groups.
Breakpoint changes expose desktop content without resetting mobile choices.

Certification titles, order and URLs are unchanged, including the AWS title. Each
entire valid anchor row has 20-22px vertical padding, 15px readable text, restrained
external icon, visible focus, descriptive new-tab name and noopener noreferrer.
No issuers, dates, verification claims or expiry information were invented.

## HTML printing

Resume-scoped print selectors hide navbar/footer/skip link, actions and toggles.
Black text, white background and underlined links replace screen surfaces. Education
and projects print in reading order as full-width sections; skills print in two
columns. All eight responsibilities and all 35 skills print even when every optional
screen group is closed. A layered override intentionally matches Tailwind's important
hidden rule; an initial browser check caught and corrected this interaction.
Break-inside: avoid protects experience/education/project entries, skill groups and
certification rows; headings avoid breaks immediately after them. Browser pagination
may still break an entry taller than a printable sheet. Disclosure state is unchanged
when returning to screen media. No PDF was generated by browser printing.

## PDF preservation

Path: /mikkopangilinan-resume.pdf
Original file: public/mikkopangilinan-resume.pdf
Size: 214,202 bytes
SHA-256: 0c23c58c14dee5eec71f86e01167d0fb97819eacf89d1657bf68028d7645bc76

The original and production build copy match this hash. Actual Vite development
and production-static responses return the same PDF bytes and application/pdf.
View opens a separate PDF target; native Download emits the expected URL/filename.
Download verification denies saving the file after observing the browser event.
There is no initial PDF request, inline embed, generated thumbnail or PDF dependency.
The HTML print stylesheet does not replace the downloadable PDF. A future replacement
requires separately reviewing/exporting the approved source document, then explicitly
replacing the file and checking links/hash; that work was not performed here.

## Height and performance

Production Chrome, DPR 1, 900px viewport height; mobile emulation below 768px.
Both themes have identical final heights. Default disclosures are closed.

| Width | Prior mobile/desktop measurement | Refined |
| --- | ---: | ---: |
| 320 | 5,852px | 5,791px |
| 390 | 5,254px | 5,014px |
| 768 | 3,959px | 4,302px |
| 900 | 3,702px | 3,895px |
| 1024 | 3,464px | 3,550px |
| 1200 | 3,358px | 3,204px |
| 1440 | 3,160px | 3,185px |
| 1920 | 3,160px | 3,185px |

390px is 240px (4.6%) shorter. Desktop 1440px is 25px (0.8%) taller; tablet heights
increase because readable text, open education/projects and two-column skills take
space. These tradeoffs are explicit; no claim of a universal height reduction.

| Cold direct Resume resource measurement | Before | Final |
| --- | ---: | ---: |
| JavaScript, six requested scripts | 391,137 B | 391,877 B |
| JavaScript gzip sum | 128,544 B | 128,860 B |
| CSS, two requested stylesheets | 53,056 B | 53,072 B |
| CSS gzip sum | 11,748 B | 11,645 B |
| Named Resume JS chunk | 8.04 kB | 8.78 kB |
| Named Resume CSS chunk | 8.47 kB | 8.49 kB |
| Initial measured layout shift | 0 | 0 |
| Initial PDF requests | 0 | 0 |

File sizes/gzip sums are local measurements, not field performance benchmarks.
JS adds 740 B for meaningful disclosure state and responsive skill presentation.
Shared global CSS remains 44.58 kB. No dependencies, new fonts or media assets.

## Verification

- All repository tests: contact 10, SEO 6, project-detail 3 pass; provider calls mocked.
- Lint, production build and git diff --check pass.
- Both themes at 320/390/768/900/1024/1200/1440/1920: no horizontal overflow,
  one h1, logical section order, exact shared experience/project/certification data,
  35 skill entries, expected visibility and no sticky Resume elements.
- Heights 700/768/900 tested at 390/768/1440: navbar clearance and no overflow.
- Native Enter/Space and touch responsibility expansion/collapse; skill disclosure;
  resize persistence; visible keyboard focus; initial/live reduced motion pass.
- Print emulation at 390/900 in both themes: all 8/35 visible, controls/chrome hidden,
  white/black output. Full print captures reviewed; no PDF generated.
- Direct load, refresh, metadata, PDF view, native download, Contact navigation,
  route focus, skip link and mobile menu active state/Escape/focus return pass.
- Browser checks report no console errors or warnings. No email submitted.
- Protected full-page captures: Home, About, Projects archive, AC-CORE detail,
  Contact and Not Found at 390/1440 in both themes. Twenty comparisons are exactly
  identical. Four Contact comparisons differ only within its existing 12x12px
  animate-pulse green status dot (124 pixels each); every pixel outside that
  unchanged animated element matches. No protected source hashes changed.
- Staged file/object IDs match the starting staged diff. Existing shared factual
  data, PDF, API, environment files, SEO and shared navigation sources are unchanged.

Temporary browser helpers and measurement JSON are outside the repository. They
exercise actual DOM visibility, keyboard/touch input and browser PDF events rather
than mirroring component implementation in unit tests.

## Files

Modified from the starting working tree: src/pages/Resume.jsx,
src/components/resume/ResumeActions.jsx, src/components/resume/ResumeExperience.jsx,
src/data/resume.js, src/styles/resume.css, RESUME_REDESIGN_NOTES.md.
Added: src/components/resume/ResumeSkills.jsx.
Deleted: obsolete src/components/resume/ResumeSidebar.jsx.
The existing Resume files remain uncommitted/untracked as they were at task start;
the index was not changed.

## Screenshots and manual review

Final screen captures (complete page plus corresponding resume-top files):

- C:/Users/user/AppData/Local/Temp/portfolio-home-Pil4Bb/resume-dark-390.png
- C:/Users/user/AppData/Local/Temp/portfolio-home-Pil4Bb/resume-light-390.png
- C:/Users/user/AppData/Local/Temp/portfolio-home-Pil4Bb/resume-dark-1440.png
- C:/Users/user/AppData/Local/Temp/portfolio-home-Pil4Bb/resume-light-1440.png

Final print captures:
C:/Users/user/AppData/Local/Temp/portfolio-home-lMCsrC/print-final-390.png
C:/Users/user/AppData/Local/Temp/portfolio-home-lMCsrC/print-final-900.png
Protected baseline: C:/Users/user/AppData/Local/Temp/portfolio-home-fCILWE
Protected final/comparison JSON: C:/Users/user/AppData/Local/Temp/portfolio-home-XZSJaO

Remaining manual checks: confirm AWS wording (shared title is AWS Certified Cloud
Practitioner (AWS Cloud Foundations), while the draft document says AWS Cloud
Foundations (AWS Academy)); physical-phone reading/touch comfort; NVDA/VoiceOver
announcements; Safari/Firefox; zoom/forced colors; actual print pagination/printer
settings; preferred PDF viewer/save location. External credential availability was
not contacted, and no future replacement PDF was created.

No other page interior or shared navbar was redesigned. No real email, commit,
push, merge or deployment occurred.

## Shared certificate additions - 2026-10-25

Added two title/link objects to src/data/certifications.js, grouped after the two
existing Simplilearn entries and before Coursera:

- Machine Learning for Beginners
  https://simpli-web.app.link/e/yQ8xBdqhv7b
- Introduction to the Basics of Azure Services
  https://simpli-web.app.link/e/QB2o2qYkv7b

The exact submitted titles and deep-link URLs are preserved. The existing UI has
no separate issuer field/rendering, so no issuer suffix or new metadata was added.
No dates, IDs, scores, expiry or descriptions were invented. The nine-entry order is:

1. AWS Certified Cloud Practitioner (AWS Cloud Foundations)
2. Responsive Web Design - freeCodeCamp
3. JavaScript Algorithms and Data Structures - freeCodeCamp
4. Back-End Development and APIs - freeCodeCamp
5. Introduction to Graphic Design: Basics of UI/UX - Simplilearn
6. Website UI/UX Designing using ChatGPT - Simplilearn
7. Machine Learning for Beginners
8. Introduction to the Basics of Azure Services
9. Work with Components in Figma - Coursera

All original seven parsed title/URL objects exactly match the starting data
and retain their relative order. Resume already consumes this shared source;
no Resume JSX or styles changed. No other route renders the certification list.
External new-tab names, noopener/noreferrer and native keyboard anchors are retained.

Browser verification in both themes at 320/390/768/1024/1440 confirms nine matching
entries, exact new titles/URLs, secure attributes, targets at least 44px high and no
overflow. The Azure title wraps at 320px. Native Tab reaches both new links, with
visible focus. External deep-link destinations were deliberately not substituted.
All 19 existing contact/SEO/project-detail tests, lint, build and diff checks pass;
no console warnings/errors or real email submission. Named Resume JS changes from
8.82 to 9.01 kB for the added strings; Resume CSS remains 8.48 kB. No dependencies.

Original public/mikkopangilinan-resume.pdf and normal build copy remain 214,202 bytes:
SHA-256 0c23c58c14dee5eec71f86e01167d0fb97819eacf89d1657bf68028d7645bc76.
No replacement, conversion, thumbnail or PDF generation was performed.

The companion About change restores a 200-230px mobile / 240px tablet / 300px desktop
full-color circular portrait with center/cover crop. Optimized asset and dimensions
remain; Home requests no portrait. See ABOUT_REDESIGN_NOTES.md for details.

Final certificate screenshots:
C:/Users/user/AppData/Local/Temp/portfolio-home-rXiNOi/certificates-{dark,light}-{390,1440}.png
Protected baseline: C:/Users/user/AppData/Local/Temp/portfolio-home-TXhAky

Only About introduction presentation and shared certification data change at runtime.
Project/internship content, Home, shared navbar, APIs, environment, SEO and deployment
sources remain unchanged. No commit, push, merge, deployment or real email.

Protected visual regression result: all 20 full-page comparisons match exactly
(Home, Projects, AC-CORE detail, Contact and Not Found; 390/1440; both themes).
The existing Contact pulse was paused in both captures for deterministic comparison.
Final captures: C:/Users/user/AppData/Local/Temp/portfolio-home-daYCJI.
Hash audit reports no modifications outside the five intended source/notes files.
