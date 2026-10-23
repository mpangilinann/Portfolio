import { useCallback, useEffect, useRef } from "react";
import useFinePointer from "./useFinePointer";
import useReducedMotion from "./useReducedMotion";

const properties = ["--pointer-x", "--pointer-y", "--pointer-active", "--tilt-x", "--tilt-y", "--shift-x", "--shift-y", "--word-a", "--word-b"];

// One layout read/write batch per frame; pointer movement never enters React state.
export default function usePointerSurface({ tilt = 0, shift = 0 } = {}) {
  const ref = useRef(null);
  const frame = useRef(0);
  const point = useRef(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;
  const reset = useCallback(() => {
    cancelAnimationFrame(frame.current); frame.current = 0; point.current = null;
    if (ref.current) properties.forEach(property => ref.current.style.removeProperty(property));
  }, []);
  useEffect(() => { reset(); return reset; }, [enabled, reset]);
  const move = useCallback(event => {
    if (!enabled || event.pointerType !== "mouse") return;
    point.current = { x: event.clientX, y: event.clientY };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const element = ref.current, position = point.current;
      if (!element || !position) return;
      const bounds = element.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (position.x - bounds.left) / bounds.width));
      const y = Math.max(0, Math.min(1, (position.y - bounds.top) / bounds.height));
      const values = { "--pointer-x": `${x * 100}%`, "--pointer-y": `${y * 100}%`, "--pointer-active": "1", "--tilt-x": `${(.5 - y) * tilt * 2}deg`, "--tilt-y": `${(x - .5) * tilt * 2}deg`, "--shift-x": `${(x - .5) * shift * 2}px`, "--shift-y": `${(y - .5) * shift * 2}px`, "--word-a": tilt ? String(1 - x * .18) : "1", "--word-b": tilt ? String(.82 + x * .18) : "1" };
      Object.entries(values).forEach(([property, value]) => element.style.setProperty(property, value));
    });
  }, [enabled, tilt, shift]);
  return { ref, onPointerMove: move, onPointerLeave: reset, onPointerCancel: reset, "data-pointer-enabled": enabled ? "true" : "false" };
}
