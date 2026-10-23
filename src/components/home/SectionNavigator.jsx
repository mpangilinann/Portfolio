import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../../hooks/useReducedMotion";

const destinations = [
  { id: "intro", label: "Intro" }, { id: "about-preview", label: "About" },
  { id: "selected-work", label: "Work" }, { id: "my-approach", label: "Approach" },
  { id: "tools", label: "Tools" }, { id: "home-contact", label: "Contact" },
];

export default function SectionNavigator() {
  const [active, setActive] = useState("intro");
  const reduced = useReducedMotion();
  const locked = useRef(null);
  const unlock = useRef(0);
  useEffect(() => {
    if (reduced && locked.current) document.getElementById(locked.current)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, [reduced]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1440px)");
    let observer, footerObserver, timer;
    const update = () => {
      if (!media.matches || locked.current) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (locked.current) return;
        const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
        const passed = destinations.filter(({ id }) => document.getElementById(id)?.getBoundingClientRect().top <= Math.min(180, window.innerHeight * .25));
        const next = bottom ? "home-contact" : passed.at(-1)?.id ?? "intro";
        setActive(current => current === next ? current : next);
      }, 80);
    };
    const observe = () => {
      observer?.disconnect(); footerObserver?.disconnect(); clearTimeout(timer);
      if (!media.matches) return;
      observer = new IntersectionObserver(update, { rootMargin: "-100px 0px -40% 0px", threshold: [0, .05, .2, .5, .8, 1] });
      destinations.forEach(({ id }) => { const element = document.getElementById(id); if (element) observer.observe(element); });
      footerObserver = new IntersectionObserver(update);
      const footer = document.querySelector('.site-footer');
      if (footer) footerObserver.observe(footer);
      update();
    };
    const interrupt = event => {
      if (!media.matches) return;
      if (event.type === "keydown" && !["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) return;
      if (locked.current) window.scrollTo({ top: window.scrollY, behavior: "instant" });
      locked.current = null; clearTimeout(unlock.current); update();
    };
    observe(); media.addEventListener("change", observe);
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("keydown", interrupt);
    return () => {
      observer?.disconnect(); footerObserver?.disconnect(); clearTimeout(timer); clearTimeout(unlock.current); media.removeEventListener("change", observe);
      window.removeEventListener("wheel", interrupt); window.removeEventListener("touchstart", interrupt); window.removeEventListener("keydown", interrupt);
    };
  }, []);
  const navigate = (event, id) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    locked.current = id; setActive(id); clearTimeout(unlock.current);
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
    unlock.current = setTimeout(() => { locked.current = null; }, 900);
  };
  return <nav className="section-navigator" aria-label="On this page">{destinations.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} aria-label={`${label} section`} onClick={event => navigate(event, id)}><span className="section-nav-label">{label}</span><span className="section-nav-marker" aria-hidden="true" /></a>)}</nav>;
}
