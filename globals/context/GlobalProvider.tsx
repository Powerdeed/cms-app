"use client";

import { ReactNode, useState } from "react";

import { globalContext } from "./GlobalContext";
import { User } from "@globals/types/user.type";

export default function GlobalProvider({ children }: { children: ReactNode }) {
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  const [user, setUser] = useState<User | null>(null);

  return (
    <globalContext.Provider
      value={{ unsavedChanges, setUnsavedChanges, user, setUser }}
    >
      {children}
    </globalContext.Provider>
  );
}
