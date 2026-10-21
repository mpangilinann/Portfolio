import { isValidEmail, validateContactFields } from "../src/lib/contactValidation.js";
import { createContactEmail } from "../server/contactEmail.js";

const MAX_BODY_BYTES = 24_000;
const failureMessage = "We couldn't confirm your message was sent. Please try again later.";

// Dependency injection keeps every local check disconnected from live delivery.
export function createContactHandler({ fetchImpl = fetch, env = process.env, now = Date.now } = {}) {
  return async function contactHandler(req, res) {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Content-Type-Options", "nosniff");
    const fail = (status, message, errors) => res.status(status).json({ success: false, message, ...(errors ? { errors } : {}) });
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return fail(405, "Please use POST to submit the contact form.");
    }
    const host = req.headers.host;
    const origin = req.headers.origin;
    const local = typeof host === "string" && /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host);
    if (!host || !origin || (origin !== `https://${host}` && !(local && origin === `http://${host}`)) ||
      (req.headers["sec-fetch-site"] && req.headers["sec-fetch-site"] !== "same-origin")) {
      return fail(403, "Please submit this form from the portfolio website.");
    }
    if (req.headers["content-type"]?.split(";")[0].trim().toLowerCase() !== "application/json") {
      return fail(415, "Please submit the form as JSON.");
    }
    if (Number(req.headers["content-length"]) > MAX_BODY_BYTES) return fail(413, "The submitted form is too large.");

    let body;
    try {
      // Vercel parses JSON automatically; a string is also supported for local checks.
      if (typeof req.body === "string" && Buffer.byteLength(req.body) > MAX_BODY_BYTES) return fail(413, "The submitted form is too large.");
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      if (!body || typeof body !== "object" || Array.isArray(body)) return fail(400, "Please submit a valid contact form.");
      if (Buffer.byteLength(JSON.stringify(body)) > MAX_BODY_BYTES) return fail(413, "The submitted form is too large.");
    } catch {
      return fail(400, "Please submit a valid contact form.");
    }
    if (body.website !== undefined && (typeof body.website !== "string" || body.website !== "")) {
      return fail(400, "We couldn't accept this submission. Please try again.");
    }
    const timestamp = now();
    if (!Number.isSafeInteger(body.startedAt) || body.startedAt <= 0 || timestamp - body.startedAt < 1500) {
      return fail(400, "Please take a moment to complete the form, then try again.");
    }
    const { values, errors } = validateContactFields(body);
    if (Object.keys(errors).length) return fail(400, "Please correct the highlighted fields.", errors);

    const apiKey = env.RESEND_API_KEY?.trim();
    const to = env.CONTACT_TO_EMAIL?.trim();
    const from = env.CONTACT_FROM_EMAIL?.trim();
    const senderAddress = from?.match(/^[^<>\r\n]+<([^<>]+)>$/)?.[1] ?? from;
    if (!apiKey || /[\r\n]/.test(apiKey) || !isValidEmail(to) || !from || from.length > 320 || /[\r\n]/.test(from) || !isValidEmail(senderAddress)) {
      return fail(503, "The contact form is temporarily unavailable. Please try again later.");
    }
    try {
      const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: values.email,
          ...createContactEmail(values, timestamp),
        }),
        signal: AbortSignal.timeout(10_000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || typeof result?.id !== "string" || !result.id.trim()) return fail(502, failureMessage);
      return res.status(200).json({ success: true, message: "Your message has been sent. Thank you for getting in touch!" });
    } catch {
      // Never log contact contents, credentials, or provider responses.
      return fail(502, failureMessage);
    }
  };
}

export default createContactHandler();
