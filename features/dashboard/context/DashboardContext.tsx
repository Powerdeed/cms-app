"use client";

import { createContext, Dispatch, SetStateAction } from "react";

type DashboardState = {
  visibleCount: number;
  setVisibleCount: Dispatch<SetStateAction<number>>;
};

export const overviewContext = createContext<DashboardState | null>(null);
