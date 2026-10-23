import { Link, useLocation } from "react-router-dom";
import { navigationItems } from "../data/navigation";
import { contact } from "../data/contact";
import { X, ArrowUpRight } from "lucide-react";
import { createPortal } from "react-dom";
import { useRef } from "react";
import useModalFocus from "../hooks/useModalFocus";
import AvailabilityIndicator from "./AvailabilityIndicator";

export default function Sidebar({ isOpen, onClose, returnFocusRef }) {
  const { pathname } = useLocation();
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  useModalFocus({ active: isOpen, panelRef, initialFocusRef: closeRef, returnFocusRef, onClose });
  return createPortal(<div data-modal-root>
    {isOpen && <div className="menu-backdrop" aria-hidden="true" onClick={onClose} />}
    <aside ref={panelRef} id="mobile-navigation" role={isOpen ? "dialog" : undefined} aria-modal={isOpen ? "true" : undefined} aria-label="Mobile navigation" aria-hidden={!isOpen} inert={!isOpen} tabIndex={-1} className={`mobile-menu ${isOpen ? "is-open" : ""}`}>
      <div className="mobile-menu-top"><span>Navigation</span><button type="button" ref={closeRef} className="icon-button" aria-label="Close navigation" onClick={onClose}><X size={24} aria-hidden="true" /></button></div>
      <nav aria-label="Primary navigation" className="mobile-menu-links">
        {navigationItems.map(item => <Link key={item.path} to={item.path} onClick={onClose} aria-current={pathname === item.path || (item.path === "/projects" && pathname.startsWith("/projects/")) ? "page" : undefined}>
          <span>{item.name}</span><ArrowUpRight size={20} aria-hidden="true" />
        </Link>)}
      </nav>
      <div className="mobile-menu-bottom"><AvailabilityIndicator /><div className="mobile-menu-actions"><Link to="/contact" onClick={onClose}>Get in touch <ArrowUpRight size={16} aria-hidden="true" /></Link><a href={contact.resumePath} target="_blank" rel="noopener noreferrer" aria-label="View résumé PDF (opens in a new tab)">Résumé PDF <ArrowUpRight size={16} aria-hidden="true" /></a></div></div>
    </aside>
  </div>, document.body);
}
