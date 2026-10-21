# Accessibility and interaction review

## Baseline

The working tree was clean on `main` at `3155555` before editing. Existing lint
and production build both passed without errors or warnings.

Source inspection and Chrome's accessibility tree confirmed:

- One main landmark already existed on each route, but there was no skip link,
  stable main focus target, or focus destination after client-side navigation.
- About had a heading before its primary heading. About skill sections and
  Projects cards used inconsistent heading levels; Home's technology heading
  and the dialog's subsections also needed corrected levels.
- Navigation lacked current-page semantics and a useful logo-link name.
- The off-screen mobile sidebar remained focusable and exposed. Its trigger
  lacked `aria-controls` and a state-specific label. Escape, initial focus,
  trapping, restoration, background isolation, and scroll locking were absent.
- Project cards used divs with manual button keyboard behavior. Hover treatments
  were not consistently exposed during keyboard focus.
- The project dialog already had a role, title reference, Escape handler, and
  named close button, but lacked initial focus, trapping, exact trigger
  restoration, background isolation, and scroll locking.
- Contact labels and IDs already matched. Autocomplete, associated inline
  validation errors, live status, and consistent focus indicators were absent.
- Images had generic alternatives and decorative icons were not consistently
  hidden. No shared reduced-motion strategy existed; route scrolling was always
  smooth. Small dialog labels at 50% opacity were too faint in the light theme.

## Implementation

The skip link targets the single named `main` region. It is visible on keyboard
focus. On pathname changes, ScrollToTop focuses main after the new metadata and
heading render, unless a modal is open. Ordinary state changes do not move focus.

`useModalFocus` isolates portaled overlays using native `inert`, locks scrolling,
sets initial focus, handles Tab/Shift+Tab and Escape, and restores the trigger.
Project dialogs keep this behavior through their exit animation. Mobile menu
closure on a new route defers to route focus; resizing to desktop also closes it.
The closed sidebar is inert and hidden from the accessibility tree.

Cards use labelled native buttons stretched across semantic articles. Featured
cards open the existing dialog on Home so its exact trigger remains available
for focus restoration. All existing routes remain available. Keyboard focus
shows the existing overlay/image treatment plus a theme-aware outline.

Contact now posts to the same-origin API documented in CONTACT_SETUP.md.
Shared client/server validation informs inline errors and ARIA associations.
A polite status region outside the busy submit button announces sending, success, and
failure. Failed requests preserve text; successful requests retain the existing
reset behavior. Timers and requests are cleaned up on unmount.

Framer Motion's existing MotionConfig handles reduced transform motion.
`useReducedMotion` observes live media-query changes for the continuous marquee,
scroll indicator, and dialog. Reduced motion stops CSS drift, wraps a unique
readable technology list, removes motion utilities, and avoids smooth route
scrolling. About's CSS entrance content remains visible when animations stop.
Default motion is preserved. Dialog label opacity increases from 50% to 60%
without changing the monochrome palette. Icon controls have 44px minimum targets.

No dependencies were added. Only the two requested professional wording changes
were applied to shared content and the résumé draft. Project data, profile copy,
certifications, contact data, dependency manifests, assets, and the PDF are unchanged.

## Verification

Production Chrome checks covered desktop (1440 × 1000) and mobile (390 × 844),
light and dark themes:

- All six routes: Home, About, Projects, Resume, Contact, and Not Found.
- Keyboard skip navigation, current-page links, theme toggle, route focus,
  Not Found's return link, social-link focus/names, and résumé destinations.
- All nine project triggers using Enter and Space: initial close-button focus,
  forward/reverse Tab wrapping, Escape, exact focus restoration, inert background,
  scroll locking, backdrop closure, and clicks inside the dialog.
- Mobile menu: opening, initial focus, forward/reverse containment, Escape,
  close button, backdrop, selected link, and desktop resize.
- Form: required/email validation, first invalid-field focus, error association,
  sending/disabled/live states, simulated network failure, service field errors,
  success/reset, and retention after failure. No real email was sent.
- Reduced motion: static backgrounds, all thirteen technologies readable,
  visible About content, reduced dialog/menu motion, instant route scrolling,
  and live preference changes without reloading or resetting the page.
- Focus outlines on navigation, cards, dialog controls, form fields, and social
  links; screenshots reviewed against the existing design.
- Targeted dialog-label contrast: 5.74:1 in the light theme and 6.93:1 in the
  dark theme after the small opacity adjustment.
- Focused automated accessibility-tree checks: named controls, one main/primary
  heading per route, heading levels, resolved ARIA references, modal background
  exclusion, labels, and absence of nested interactive controls.

`npm.cmd run lint`, `npm.cmd run build`, and `git diff --check` pass. Browser
console checks reported no errors or warnings. No audit package was installed.

## Manual review still needed

This is a focused review, not a complete WCAG conformance audit. Actual speech
output with NVDA/VoiceOver, Safari/iOS touch and scroll behavior, high zoom,
forced-colors mode, and a comprehensive contrast review need human verification.
Real email delivery and external-site availability were not tested. The PDF
was neither changed nor audited for document accessibility.
