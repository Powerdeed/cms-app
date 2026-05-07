"use client";

import { ReactNode, useState } from "react";

import { globalContext } from "./GlobalContext";
import { User } from "@globals/types/user.type";
import { DEFAULT_UNSAVED_CHANGES_NOTICE } from "../constants/unsavedChangesNotice";

export default function GlobalProvider({ children }: { children: ReactNode }) {
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [unsavedChangesNoticeVisible, setUnsavedChangesNoticeVisible] =
    useState(false);
  const [unsavedChangesNoticeText, setUnsavedChangesNoticeText] = useState(
    DEFAULT_UNSAVED_CHANGES_NOTICE,
  );

  const [user, setUser] = useState<User | null>(null);

  return (
    <globalContext.Provider
      value={{
        unsavedChanges,
        setUnsavedChanges,
        unsavedChangesNoticeVisible,
        setUnsavedChangesNoticeVisible,
        unsavedChangesNoticeText,
        setUnsavedChangesNoticeText,
        user,
        setUser,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}
