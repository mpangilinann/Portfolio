import { useLayoutEffect, useRef } from "react";

// Reserve the existing first preview's natural height at each width. Other
// selections can then crossfade without shrinking the card or sticky surface.
export default function usePreviewHeight(enabled) {
  const stageRef = useRef(null);
  const templateRef = useRef(null);
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const copy = stage?.querySelector(".archive-entry-copy");
    if (!enabled || !stage || !copy) return;
    templateRef.current ??= copy.cloneNode(true); // Text/SVG only; never clone an image.
    const template = templateRef.current;
    const minimum = getComputedStyle(copy.parentElement).minHeight;
    let width = 0, alive = true;
    const measure = () => {
      if (!alive || stage.clientWidth === width) return;
      width = stage.clientWidth;
      const probe = document.createElement("article");
      probe.className = "archive-entry is-preview";
      probe.setAttribute("aria-hidden", "true"); probe.inert = true;
      Object.assign(probe.style, { position: "absolute", inset: "0 0 auto", visibility: "hidden", pointerEvents: "none", minHeight: minimum });
      const frame = document.createElement("div"); frame.className = "archive-image";
      probe.append(frame, template.cloneNode(true)); stage.append(probe);
      const height = probe.getBoundingClientRect().height; probe.remove();
      stage.style.setProperty("--archive-preview-height", `${height}px`);
    };
    measure();
    const observer = new ResizeObserver(measure); observer.observe(stage);
    document.fonts.ready.then(() => { if (alive) { width = 0; measure(); } });
    return () => { alive = false; observer.disconnect(); stage.style.removeProperty("--archive-preview-height"); };
  }, [enabled]);
  return stageRef;
}
