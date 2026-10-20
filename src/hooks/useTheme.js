import { useEffect, useState } from "react";

export default function useTheme() {
  const [darkMode, setDarkMode] = useState(
    () => document.documentElement.dataset.theme === "dark"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      try {
        const saved = localStorage.getItem("theme");
        if (saved === "dark" || saved === "light") return;
      } catch { /* System preference still works when storage is unavailable. */ }
      setDarkMode(media.matches);
    };
    const handleStorage = event => {
      if (event.key === "theme" || event.key === null) {
        setDarkMode(event.newValue === "dark" || (event.newValue !== "light" && media.matches));
      }
    };
    media.addEventListener("change", handleSystemChange);
    window.addEventListener("storage", handleStorage);
    return () => {
      media.removeEventListener("change", handleSystemChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const selectTheme = next => {
    setDarkMode(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch { /* Switching themes remains available without storage. */ }
  };

  return [darkMode, selectTheme];
}
