import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { siteOrigin, siteName, siteAlternateName, indexablePaths, getRouteMetadata, staticPages } from "../src/data/seo.js";
import { projects } from "../src/data/projects.js";

test("eleven canonical routes have unique metadata and accurate project data", () => {
  const paths = indexablePaths();
  assert.equal(paths.length, Object.keys(staticPages).length + projects.length);
  assert.equal(new Set(paths).size, paths.length);
  const pages = paths.map(getRouteMetadata);
  assert.equal(new Set(pages.map(page => page.title)).size, pages.length);
  assert.equal(new Set(pages.map(page => page.description)).size, pages.length);
  pages.forEach((page, index) => {
    assert.equal(page.canonical, siteOrigin + paths[index]);
    assert.equal(page.robots, "index, follow");
    assert.ok(page.image.startsWith(siteOrigin + "/"));
  });
  for (const project of projects) {
    const page = getRouteMetadata(`/projects/${project.slug}`);
    assert.equal(page.description, project.description);
    assert.equal(page.image, siteOrigin + project.image);
    assert.equal(page.structuredData["@type"], "CreativeWork");
    assert.deepEqual(page.structuredData.keywords, project.technologies);
    assert.ok(!("author" in page.structuredData));
  }
});

test("unknown routes have no canonical or structured data and cannot be indexed", () => {
  for (const path of ["/not-found", "/projects/unknown"]) {
    const page = getRouteMetadata(path);
    assert.equal(page.canonical, null);
    assert.equal(page.structuredData, null);
    assert.equal(page.robots, "noindex, nofollow");
  }
  assert.equal(getRouteMetadata("/about/").canonical, siteOrigin + "/about");
});

test("home graph has Person and WebSite without invented dates or ratings", () => {
  const data = getRouteMetadata("/").structuredData;
  assert.deepEqual(data["@graph"].map(item => item["@type"]), ["Person", "WebSite"]);
  assert.equal(data["@graph"][0].sameAs.length, 3);
  const website = data["@graph"][1];
  assert.equal(website.name, siteName);
  assert.equal(website.alternateName, siteAlternateName);
  assert.equal(website.description, staticPages["/"].description);
  assert.equal(staticPages["/"].description, "Front-end web developer based in Pampanga, Philippines, creating accessible, responsive, and maintainable web applications.");
  assert.ok(!JSON.stringify(data).includes("aggregateRating"));
  assert.ok(!JSON.stringify(data).includes("datePublished"));
});

test("generated sitemap, robots and fallback HTML match the shared configuration", async () => {
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.deepEqual(urls, indexablePaths().map(path => siteOrigin + path));
  assert.ok(urls.every(url => !url.includes("/api/") && !url.endsWith(".pdf")));
  const robots = await readFile(new URL("../public/robots.txt", import.meta.url), "utf8");
  assert.ok(robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`));
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1);
  assert.equal((html.match(/name="description"/g) ?? []).length, 1);
  assert.ok(html.includes(getRouteMetadata("/").title));
  for (const [attribute, name, content] of [
    ["name", "description", staticPages["/"].description],
    ["property", "og:description", staticPages["/"].description],
    ["name", "twitter:description", staticPages["/"].description],
    ["property", "og:site_name", siteName],
    ["name", "application-name", siteName],
    ["name", "apple-mobile-web-app-title", siteName],
  ]) {
    assert.equal((html.match(new RegExp(`${attribute}="${name}"`, "g")) ?? []).length, 1);
    assert.ok(html.includes(`${attribute}="${name}" content="${content}"`));
  }
  for (const prefix of ["og:", "twitter:"]) {
    const names = [...html.matchAll(/<meta (?:property|name)="([^"]+)"/g)].map(match => match[1])
      .filter(name => name.startsWith(prefix));
    assert.equal(new Set(names).size, names.length);
  }
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
  assert.deepEqual(JSON.parse(html.match(/data-portfolio-jsonld>(.*?)<\/script>/s)[1]), getRouteMetadata("/").structuredData);
});

test("image variants exist, are smaller, and preserve composition/aspect ratio", async () => {
  const audit = JSON.parse(await readFile(new URL("./image-audit.json", import.meta.url), "utf8"));
  const assets = JSON.parse(await readFile(new URL("../src/data/imageAssets.json", import.meta.url), "utf8"));
  for (const image of audit) {
    assert.equal((await stat(new URL("../" + image.source, import.meta.url))).size, image.bytes);
    for (const variant of image.variants) {
      assert.equal((await stat(new URL("../" + variant.file, import.meta.url))).size, variant.bytes);
      assert.ok(Math.abs(variant.width / variant.height - image.width / image.height) < 0.01);
      assert.ok(variant.bytes < image.bytes);
    }
  }
  projects.forEach(project => assert.ok(assets[project.image]));
});

test("immutable caching applies only to hashed assets and not the API or HTML", async () => {
  const config = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
  for (const rule of config.headers) {
    if (!rule.headers.some(header => header.value.includes("immutable"))) continue;
    const pattern = new RegExp(`^${rule.source}$`);
    for (const path of ["/api/contact", "/", "/projects/ac-core", "/images/ac-core-1440.webp"]) assert.ok(!pattern.test(path));
    assert.ok(pattern.test("/assets/index-content-hash.js"));
  }
});
