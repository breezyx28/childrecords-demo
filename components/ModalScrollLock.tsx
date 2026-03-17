"use client";

import { useEffect } from "react";

const LOCK_ATTR = "data-modal-scroll-lock";

function getScrollbarWidth(): number {
  if (typeof window === "undefined") return 0;
  return window.innerWidth - document.documentElement.clientWidth;
}

function lockBodyScroll() {
  const width = getScrollbarWidth();
  if (width > 0) {
    document.body.style.paddingRight = `${width}px`;
    document.body.setAttribute(LOCK_ATTR, "1");
  }
}

function unlockBodyScroll() {
  document.body.style.paddingRight = "";
  document.body.removeAttribute(LOCK_ATTR);
}

/**
 * Prevents page glitch when opening modals: DaisyUI sets overflow:hidden on :root,
 * which removes the scrollbar and shifts content. We add padding-right equal to
 * the scrollbar width so the layout doesn't jump.
 */
export function ModalScrollLock() {
  useEffect(() => {
    const observed = new Set<HTMLInputElement>();

    function applyPaddingBeforeOpen() {
      if (!document.body.hasAttribute(LOCK_ATTR)) {
        lockBodyScroll();
      }
    }

    function clearPaddingOnClose() {
      const anyChecked = document.querySelector("input.modal-toggle:checked");
      if (!anyChecked) {
        unlockBodyScroll();
      }
    }

    function onDocumentClick(e: MouseEvent) {
      const label = (e.target as HTMLElement)?.closest("label");
      if (!label?.htmlFor) return;
      const controlled = document.getElementById(label.htmlFor);
      if (!controlled?.classList.contains("modal-toggle")) return;
      const input = controlled as HTMLInputElement;
      if (input.checked) {
        setTimeout(clearPaddingOnClose, 0);
      } else {
        applyPaddingBeforeOpen();
      }
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector("input.modal-toggle:checked")) {
        applyPaddingBeforeOpen();
      } else {
        unlockBodyScroll();
      }
    });

    document.addEventListener("click", onDocumentClick, true);

    function observeInputs() {
      document.querySelectorAll<HTMLInputElement>("input.modal-toggle").forEach((el) => {
        if (!observed.has(el)) {
          observed.add(el);
          observer.observe(el, { attributes: true, attributeFilter: ["checked"] });
        }
      });
    }
    observeInputs();
    const interval = setInterval(observeInputs, 1000);

    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      observer.disconnect();
      clearInterval(interval);
      unlockBodyScroll();
    };
  }, []);

  return null;
}
