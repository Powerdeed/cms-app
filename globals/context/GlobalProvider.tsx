"use client";

import { ReactNode, useState } from "react";

import { globalContext } from "./GlobalContext";
import { User } from "@globals/types/user.type";

export default function GlobalProvider({ children }: { children: ReactNode }) {
  const [panelActive, setPanelActive] = useState(true);

  const [user, setUser] = useState<User | null>(null);

  return (
    <globalContext.Provider
      value={{ panelActive, setPanelActive, user, setUser }}
    >
      {children}
    </globalContext.Provider>
  );
}
