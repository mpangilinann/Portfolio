import { motionTiming } from "./motion";

// Shared expressive language, independent of any page or route chunk.
export const revealTiming = { ...motionTiming, entrance: 0.52, section: 0.6, image: 0.7, itemStagger: 0.1, crossfade: 0.38 };
const imageReveal = { opacity: 0.4, scale: 1.04, clipPath: "inset(0% 0% 35% 0%)" };
export const revealPresets = {
  rise: { opacity: 0, y: 32 }, left: { opacity: 0, x: -24 }, right: { opacity: 0, x: 24 },
  document: { opacity: 0, x: -20 }, opposing: { opacity: 0, x: 20 },
  fade: { opacity: 0, y: 12 }, soft: { opacity: 0, y: 24, filter: "blur(7px)" },
  wave: { opacity: 0, y: 28, scale: 0.98 },
  mask: { opacity: 0, y: 30, clipPath: "inset(0em -0.15em 0.55em -0.15em)" },
  frame: { opacity: 0, y: 16, scale: 0.98, clipPath: "inset(0% 0% 12% 0%)" },
  portrait: { opacity: 0, scale: 0.97, clipPath: "circle(44% at 50% 50%)" },
  image: imageReveal, imageMask: imageReveal,
};
