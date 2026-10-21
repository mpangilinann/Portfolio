// ScrollToTop.jsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    const changed = previousPath.current !== pathname;
    previousPath.current = pathname;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? "instant" : "smooth",
    });
    if (!changed) return;
    const frame = requestAnimationFrame(() => {
      if (!document.querySelector('[aria-modal="true"]')) {
        document.getElementById('main-content')?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
