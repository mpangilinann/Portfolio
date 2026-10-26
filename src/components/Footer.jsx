import { ArrowUp } from "lucide-react";
import { useEffect } from "react";
import { useAnimate } from "framer-motion/mini";
import { useInView } from "framer-motion";
import useReducedMotion from "../hooks/useReducedMotion";
import { motionEase, motionTiming } from "../utils/motion";

export default function Footer() {
  const [scope, animate] = useAnimate();
  const visible = useInView(scope, { once: true, margin: "0px 0px 64px 0px" });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!visible && !reduced) return;
    const animation = animate("[data-footer-reveal]", { opacity: 1, transform: "translateY(0px)" }, { duration: reduced ? 0 : motionTiming.section, ease: motionEase });
    return () => animation.stop();
  }, [visible, reduced, animate]);
  const finishOnFocus = () => {
    scope.current?.querySelectorAll("[data-footer-reveal]").forEach(element => {
      element.style.opacity = "1";
      element.style.transform = "none";
    });
  };
  return <footer ref={scope} className="site-footer" onFocusCapture={finishOnFocus}>
    <p data-footer-reveal>© 2026 Mikko E. Pangilinan. All rights reserved.</p>
    <a data-footer-reveal href="#main-content" className="back-top">Back to top <ArrowUp size={14} aria-hidden="true" /></a>
  </footer>;
}
