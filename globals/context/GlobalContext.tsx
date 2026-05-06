"use client";

import { User } from "@globals/types/user.type";
import { createContext, Dispatch, SetStateAction } from "react";

type GlobalStates = {
  unsavedChanges: boolean;
  setUnsavedChanges: Dispatch<SetStateAction<boolean>>;

  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const globalContext = createContext<GlobalStates | null>(null);
