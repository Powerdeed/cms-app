import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (err) => {
    console.log("INTERCEPTOR ERROR:", err.response);

    if (err.response?.status === 401) {
      // 🔥 token expired / invalid

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(err);
  },
);

api.interceptors.request.use((config) => {
  if (
    typeof FormData !== "undefined" &&
    config.data instanceof FormData &&
    config.headers
  ) {
    delete config.headers["Content-Type"];
    delete config.headers["content-type"];
  }

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
