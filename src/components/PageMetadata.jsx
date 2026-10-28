import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMetadata, siteName } from "../data/seo";

function setMeta(attribute, name, content) {
  const matches = [...document.head.querySelectorAll(`meta[${attribute}="${name}"]`)];
  const meta = matches.shift() ?? document.createElement("meta");
  matches.forEach(element => element.remove());
  meta.setAttribute(attribute, name);
  meta.content = content;
  if (!meta.isConnected) document.head.appendChild(meta);
}

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const data = getRouteMetadata(pathname);
    document.title = data.title;
    for (const [name, content] of Object.entries({
      description: data.description, robots: data.robots,
      "application-name": siteName, "apple-mobile-web-app-title": siteName,
      "twitter:card": "summary_large_image", "twitter:title": data.title,
      "twitter:description": data.description, "twitter:image": data.image,
      "twitter:image:alt": data.imageAlt,
    })) setMeta("name", name, content);
    for (const [name, content] of Object.entries({
      "og:title": data.title, "og:description": data.description,
      "og:url": data.canonical, "og:type": data.type, "og:image": data.image,
      "og:image:alt": data.imageAlt, "og:site_name": siteName,
    })) {
      if (content) setMeta("property", name, content);
      else document.head.querySelectorAll(`meta[property="${name}"]`).forEach(element => element.remove());
    }
    document.head.querySelectorAll('link[rel="canonical"]').forEach(element => element.remove());
    if (data.canonical) {
      const canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = data.canonical;
      document.head.appendChild(canonical);
    }
    document.head.querySelectorAll('script[data-portfolio-jsonld]').forEach(element => element.remove());
    if (data.structuredData) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.portfolioJsonld = "";
      script.textContent = JSON.stringify(data.structuredData).replace(/</g, "\\u003c");
      document.head.appendChild(script);
    }
  }, [pathname]);
  return null;
}
