"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { logOutUser } from "@app/login/services/authUser";
import { ApiError } from "@lib/api/utils/apiError";

export default function useNav() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [profileOptions, setProfileOptions] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);

  const handleLogout = async () => {
    try {
      await logOutUser();

      localStorage.clear();

      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        console.error(err.message);
      }
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    profileOptions,
    openNotifications,
    setOpenNotifications,
    setProfileOptions,
    handleLogout,
  };
}
