import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import baseConfig from "../../configs/base";

const mainAxiosInstance = axios.create({
  baseURL: baseConfig.backendDomain,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
mainAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear auth data and redirect to login
      if (typeof window !== "undefined") {
        const isAuthPage =
          window.location.pathname.startsWith("/login") ||
          window.location.pathname.startsWith("/register") ||
          window.location.pathname.startsWith("/forgot-password");

        // Only redirect if not on auth pages
        if (!isAuthPage) {
          localStorage.removeItem("auth-client");
          window.location.href = "/login";
        }
      }
    }

    // Handle other errors
    const errorMessage =
      (error.response?.data as Record<string, unknown>)?.message ||
      error.message ||
      "An unexpected error occurred";

    return Promise.reject({
      status: error.response?.status,
      message: errorMessage,
      data: error.response?.data,
    });
  },
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mainInstance<T = any>(config: AxiosRequestConfig): Promise<T> {
  return mainAxiosInstance(config).then((res) => res.data);
}
