import { AUTH_URL } from "@env";
import { getDefaultReturnTo } from "./returnTo";

export const CLIENT = "cms";

export const getAuthRedirect = () =>
  `${AUTH_URL}?client=${CLIENT}&returnTo=${encodeURIComponent(getDefaultReturnTo())}`;
