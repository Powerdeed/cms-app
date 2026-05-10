"use client";

import useClipboard from "./useClipboard";
import useGlobalStates from "./useGlobalStates";
import useUnsavedChangesGuard from "./useUnsavedChangesGuard";
import useUser from "./useUser";

export default function useGlobals() {
  const states = useGlobalStates();

  const clipboard = useClipboard();
  const user = useUser();
  const changes = useUnsavedChangesGuard();

  return {
    globalStates: { ...states },
    globalActions: { ...user, ...changes, ...clipboard },
  };
}
