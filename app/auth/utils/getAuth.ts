import type { User } from "../types/user.type";

export const getAuth = () => {
  return {
    token: localStorage.getItem("accessToken"),
    user: JSON.parse(localStorage.getItem("user") || "null") as User | null,
  };
};
