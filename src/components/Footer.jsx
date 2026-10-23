import { ArrowUp } from "lucide-react";

export default function Footer() {
  return <footer className="site-footer">
    <p>© 2026 Mikko E. Pangilinan. All rights reserved.</p>
    <a href="#main-content" className="back-top">Back to top <ArrowUp size={14} aria-hidden="true" /></a>
  </footer>;
}
