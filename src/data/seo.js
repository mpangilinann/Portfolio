import { projects } from "./projects.js";
import { profile } from "./profile.js";
import { socialLinks } from "./socialLinks.js";

export const siteOrigin = "https://mikkopangilinan.vercel.app";
export const defaultSocialImage = `${siteOrigin}/ac-core.png`;
export const staticPages = {
  "/": {
    title: "Mikko Pangilinan | Front-End Web Developer",
    description: "Portfolio of Mikko Pangilinan, a front-end web developer building accessible, responsive interfaces with React, Angular, and Vue. Explore projects and experience.",
  },
  "/about": {
    title: "About | Mikko Pangilinan",
    description: "Meet Mikko Pangilinan, a BSIT Web Development student at Holy Angel University focused on front-end development and full-stack academic and collaborative projects.",
  },
  "/projects": {
    title: "Projects | Mikko Pangilinan",
    description: "Explore Mikko Pangilinan's web projects, including AC-CORE, Flashify, and Thryve, with features, technologies, live demos, and source code.",
  },
  "/resume": {
    title: "Resume | Mikko Pangilinan",
    description: "View Mikko Pangilinan's web development resume, including technical skills, project experience, education, certifications, and an IT Support internship.",
  },
  "/contact": {
    title: "Contact | Mikko Pangilinan",
    description: "Contact Mikko Pangilinan about collaboration, junior web development opportunities, or front-end projects through the portfolio contact form or direct email.",
  },
};

export function absoluteUrl(path) {
  return new URL(path, `${siteOrigin}/`).href;
}

export function getRouteMetadata(pathname) {
  const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const project = projects.find(project => `/projects/${project.slug}` === path);
  const page = staticPages[path];
  if (!page && !project) return {
    title: "Page Not Found | Mikko Pangilinan",
    description: "The requested page could not be found. Return to Mikko Pangilinan's portfolio to explore web projects, experience, and contact information.",
    canonical: null,
    robots: "noindex, nofollow",
    image: defaultSocialImage,
    imageAlt: "AC-CORE project interface from Mikko Pangilinan's portfolio",
    type: "website",
    structuredData: null,
  };
  const canonical = absoluteUrl(path);
  let structuredData = null;
  if (path === "/") structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person", "@id": `${siteOrigin}/#person`, name: profile.name,
        url: `${siteOrigin}/`, jobTitle: profile.title, description: profile.positioning,
        image: absoluteUrl("/profile-pic.jpg"), sameAs: socialLinks.map(link => link.url),
      },
      {
        "@type": "WebSite", "@id": `${siteOrigin}/#website`, name: "Mikko Pangilinan Portfolio",
        url: `${siteOrigin}/`, description: page.description,
        about: { "@id": `${siteOrigin}/#person` }, inLanguage: "en",
      },
    ],
  };
  if (project) structuredData = {
    "@context": "https://schema.org", "@type": "CreativeWork", "@id": `${canonical}#project`,
    name: project.title, description: project.description, url: canonical,
    image: absoluteUrl(project.image), keywords: project.technologies ?? [],
    sameAs: [project.github, project.live].filter(Boolean),
  };
  return {
    title: project ? `${project.title} | Mikko Pangilinan` : page.title,
    description: project?.description ?? page.description,
    canonical, robots: "index, follow", type: "website",
    image: project ? absoluteUrl(project.image) : defaultSocialImage,
    imageAlt: `${project?.title ?? "AC-CORE"} project interface`,
    structuredData,
  };
}

export function indexablePaths() {
  return [...Object.keys(staticPages), ...projects.map(project => `/projects/${project.slug}`)];
}
