"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { globalContext } from "@globals/context/GlobalContext";

const NOTICE_DURATION = 3500;

export default function useUnsavedChangesGuard() {
  const globalStates = useContext(globalContext);
  const [noticeVisible, setNoticeVisible] = useState(false);
  const noticeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const guardedHistoryUrlRef = useRef("");

  if (!globalStates) {
    throw new Error("Global Context context must be within a provider.");
  }

  const hasUnsavedChanges = !globalStates.unsavedChanges;

  const showNotice = useCallback(() => {
    if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current);

    setNoticeVisible(true);
    noticeTimeoutRef.current = setTimeout(() => {
      setNoticeVisible(false);
    }, NOTICE_DURATION);
  }, []);

  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  useEffect(() => {
    if (!hasUnsavedChanges) return;

    if (guardedHistoryUrlRef.current !== window.location.href) {
      window.history.pushState(
        { ...window.history.state, unsavedChangesGuard: true },
        "",
        window.location.href,
      );
      guardedHistoryUrlRef.current = window.location.href;
    }

    const handlePopState = () => {
      showNotice();
      window.history.pushState(
        { ...window.history.state, unsavedChangesGuard: true },
        "",
        window.location.href,
      );
      guardedHistoryUrlRef.current = window.location.href;
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hasUnsavedChanges, showNotice]);

  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || anchor.target === "_blank") return;

      const nextUrl = new URL(anchor.href, window.location.href);
      const currentUrl = new URL(window.location.href);

      if (nextUrl.href === currentUrl.href) return;

      event.preventDefault();
      event.stopPropagation();
      showNotice();
    };

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [hasUnsavedChanges, showNotice]);

  useEffect(() => {
    return () => {
      if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current);
    };
  }, []);

  return {
    hasUnsavedChanges,
    noticeVisible,
    showNotice,
    hideNotice: () => setNoticeVisible(false),
  };
}
