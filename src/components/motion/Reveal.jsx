import { motion as Motion } from "framer-motion";
import useRevealState from "../../hooks/useRevealState";
import { motionEase, motionVisible } from "../../utils/motion";
import { revealPresets, revealTiming } from "../../utils/revealMotion";

const elements = {
  div: Motion.div, p: Motion.p, h1: Motion.h1, h2: Motion.h2,
  li: Motion.li, ul: Motion.ul, article: Motion.article, a: Motion.a,
  header: Motion.header, section: Motion.section, nav: Motion.nav, button: Motion.button, h3: Motion.h3, dl: Motion.dl,
};

// Uses the existing observer-backed Motion viewport feature, never a scroll
// listener. Text stays in the accessibility tree; focus skips all visual delay.
export default function Reveal({ as = "div", children, className = "", preset = "rise", entrance = false, delay = 0, duration, ...props }) {
  const { reduced, instant, visible, enter, finish } = useRevealState(entrance);
  const Component = elements[as];
  const from = revealPresets[preset];
  const target = { ...motionVisible,
    ...(from.clipPath ? { clipPath: preset === "portrait" ? "circle(50% at 50% 50%)" : preset === "mask" ? "inset(-0.15em)" : "inset(0%)" } : {}),
    ...(from.filter ? { filter: "blur(0px)" } : {}),
    ...((from.clipPath || from.filter) ? { transitionEnd: { ...(from.clipPath ? { clipPath: "none" } : {}), ...(from.filter ? { filter: "none" } : {}) } } : {}) };
  return <Component {...props} className={`motion-reveal ${className}`.trim()}
    data-motion-state={visible ? "visible" : "pending"}
    data-motion-instant={reduced || instant || undefined}
    initial={reduced ? false : from} animate={visible ? target : from}
    onViewportEnter={enter} viewport={{ once: true, amount: 0.2 }}
    onFocusCapture={finish}
    transition={{ duration: reduced || instant ? 0 : duration ?? (entrance ? revealTiming.entrance : revealTiming.section), delay: reduced || instant ? 0 : Math.min(delay, 0.56), ease: motionEase }}>
    {children}
  </Component>;
}
