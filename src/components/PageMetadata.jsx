import { useEffect } from "react";

const defaultDescription = "Portfolio of Mikko Pangilinan, a front-end developer specializing in React, Tailwind, and modern web development.";

export default function PageMetadata({ title, description = defaultDescription }) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);

  return null;
}
