"use client";

import useGlobalStates from "./useGlobalStates";
import useUnsavedChangesGuard from "./useUnsavedChangesGuard";
import useUser from "./useUser";

export default function useGlobals() {
  const states = useGlobalStates();

  const user = useUser();
  const changes = useUnsavedChangesGuard();

  return {
    globalStates: { ...states },
    globalActions: { ...user, ...changes },
  };
}
