"use client";

import { ReactNode, useState } from "react";

import { globalContext } from "./GlobalContext";

export default function GlobalProvider({ children }: { children: ReactNode }) {
  const [panelActive, setPanelActive] = useState(true);

  return (
    <globalContext.Provider value={{ panelActive, setPanelActive }}>
      {children}
    </globalContext.Provider>
  );
}
