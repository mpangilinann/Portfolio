import { motion as Motion } from "framer-motion";
import useRevealState from "../../hooks/useRevealState";
import { motionEase, motionVisible } from "../../utils/motion";
import { homePresets, homeTiming } from "./homeMotion";

const elements = { div: Motion.div, p: Motion.p, h1: Motion.h1, h2: Motion.h2, li: Motion.li, article: Motion.article };

// Home-specific choreography retains its approved timing and mask bounds.
// Focus and live motion preferences always bypass the visual entrance.
export default function HomeReveal({ as = "div", children, className = "", preset = "rise", entrance = false, delay = 0, duration, ready = true, ...props }) {
  const { reduced, instant, visible, enter, finish } = useRevealState(entrance, ready);
  const Component = elements[as];
  const from = homePresets[preset];
  const masked = "clipPath" in from;
  const target = { ...motionVisible, ...(masked ? { clipPath: preset === "mask" ? "inset(-0.15em -0.15em -0.15em -0.15em)" : "inset(0% 0% 0% 0%)" } : {}), ...(preset === "soft" ? { filter: "blur(0px)", transitionEnd: { filter: "none" } } : {}) };
  return <Component {...props} className={`motion-reveal home-reveal ${className}`.trim()}
    data-motion-state={visible ? "visible" : "pending"} data-motion-instant={reduced || instant || undefined}
    initial={reduced ? false : from} animate={visible ? target : from}
    onViewportEnter={enter} viewport={{ once: true, amount: 0.2 }}
    onFocusCapture={finish}
    transition={{ duration: reduced || instant ? 0 : duration ?? (preset === "imageMask" ? homeTiming.image : entrance ? homeTiming.entrance : homeTiming.section), delay: reduced || instant ? 0 : Math.min(delay, 0.63), ease: motionEase }}>
    {children}
  </Component>;
}
