// Optional one-time asset maintenance. Uses installed Chrome, not a runtime dependency.
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, mkdtemp, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { projects } from "../src/data/projects.js";

const root = path.resolve(import.meta.dirname, "..");
const jobs = [
  ...projects.map(project => ({
    source: `public${project.image}`, widths: [640, 960, 1440], quality: 0.95, output: `public/images/${path.parse(project.image).name}`,
  })),
  { source: "public/profile-pic.jpg", widths: [300], quality: 0.95, output: "public/images/profile-pic" },
  { source: "src/assets/logo-dark.png", widths: [320], quality: 1, output: "src/assets/logo-dark" },
  { source: "src/assets/logo-light.png", widths: [320], quality: 1, output: "src/assets/logo-light" },
  { source: "public/favicon.png", widths: [64], format: "image/png", output: "public/images/favicon" },
];
const server = createServer(async (req, res) => {
  try {
    const file = path.resolve(root, `.${new URL(req.url, "http://localhost").pathname}`);
    if (!file.startsWith(root + path.sep)) { res.end(); return; }
    res.end(await readFile(file));
  } catch { res.statusCode = 404; res.end(); }
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const port = server.address().port;
const debugPort = 9225;
const directory = await mkdtemp(path.join(tmpdir(), "portfolio-images-"));
const executable = process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const chrome = spawn(executable, ["--headless=new", "--disable-gpu", "--no-first-run", `--remote-debugging-port=${debugPort}`, `--user-data-dir=${directory}`, "about:blank"], { windowsHide: true, stdio: "ignore" });
let ws;
try {
  let pages;
  for (let i = 0; i < 40; i++) {
    try { pages = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json(); break; }
    catch { await new Promise(resolve => setTimeout(resolve, 250)); }
  }
  if (!pages) throw Error("Chrome did not start. Set CHROME_PATH to an installed browser.");
  ws = new WebSocket(pages.find(page => page.type === "page").webSocketDebuggerUrl);
  await new Promise(resolve => { ws.onopen = resolve; });
  let id = 0;
  const pending = new Map();
  ws.onmessage = event => {
    const message = JSON.parse(event.data);
    if (!message.id) return;
    const request = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) request.reject(message.error); else request.resolve(message.result);
  };
  const send = (method, params) => new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
  await send("Page.navigate", { url: `http://127.0.0.1:${port}/index.html` });
  await new Promise(resolve => setTimeout(resolve, 500));
  const audit = [];
  const assets = {};
  for (const job of jobs) {
    const result = await send("Runtime.evaluate", {
      expression: `(${(async job => {
        const image = new Image(); image.src = "/" + job.source; await image.decode();
        const variants = [];
        for (const width of [...new Set(job.widths.map(width => Math.min(width, image.naturalWidth)))]) {
          const canvas = document.createElement("canvas");
          canvas.width = width; canvas.height = Math.round(width * image.naturalHeight / image.naturalWidth);
          const context = canvas.getContext("2d");
          context.imageSmoothingQuality = "high";
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          const data = canvas.toDataURL(job.format ?? "image/webp", job.quality);
          if (!data.startsWith(`data:${job.format ?? "image/webp"};base64,`)) throw Error("Encoder unavailable");
          variants.push({ width, height: canvas.height, data: data.split(",")[1] });
        }
        return { width: image.naturalWidth, height: image.naturalHeight, variants };
      }).toString()})(${JSON.stringify(job)})`,
      awaitPromise: true, returnByValue: true,
    });
    if (result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails));
    const image = result.result.value;
    const variants = [];
    for (const variant of image.variants) {
      const file = `${job.output}-${variant.width}.${job.format === "image/png" ? "png" : "webp"}`;
      const buffer = Buffer.from(variant.data, "base64");
      await mkdir(path.dirname(path.join(root, file)), { recursive: true });
      await writeFile(path.join(root, file), buffer);
      variants.push({ file, width: variant.width, height: variant.height, bytes: buffer.length });
    }
    audit.push({ source: job.source, width: image.width, height: image.height, bytes: (await stat(path.join(root, job.source))).size, quality: job.quality ?? "PNG", variants });
    if (job.source.startsWith("public/")) {
      const largest = variants.at(-1);
      assets[job.source.replace("public", "")] = {
        src: largest.file.replace("public", ""), width: largest.width, height: largest.height,
        srcSet: variants.map(variant => `${variant.file.replace("public", "")} ${variant.width}w`).join(", "),
      };
    }
    console.log(`${job.source}: ${(await stat(path.join(root, job.source))).size} → ${variants.at(-1).bytes} bytes`);
  }
  await writeFile(path.join(root, "src/data/imageAssets.json"), JSON.stringify(assets, null, 2) + "\n");
  await writeFile(path.join(root, "scripts/image-audit.json"), JSON.stringify(audit, null, 2) + "\n");
} finally {
  ws?.close(); chrome.kill(); server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
}
