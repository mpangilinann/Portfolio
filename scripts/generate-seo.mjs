import { readFile, writeFile } from "node:fs/promises";
import { absoluteUrl, getRouteMetadata, indexablePaths, siteOrigin, siteName } from "../src/data/seo.js";

const xmlEscape = value => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const htmlEscape = value => xmlEscape(value).replace(/'/g, "&#39;");
const metadata = getRouteMetadata("/");
const tags = [
  `<title>${htmlEscape(metadata.title)}</title>`,
  `<meta name="description" content="${htmlEscape(metadata.description)}" />`,
  `<meta name="application-name" content="${htmlEscape(siteName)}" />`,
  `<meta name="apple-mobile-web-app-title" content="${htmlEscape(siteName)}" />`,
  `<meta name="robots" content="index, follow" />`,
  `<link rel="canonical" href="${metadata.canonical}" />`,
  ...Object.entries({ "og:title": metadata.title, "og:description": metadata.description,
    "og:url": metadata.canonical, "og:type": metadata.type, "og:image": metadata.image,
    "og:image:alt": metadata.imageAlt, "og:site_name": siteName,
  }).map(([name, content]) => `<meta property="${name}" content="${htmlEscape(content)}" />`),
  ...Object.entries({ "twitter:card": "summary_large_image", "twitter:title": metadata.title,
    "twitter:description": metadata.description, "twitter:image": metadata.image,
    "twitter:image:alt": metadata.imageAlt,
  }).map(([name, content]) => `<meta name="${name}" content="${htmlEscape(content)}" />`),
  `<script type="application/ld+json" data-portfolio-jsonld>${JSON.stringify(metadata.structuredData).replace(/</g, "\\u003c")}</script>`,
].join("\n    ");
const indexPath = new URL("../index.html", import.meta.url);
const index = await readFile(indexPath, "utf8");
if (!index.includes("<!-- seo:start -->") || !index.includes("<!-- seo:end -->")) throw Error("Missing SEO template markers");
await writeFile(indexPath, index.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, `<!-- seo:start -->\n    ${tags}\n    <!-- seo:end -->`));
await writeFile(new URL("../public/sitemap.xml", import.meta.url), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexablePaths().map(path => `  <url><loc>${xmlEscape(absoluteUrl(path))}</loc></url>`).join("\n")}\n</urlset>\n`);
await writeFile(new URL("../public/robots.txt", import.meta.url), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteOrigin}/sitemap.xml\n`);
console.log(`Generated fallback metadata, robots.txt and sitemap (${indexablePaths().length} URLs).`);
