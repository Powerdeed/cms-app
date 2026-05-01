"use client";

import { createContext, Dispatch, SetStateAction } from "react";

type GlobalStates = {
  panelActive: boolean;
  setPanelActive: Dispatch<SetStateAction<boolean>>;
};

export const globalContext = createContext<GlobalStates | null>(null);
