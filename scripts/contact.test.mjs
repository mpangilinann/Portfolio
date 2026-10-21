import assert from "node:assert/strict";
import { test } from "node:test";
import { createContactHandler } from "../api/contact.js";
import { validateContactFields } from "../src/lib/contactValidation.js";
import { readFile } from "node:fs/promises";

const now = 1_800_000_000_000;
const env = {
  RESEND_API_KEY: "re_mock_not_a_real_key",
  CONTACT_TO_EMAIL: "owner@example.com",
  CONTACT_FROM_EMAIL: "Mikko Pangilinan Portfolio <onboarding@resend.dev>",
};
const valid = { name: "  Test Visitor  ", email: " Visitor@EXAMPLE.COM ", message: "  Hello, I'd like to discuss a project.\r\nThank you!  ", website: "", startedAt: now - 5000 };

async function invoke({ body = valid, method = "POST", headers = {}, config = env, provider } = {}) {
  const calls = [];
  const handler = createContactHandler({ env: config, now: () => now, fetchImpl: async (url, options) => {
    calls.push({ url, options, payload: JSON.parse(options.body) });
    return provider ? provider() : { ok: true, json: async () => ({ id: "mock-message-id" }) };
  } });
  const response = { headers: {}, setHeader(key, value) { this.headers[key] = value; }, status(value) { this.statusCode = value; return this; }, json(value) { this.body = value; return this; } };
  await handler({ method, headers: { host: "portfolio.vercel.app", origin: "https://portfolio.vercel.app", "content-type": "application/json", "sec-fetch-site": "same-origin", ...headers }, body }, response);
  assert.equal(typeof response.body.success, "boolean");
  assert.equal(typeof response.body.message, "string");
  assert.equal(response.headers["Cache-Control"], "no-store");
  return { response, calls };
}

test("valid parsed and raw JSON normalize fields, use fixed recipient and Reply-To", async () => {
  for (const body of [valid, JSON.stringify(valid)]) {
    const { response, calls } = await invoke({ body });
    assert.equal(response.statusCode, 200);
    assert.equal(response.body.success, true);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://api.resend.com/emails");
    assert.equal(calls[0].options.headers.Authorization, `Bearer ${env.RESEND_API_KEY}`);
    const email = calls[0].payload;
    assert.deepEqual(email.to, [env.CONTACT_TO_EMAIL]);
    assert.equal(email.from, env.CONTACT_FROM_EMAIL);
    assert.equal(email.reply_to, "Visitor@example.com");
    assert.equal(email.subject, "Portfolio message from Test Visitor");
    assert.match(email.text, /project\.\nThank you!/);
    assert.match(email.html, /project\.<br>Thank you!/);
    assert.ok(email.text.includes(new Date(now).toISOString()));
  }
});

test("submitted recipient and sender overrides never control delivery", async () => {
  const { calls } = await invoke({ body: { ...valid, to: "attacker@example.com", from: "attacker@example.com", reply_to: "attacker@example.com" } });
  assert.deepEqual(calls[0].payload.to, [env.CONTACT_TO_EMAIL]);
  assert.equal(calls[0].payload.from, env.CONTACT_FROM_EMAIL);
  assert.equal(calls[0].payload.reply_to, "Visitor@example.com");
});

test("HTML escapes user content and preserves plain-text content", async () => {
  const body = { ...valid, name: '<b>"Visitor" & friend</b>', message: "<script>alert('x')</script>\n<img src=x onerror=alert(1)> & goodbye" };
  const { calls } = await invoke({ body });
  assert.ok(calls[0].payload.html.includes("&lt;script&gt;alert(&#39;x&#39;)&lt;/script&gt;<br>&lt;img"));
  assert.ok(calls[0].payload.html.includes("&lt;b&gt;&quot;Visitor&quot; &amp; friend&lt;/b&gt;"));
  assert.ok(!calls[0].payload.html.includes("<script>"));
  assert.ok(calls[0].payload.text.includes(body.message));
});

test("empty, malformed, short, long, non-string and control-character fields fail before delivery", async () => {
  const invalid = [
    ...["name", "email", "message"].flatMap(field => ["", "  ", null, 10, [], {}].map(value => ({ ...valid, [field]: value }))),
    ...["a", "a@b", "a@@example.com", "a..b@example.com", "a@-example.com", "a@example.com\r\nBcc: victim@example.com"].map(email => ({ ...valid, email })),
    { ...valid, name: "A" }, { ...valid, name: "a".repeat(101) }, { ...valid, name: "Valid\nInjected" },
    { ...valid, email: "a".repeat(255) + "@example.com" },
    { ...valid, message: "short" }, { ...valid, message: "x".repeat(5001) }, { ...valid, message: "bad\u0000message" },
  ];
  for (const body of invalid) {
    const { response, calls } = await invoke({ body });
    assert.equal(response.statusCode, 400);
    assert.ok(Object.keys(response.body.errors).length);
    assert.equal(calls.length, 0);
  }
});

test("valid length boundaries and Unicode names are supported", () => {
  assert.deepEqual(validateContactFields({ name: "李明", email: "test@example.com", message: "x".repeat(10) }).errors, {});
  assert.deepEqual(validateContactFields({ name: "a".repeat(100), email: "test@example.com", message: "x".repeat(5000) }).errors, {});
});

test("honeypot, timing, method, origin, content type, body shape and size are rejected", async () => {
  const cases = [
    [{ body: { ...valid, website: "spam" } }, 400], [{ body: { ...valid, website: {} } }, 400],
    [{ body: { ...valid, startedAt: now } }, 400], [{ body: { ...valid, startedAt: now + 10000 } }, 400],
    [{ body: { ...valid, startedAt: "123" } }, 400],
    ...["GET", "PUT", "DELETE", "OPTIONS", "HEAD"].map(method => [{ method }, 405]),
    [{ headers: { origin: "https://attacker.example" } }, 403], [{ headers: { origin: undefined } }, 403],
    [{ headers: { "sec-fetch-site": "cross-site" } }, 403],
    [{ headers: { "content-type": "text/plain" } }, 415], [{ headers: { "content-type": undefined } }, 415],
    [{ body: "{" }, 400], [{ body: "null" }, 400], [{ body: [] }, 400], [{ body: null }, 400],
    [{ headers: { "content-length": "24001" } }, 413], [{ body: "x".repeat(24001) }, 413],
    [{ body: { ...valid, extra: "x".repeat(24001) } }, 413],
  ];
  for (const [input, status] of cases) {
    const { response, calls } = await invoke(input);
    assert.equal(response.statusCode, status);
    assert.equal(response.body.success, false);
    assert.equal(calls.length, 0);
    if (status === 405) assert.equal(response.headers.Allow, "POST");
  }
});

test("same-origin localhost and charset JSON work", async () => {
  const { response } = await invoke({ headers: { host: "localhost:3000", origin: "http://localhost:3000", "content-type": "application/json; charset=utf-8" } });
  assert.equal(response.statusCode, 200);
});

test("missing/invalid configuration is safe and custom-domain sender needs only configuration", async () => {
  for (const config of [{}, { ...env, CONTACT_TO_EMAIL: "a@example.com,b@example.com" }, { ...env, CONTACT_FROM_EMAIL: "invalid" }, { ...env, RESEND_API_KEY: "bad\nkey" }]) {
    const { response, calls } = await invoke({ config });
    assert.equal(response.statusCode, 503);
    assert.equal(calls.length, 0);
    assert.ok(!JSON.stringify(response.body).includes("RESEND"));
  }
  const { calls } = await invoke({ config: { ...env, CONTACT_FROM_EMAIL: "Portfolio <hello@example.com>" } });
  assert.equal(calls[0].payload.from, "Portfolio <hello@example.com>");
});

test("provider rejection, network error, timeout and malformed success never claim success", async () => {
  for (const provider of [
    () => ({ ok: false, json: async () => ({ message: "private provider details" }) }),
    () => { throw Error("private network error"); },
    () => { throw new DOMException("private timeout", "TimeoutError"); },
    () => ({ ok: true, json: async () => ({}) }),
    () => ({ ok: true, json: async () => { throw Error("not JSON"); } }),
  ]) {
    const { response, calls } = await invoke({ provider });
    assert.equal(response.statusCode, 502);
    assert.equal(response.body.success, false);
    assert.equal(calls.length, 1);
    assert.ok(!JSON.stringify(response.body).includes("private"));
  }
});

test("SPA rewrite preserves deep links and excludes all API paths", async () => {
  const config = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
  const fallback = new RegExp(`^${config.rewrites[0].source}$`);
  for (const route of ["/", "/contact", "/projects/ac-core", "/projects/flashify", "/projects/thryve", "/projects/the-coffee-lab-lounge", "/projects/q-zone-detailers", "/projects/techquest-jobs"]) assert.ok(fallback.test(route), route);
  for (const route of ["/api", "/api/contact", "/api/missing"]) assert.ok(!fallback.test(route), route);
});
