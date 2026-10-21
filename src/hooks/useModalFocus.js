import { useLayoutEffect } from "react";

const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Portaled overlays share focus containment, background isolation, and restoration.
export default function useModalFocus({ active, panelRef, initialFocusRef, returnFocusRef, onClose }) {
  useLayoutEffect(() => {
    if (!active) return;
    const panel = panelRef.current;
    if (!panel) return;
    const opener = returnFocusRef?.current || document.activeElement;
    const pathname = window.location.pathname;
    const root = panel.closest('[data-modal-root]');
    const siblings = [...document.body.children].filter(element => element !== root);
    const inertState = siblings.map(element => [element, element.inert]);
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    const controls = () => [...panel.querySelectorAll(focusableSelector)]
      .filter(element => element.tabIndex >= 0 && element.getClientRects().length && !element.closest('[inert]'));
    const focusInitial = () => (initialFocusRef?.current || controls()[0] || panel).focus({ preventScroll: true });

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    focusInitial();
    siblings.forEach(element => { element.inert = true; });

    const onKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      } else if (event.key === 'Tab') {
        const items = controls();
        const first = items[0], last = items.at(-1);
        if (!items.length) { event.preventDefault(); panel.focus(); }
        else if (event.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) {
          event.preventDefault(); first.focus();
        }
      }
    };
    const onFocusIn = event => { if (!panel.contains(event.target)) focusInitial(); };
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('focusin', onFocusIn);

    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('focusin', onFocusIn);
      inertState.forEach(([element, wasInert]) => { element.inert = wasInert; });
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      // Route navigation has its own focus destination; do not override it.
      if (window.location.pathname === pathname && opener?.isConnected && opener.getClientRects().length && !opener.closest('[inert]')) {
        opener.focus({ preventScroll: true });
      }
    };
  }, [active, panelRef, initialFocusRef, returnFocusRef, onClose]);
}
