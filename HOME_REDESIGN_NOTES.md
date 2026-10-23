# Home polish: floating navigation and restrained interactions

## Scope and preserved content

The approved six-section order, copy, Onest Variable typography, monochrome palette
and layout are retained. No informational section was added. A browser snapshot
of each section's normalized text is compared with the starting working tree;
all six match exactly. Home data is also protected by a starting-file hash.
No non-Home interior, project fact, external URL, resume, API, SEO configuration,
image pipeline, theme hook or accessibility hook was rewritten.

The snapshot's actual focus line is “Accessible. Maintainable.” Its two existing
words receive emphasis. “Responsive” was not inserted into that line because the
request also explicitly requires preserving the exact current content. The
existing responsive wording elsewhere on Home is unchanged. There is no rotating
copy, autoplay or new professional claim.

## Navbar restoration

`git show HEAD:src/components/Navbar.jsx` recovered the actual original: a centered
floating capsule, comfortable top gap, rounded active links, blur and a separated
theme control. These visual principles are restored without restoring outdated
markup, duplicated controls, strong shadows, colored icons or inverted theme colors.

Before this refinement the header was a viewport-wide flat strip with a small
active dot. It is now a 760px maximum capsule, 16px below the desktop top, with
a logo-only Home link, five balanced links and the existing theme control. A soft
filled inner pill replaces the dot. Hover and keyboard focus use equivalent
neutral surfaces with visible outlines. The active link retains aria-current.
Below 1024px the existing mobile controls sit in a smaller floating capsule,
up to 520px wide, with 44px touch targets. Mobile height is 60px at phone widths.

Home's top surface is slightly translucent; past 24px of scroll it becomes more
opaque with a slightly stronger border/shadow, without moving or resizing. Other
routes use the more opaque surface immediately. The existing Motion mini API
animates color over 0.2 seconds; reduced motion uses zero duration. The original
shared scroll-threshold logic and theme persistence are retained.

Sidebar and useModalFocus implementations are unchanged. Initial focus, focus
containment, Escape, opener restoration, inert background, body/root scroll lock,
route closure and desktop resize cleanup remain intact. Fixed-header clearance
uses the existing 120px anchor/focus scroll margin and current page spacing.

## Ambient effects and pointer architecture

`usePointerSurface` shares one lightweight interaction model across hero, snapshot
and project features. It reads the current fine-pointer and live reduced-motion
preferences. Mouse coordinates are buffered, with one requestAnimationFrame
layout-read/CSS-variable write batch per surface per frame. Pointer movement does
not update React state. Cleanup cancels queued frames and removes the variables
on exit, cancellation, preference change or unmount.

The hero has a low-opacity grayscale radial light behind content. Snapshot uses
a smaller internal highlight. Static defaults remain subdued; coarse pointers
and reduced motion disable tracking. The texture is a tiny embedded SVG turbulence
filter, explicitly desaturated, with stitched edges and 1.8% opacity. It makes no
network request, has no animation and cannot intercept input. Grain is behind
content rather than composited over text. There are no large image textures,
colored glows or cursor trails.

Snapshot retains its solid surface. Rotation is bounded to about 0.6 degrees per
axis and the focus inset moves at most 2px. Existing focus words vary only between
82% and full emphasis while moving the pointer; their text is never replaced.
The resume link's keyboard focus gives the focus panel a quiet border and existing
word emphasis. Reduced/coarse rendering has no layer/depth transforms.

## Section navigator

The six links are Intro, About, Work, Approach, Tools and Contact. At rest only
small markers and the current label are visible; hovering or focusing the navigator
reveals all labels. Links have full 44px targets, a named navigation landmark and
aria-current="location". Section changes are never announced through a live region.

IntersectionObserver determines the section near the top reading position. An
80ms debounce avoids rapid updates at boundaries. Footer intersection handles
the final section at the bottom. A brief click-scroll guard keeps the clicked
destination stable while smooth scrolling; wheel/touch/scroll-key intent interrupts
that guard. Reduced motion jumps immediately. Normal section-link clicks focus
the destination without adding URL/history entries. Modified clicks retain the
real anchor href. No focus trap or scroll hijacking is introduced.

Visual testing sets the breakpoint at 1440px, rather than 1200px: the approved
wide content leaves too little room for accessible labels at 1200px. A small
1180px container limit from 1440–1559px reserves a clear gutter; the original
1240px maximum returns above that range. The navigator is completely hidden below
1440px, with observers disabled, and does not overlap content. This is the only
small layout accommodation; section order/content and normal breakpoints remain.

## Technology relationships

All thirteen existing names/icons remain visible, in the same grid. Each is now
a real toggle button because selection has a meaningful action. The focused data
module `technologyRelationships.js` keeps relationships out of JSX. JavaScript,
TypeScript, framework, styling, API and database links follow the requested model;
Figma relates to HTML/CSS. Git emphasizes itself with a workflow description,
rather than arbitrarily highlighting every technology.

Hover or keyboard focus strengthens the active item and brightens related items.
Unrelated labels use the existing AA-readable secondary color rather than becoming
transparent. Each button exposes pressed state and a relationship description to
assistive technology. No scrolling live region or extra visible caption is added.
Touch toggles a choice; tapping it again or outside clears it. Escape also clears.
Changes use 0.2-second surface/color transitions, with no layout animation or skill
meters. Reduced motion retains the relationships without travel.

## Project-image refinement

AC-CORE and Flashify remain the only Home projects. Images, dimensions, lazy
loading, text, routes and external destinations are retained. Fine-pointer hover
adds at most 1.025 scale, 0.45-degree directional depth and 1.5px movement. A very
light neutral image overlay, title movement and arrow respond together. Keyboard
focus gets the same scale/overlay/title/arrow treatment, with no tilt required.
Exit resets variables and focus departure resets feedback. All essential actions
remain visible. Coarse pointers and reduced motion disable scale/tilt movement.
The accessible project dialog is unchanged.

## Files and dependencies

Added: `src/hooks/useFinePointer.js`, `usePointerSurface.js`,
`src/data/technologyRelationships.js`, `src/components/home/SectionNavigator.jsx`.

Modified: Navbar; Home (decorative layer hook, section anchors and navigator);
DeveloperSnapshot (presentation only); TechnologyGrid; FeaturedProjectCard;
`src/styles/home.css`; these notes. No component or asset was deleted this turn.
Older dirty-tree changes remain intact.

No dependencies were added or removed. Existing Framer Motion, Lucide and React
Icons are reused. Onest and its OFL notice are unchanged. No GSAP, Lenis, React
Bits, shadcn, animation framework, texture download or font CDN was introduced.

## Performance

Baseline is the actual starting developer-first build, with tests/lint/build run
before editing. Chrome production checks use device scale 1 and 390 x 844 /
1440 x 1000 viewports. Heights include shared chrome. Cold JS sums actual initial
resource bodies; gzip is the sum of separately compressed bodies, not wire bytes.

| Measure | Before | Final |
| --- | ---: | ---: |
| Entry JS | 251.90kB / 81.64kB gzip | 251.91kB / 81.64kB gzip |
| Cold Home JS | 425,941 B / 142,910 B gzip | 429,099 B / 143,825 B gzip |
| Home route chunk | 10.80kB / 3.94kB gzip | 14.05kB / 4.88kB gzip |
| CSS | 47.05kB / 9.66kB gzip | 52.63kB / 10.81kB gzip |
| Document height, 390px | 3,664px | 3,664px |
| Document height, 1440px | 2,664px | 2,650px |
| Onest font | 1 request, 33,760 B | Unchanged |
| Project images | 2 responsive requests | Unchanged |
| Portrait requests on Home | 0 | 0 |
| Runtime dependencies | 9 | 9 |

The small payload increase funds the shared pointer helper, relationships and
section navigator. The gutter slightly reduces desktop image height; mobile
height is unchanged. CSS grain creates no extra image request. Initial measured
layout shift is zero across tested themes/widths.
Final resource checks confirm one Onest WOFF2, one theme logo and the same two
640px responsive project images at both review widths. Changing reduced motion
mid-jump stops movement immediately, and navbar dimensions remain unchanged on
scroll. Cold JS grows by 3,158 bytes raw / 915 bytes gzip; CSS grows by about
5.58kB raw / 1.15kB gzip for the new presentation and interaction states.

## Verification and manual review

Contact tests: 10/10. SEO tests: 6/6. ESLint, production build and diff check pass.
Layout coverage: 320, 390, 768, 900, 1024, 1200, 1440 and 1920px, both themes.
Checks include exact section copy, six sections, two projects, thirteen readable
technologies, capsule bounds/clearance, navigator visibility/gutter, no horizontal
overflow, no hero/portrait request and no initial layout shift.

Interactions cover ambient mouse tracking, snapshot/project depth and reset,
equivalent project keyboard feedback, technology mouse/focus/touch selection and
clearing, observer activation, stable section state, keyboard section jumps,
history preservation, initial/live reduced motion and coarse-pointer disabling.
Existing dialog/Back, mobile focus/keyboard/touch/resize, route focus and theme
persistence checks are retained. All existing routes load directly, including
project refreshes and Not Found, with metadata/JSON-LD compared to unchanged data.
Contact UI uses intercepted local mock responses only, never a real provider.

Manual checks remain: physical touch devices, screen-reader button descriptions
and section-link focus, Safari/Firefox, browser zoom, OS-level reduced motion,
contrast perception of atmospheric effects and slow image/font delivery. The
effects remain decorative and unnecessary for understanding or operation.

Home content is not rewritten. Non-Home interiors are not redesigned. Protected
files are compared with starting hashes. No real email, commit, push, merge or
deployment occurred.

Completed verification: all sixteen theme/width layouts pass, with unchanged
section text and zero initial layout shift. Interaction checks pass for pointer
tracking/reset, technology mouse/keyboard/touch behavior, stable section observer
activation, keyboard section jumps without history entries, reduced/coarse
fallbacks, both project dialogs and Back, mobile navigation and saved themes.
Every route's active pill and header clearance were checked in both themes.
The header changes from rgba(12,12,12,.76) to rgba(12,12,12,.96) on dark Home scroll.
All 25 protected-file hashes match. No browser console errors or warnings were
recorded. If reduced motion changes during a section jump, it finishes instantly.

Requested full-page captures (local temporary artifacts):

- [390px dark](C:/Users/user/AppData/Local/Temp/portfolio-home-q2JnqR/review-dark-390.png)
- [390px light](C:/Users/user/AppData/Local/Temp/portfolio-home-q2JnqR/review-light-390.png)
- [1024px dark](C:/Users/user/AppData/Local/Temp/portfolio-home-q2JnqR/review-dark-1024.png)
- [1440px dark](C:/Users/user/AppData/Local/Temp/portfolio-home-q2JnqR/review-dark-1440.png)
- [1440px light](C:/Users/user/AppData/Local/Temp/portfolio-home-q2JnqR/review-light-1440.png)

Navbar close-ups at 1440px:

- [Dark](C:/Users/user/AppData/Local/Temp/portfolio-home-q2JnqR/navbar-dark.png)
- [Light](C:/Users/user/AppData/Local/Temp/portfolio-home-q2JnqR/navbar-light.png)
