# React + Vite

## Portfolio SEO and performance

See [SEO_PERFORMANCE.md](./SEO_PERFORMANCE.md) for canonical metadata, structured
data, generated sitemap/robots files, responsive images, route splitting, before
and after measurements, and SPA crawler limitations. `npm.cmd run build`
regenerates SEO files; `npm.cmd run test:seo` verifies the shared configuration.

## Portfolio contact API

The Contact form posts to a Vercel Function at `/api/contact`, which sends a
single notification through Resend. See [CONTACT_SETUP.md](./CONTACT_SETUP.md)
for server-only environment variables, manual Vercel/Resend setup, test-sender
limitations, local development, and safe mocked checks. No credentials belong
in client-side code. Run `npm.cmd run test:contact` without sending email.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
