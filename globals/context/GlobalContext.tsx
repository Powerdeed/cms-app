"use client";

import { User } from "@globals/types/user.type";
import { createContext, Dispatch, SetStateAction } from "react";

export type UnsavedChangesNoticeText = {
  title: string;
  message: string;
};

type GlobalStates = {
  unsavedChanges: boolean;
  setUnsavedChanges: Dispatch<SetStateAction<boolean>>;
  unsavedChangesNoticeVisible: boolean;
  setUnsavedChangesNoticeVisible: Dispatch<SetStateAction<boolean>>;
  unsavedChangesNoticeText: UnsavedChangesNoticeText;
  setUnsavedChangesNoticeText: Dispatch<
    SetStateAction<UnsavedChangesNoticeText>
  >;

  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const globalContext = createContext<GlobalStates | null>(null);
