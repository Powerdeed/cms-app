"use client";

import useUser from "./useUser";

export default function useGlobals() {
  const user = useUser();

  return { states: {}, actions: { ...user } };
}
