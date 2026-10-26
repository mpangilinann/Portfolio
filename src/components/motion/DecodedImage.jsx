import { useEffect, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";
import OptimizedImage from "../OptimizedImage";
import useRevealState from "../../hooks/useRevealState";
import { motionEase } from "../../utils/motion";
import { revealPresets, revealTiming } from "../../utils/revealMotion";

// Animates the existing image element, preserving its frame and delivery policy.
export default function DecodedImage({ entrance = false, reveal = true, delay = 0, onImageReady, className = "", ...props }) {
  const [readyVersion, setReadyVersion] = useState(0);
  const ready = readyVersion > 0;
  const [settled, setSettled] = useState(false);
  const element = useRef(null);
  const { reduced, instant, visible, enter } = useRevealState(entrance, ready);
  const done = () => { if (element.current) setReadyVersion(value => value + 1); };
  // A just-exited preview can be selected again before Presence unmounts it.
  // Reconfirm its cached image on a new callback, not only on the native load.
  useEffect(() => {
    const image = element.current;
    if (!readyVersion || !onImageReady || !image?.complete) return;
    let active = true;
    image.decode().catch(() => {}).then(() => {
      if (active && image === element.current && image.complete) onImageReady();
    });
    return () => { active = false; };
  }, [readyVersion, onImageReady]);
  return <OptimizedImage {...props} as={Motion.img} ref={element} className={`decoded-image ${className}`.trim()}
    data-motion-instant={reduced || instant || undefined} data-image-ready={ready || undefined} data-image-settled={settled || undefined}
    initial={reduced || !reveal ? false : revealPresets.image}
    animate={!reveal || visible ? { opacity: 1, scale: 1, clipPath: "inset(0%)", transitionEnd: { clipPath: "none" } } : revealPresets.image}
    onViewportEnter={enter} viewport={{ once: true, amount: 0.2 }}
    onAnimationComplete={() => { if (visible || !reveal) setSettled(true); }}
    onLoad={event => { event.currentTarget.decode().catch(() => {}).then(done); }} onError={done}
    transition={{ duration: reduced || instant || !reveal ? 0 : revealTiming.image, delay: reduced || instant ? 0 : delay, ease: motionEase }} />;
}
