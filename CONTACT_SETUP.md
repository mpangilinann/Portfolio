# Contact API setup

## Architecture

The existing Contact page sends JSON to same-origin `POST /api/contact`.
`api/contact.js` is a Vercel Node.js Function. It validates every request and
calls Resend's official HTTP API using native `fetch`; no SDK is required.
`src/lib/contactValidation.js` contains the shared, secret-free field rules.
`server/contactEmail.js` creates a table-based, neutral notification email with
inline styles, escaped user content, preserved line breaks, and a plain-text
equivalent. Submission times use the server's UTC clock.

Only the recipient in server configuration is used. Visitor input cannot set
`to`, `from`, or other delivery headers. The validated visitor address becomes
`reply_to`, so Reply in the recipient's inbox targets the visitor. There is no
subject/category field in the existing form, so none was introduced.

The function returns `{ success, message, errors? }`. Validation errors use a
field-name object. Provider failures and configuration errors remain generic;
contact contents and provider responses are not logged. Success requires both
a successful provider response and a nonempty provider message ID. This confirms
provider acceptance, not inbox delivery. Requests time out after 10 seconds;
the client waits up to 15 seconds and never retries automatically. An ambiguous
timeout may occur after provider acceptance; a manual retry could send twice.

The form uses a synchronous ref to prevent concurrent submissions, retains
trimmed text after failure, and clears only after confirmed success. Fields are
read-only while submitting. A visible polite live region announces status;
associated inline errors, first-invalid-field focus, native controls, focus
indicators, themes, and reduced-motion behavior are retained.

## Required server environment variables

Copy `.env.example` to `.env.local` for local configuration. All example values
are placeholders. `.env`, `.env.*` (except `.env.example`), and `.vercel` are
ignored by Git. Never put these variables in `src`, commit actual values, or
prefix them with `VITE_`.

| Variable | Value to configure |
| --- | --- |
| `RESEND_API_KEY` | A Resend API key created in your account |
| `CONTACT_TO_EMAIL` | The single email address associated with that Resend account |
| `CONTACT_FROM_EMAIL` | `Mikko Pangilinan Portfolio <onboarding@resend.dev>` |

The existing public direct-contact address is unchanged; it is not used as the
private API recipient. The recipient is read only from `CONTACT_TO_EMAIL`.

## Manual Resend and Vercel setup

1. Create or log in to your Resend account.
2. Open **API Keys** and create a sending API key. Store it privately.
3. In the portfolio's Vercel project, open **Settings → Environment Variables**.
4. Add `RESEND_API_KEY` with that private key.
5. Add `CONTACT_TO_EMAIL` with the same email associated with your Resend account.
6. Add `CONTACT_FROM_EMAIL` with
   `Mikko Pangilinan Portfolio <onboarding@resend.dev>` (without wrapping quotes
   in the Vercel UI).
7. Select the environments you actually use: **Production**, **Preview**, and
   **Development** as appropriate. Environment values must exist for each
   deployment you expect to use. Do not expose production credentials to
   untrusted preview code.
8. Save the variables. After reviewing and committing the code yourself,
   redeploy the intended environment so the new code and variables take effect.

No custom website domain is needed: your free `*.vercel.app` URL can host both
the portfolio and this function. No domain purchase or configuration was done.

### Current sender limitation

Resend's `onboarding@resend.dev` sender can send only to the email associated
with your Resend account. This implementation sends one notification there;
it sends no visitor confirmation emails. The sender address remains
`onboarding@resend.dev`, with the portfolio display name above. Reply-To is the
visitor, not the sender. See [Resend's test-domain restriction](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain).

If you later buy a domain, verify it in Resend and change `CONTACT_FROM_EMAIL`
to your verified-domain sender, then redeploy. No form or API rewrite is needed.
The recipient remains the explicitly configured single inbox.

## Local development and safe verification

Use a supported Node.js version with native `fetch` and `AbortSignal.timeout`
(Node 22 or newer is recommended). Vite's `npm.cmd run dev` and
`npm.cmd run preview` serve the frontend only; they do **not** execute Vercel
Functions. An HTML fallback from those servers will never be treated as a
successful submission.

For full-stack local development, install/use Vercel CLI and run `vercel dev`
from this project with the Development variables configured. This is a manual
step and may require linking/logging into your Vercel project. With real keys,
submitting valid forms can send actual email. Do not use real credentials for
automated checks.

Safe checks requiring no credentials and sending no emails:

```powershell
npm.cmd run test:contact
npm.cmd run lint
npm.cmd run build
git diff --check
```

`scripts/contact.test.mjs` uses Node's built-in test runner and an injected mock
provider. It never invokes live Resend, reads private environment files, or
prints personal messages. It checks normalization, length boundaries, malformed
input, methods, content types, origins, honeypot/timing checks, fixed recipients,
Reply-To, HTML escaping, plain text, provider failures, and SPA route rules.

The Vercel rewrite preserves the SPA deep-link fallback while excluding `/api`
and `/api/*`. Root `api/contact.js` is discovered by Vercel for Vite projects;
see [Vercel's Vite Functions documentation](https://vercel.com/docs/frameworks/frontend/vite)
and [Resend's API reference](https://resend.com/docs/api-reference/emails/send-email).
Actual Vercel routing and inbox rendering still require manual review after
your deployment; neither deployment nor live email delivery was tested here.

## Spam protection and limits

- Honeypot `website`: visually hidden, inert, excluded from assistive technology
  and Tab navigation; nonempty or malformed values are rejected server-side.
- Name: 2–100 characters; email: valid address, up to 254 characters; message:
  10–5,000 characters. Unsupported control characters are rejected.
- Request bodies are limited to 24,000 bytes after parsing; larger declared or
  raw bodies are also rejected. Platform-level size/parser errors may be handled
  by Vercel before application code runs.
- A client form-start timestamp must be at least 1.5 seconds old. This is only a
  heuristic: bots can forge it, and a browser clock ahead of the server can
  cause rejection. Long-open tabs do not expire. Fast/autofilled users can wait
  a moment and retry without losing text.
- A matching same-origin `Origin` is required; cross-site Fetch Metadata is
  rejected. HTTP is permitted only for localhost development. No CORS access
  is enabled. These checks discourage browser cross-site submissions; scripted
  clients can forge headers and are not authenticated by them.

There is deliberately no per-instance in-memory rate limiter. Distributed bots
can bypass these basic protections, consume provider quota, or flood the inbox.
Add durable, production-grade rate limiting (for example through the hosting
firewall) or server-verified Cloudflare Turnstile if spam becomes a problem.
Provider delivery, spam-folder placement, and rendering in Outlook/Gmail/Apple
Mail remain manual checks. Actual screen-reader announcements and Safari/iOS
behavior also warrant human review.
