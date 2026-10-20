# Portfolio refactoring

## Baseline

The working tree was clean on `main`. Lint reported 10 errors and zero warnings:
JSX identifiers not recognized by the existing unused-variable rule, an unused
catch argument, and two duplicate style properties. The build passed with two
duplicate `backgroundColor` warnings.

| Asset | Baseline | After | Baseline gzip | After gzip |
| --- | ---: | ---: | ---: | ---: |
| JavaScript | 456.25 kB | 439.70 kB | 147.33 kB | 141.36 kB |
| CSS | 36.94 kB | 37.18 kB | 6.73 kB | 6.73 kB |
| HTML | 0.60 kB | 0.96 kB | 0.38 kB | 0.55 kB |

Imported logos remain 316.56 kB and 448.30 kB. The unreferenced public copies
were byte-identical. The empty `src/App.css` and unreferenced `public/vite.svg`
were also removed. No PDF, profile image, favicon, active logo, or project image
was modified. No image optimization was performed.

Confirmed defects included two nonexistent homepage PDF links, a relative résumé
PDF link, `target="blank"`, nested anchor/button controls, a mismatched contact
email destination, relative profile/project image paths, an incomplete `inset-`
class, and missing fallback routing. Project lists, skills, and navigation were
independently maintained across views.

## Architecture

- `src/data/projects.js` supplies all projects, featured projects on Home, and
  résumé summaries. Optional presentation fields retain existing differences in
  descriptions and technology labels. `type: null` means no type was documented.
- `src/data/skills.jsx` holds About descriptions/icons, résumé skills, and marquee
  labels. `src/data/certifications.js` holds certificate titles and URLs.
- `src/data/navigation.js` supplies desktop/mobile menus; `socialLinks.js` holds
  social profiles; `contact.js` supplies email, phone, location, résumé path, and
  the unchanged Formspree endpoint. Education stays in Resume because it occurs
  only once.
- Focused components are `FeaturedProjectCard`, `ProjectDialog`, `SkillDetailCard`,
  `ThemeIcon`, and `PageMetadata`. The metadata component preserves existing
  titles/descriptions while removing React Helmet's legacy lifecycle dependency.
- Motion is imported as `Motion` to match the existing ESLint uppercase-variable
  convention. ESLint rules were not changed.

To add a project, add its image to `public` and one object to `projects.js` with a
unique ID and slug, title, role, descriptions, absolute image path, technologies,
features, and GitHub/live URLs. Set `featured: true` to include it on Home.
Optional `featuredDescription` and `featuredTechnologies` override the defaults.
Add `resumeDescription` and `resumeTechnologies` when a résumé summary is wanted.
No case-study routes were introduced.

## Theme

`index.html` sets `data-theme` before React loads, choosing a saved
`localStorage.theme` value or `prefers-color-scheme`. `src/hooks/useTheme.js`
saves explicit choices, follows system changes without a saved choice, and
synchronizes other tabs. Storage failures do not prevent switching.
Existing color variables remain in `src/index.css`; Tailwind's `dark:` variant
now follows the same attribute. Desktop/mobile share the toggle icon.

## Verification

- `npm.cmd run lint`: exit 0, zero errors and warnings. `npm.cmd` is used because
  this machine's PowerShell execution policy blocks the `npm.ps1` wrapper.
- `npm.cmd run build`: exit 0, no build warnings.
- Headless Chrome against local Vite: direct loads of `/`, `/about`, `/projects`,
  `/resume`, `/contact`, and a nonexistent route passed. Each had the expected
  heading/title, loaded images, and no nested anchor/button elements.
- System light/dark preference, theme switching and saved preference after
  navigation/reload passed. Both homepage PDF links, the résumé-page PDF link,
  the PDF response signature, and matching contact email text/destination passed.
- Featured-project navigation, project modal opening/closing, Escape dismissal,
  and mobile navigation passed. Browser console had no errors or warnings.
- `git diff --check` passed. `vercel.json` adds the SPA fallback; deployment
  behavior has not been tested because no deployment was performed.
- No Formspree submissions were sent during testing.

## Deferred work and manual review

Internship/résumé content updates, project case studies, a full accessibility
pass (including dialog focus management), Formspree replacement, full SEO work,
and image optimization remain deferred. Dependency removal reported 18 audit
findings (2 low, 3 moderate, 13 high); package/security upgrades need separate
review. No automatic audit fixes were applied.

Before committing, inspect both themes, desktop/mobile navbar/sidebar, homepage
spacing and animations, project cards/modal scrolling, and résumé/contact layout.
The existing text and page-specific project wording were retained.

No branch, commit, push, merge, deployment, or Git history change was made.
