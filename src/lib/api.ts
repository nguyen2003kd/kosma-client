import type { ApiConfig, ApiError, ApiRequestConfig } from "@/types";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  metadata?: { startTime: Date };
}

interface ApiErrorResponse {
  message?: string;
  code?: string;
  details?: Record<string, unknown>;
}

function createApiClient() {
  const config: ApiConfig = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const client = axios.create(config);

  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("auth-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      (config as ExtendedAxiosRequestConfig).metadata = {
        startTime: new Date(),
      };

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log API calls in development
      const endTime = new Date();
      const extendedConfig = response.config as ExtendedAxiosRequestConfig;
      const duration =
        endTime.getTime() -
        (extendedConfig.metadata?.startTime?.getTime() || 0);

      if (process.env.NODE_ENV === "development") {
        console.log(
          `API ${response.config.method?.toUpperCase()} ${
            response.config.url
          } - ${duration}ms`
        );
      }

      return response;
    },
    async (error: AxiosError) => {
      const apiError = handleApiError(error);

      if (apiError.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-token");
          if (!window.location.pathname.includes("/login")) {
            window.location.href = "/login";
          }
        }
      }

      return Promise.reject(apiError);
    }
  );

  return client;
}

export const apiClient = createApiClient();

export function handleApiError(error: AxiosError): ApiError {
  const now = new Date().toISOString();

  if (error.response) {
    const { status, statusText, data } = error.response;
    const errorData = data as ApiErrorResponse;

    return {
      message: errorData?.message || statusText || "An error occurred",
      status,
      statusText,
      code: errorData?.code,
      details: errorData?.details,
      timestamp: now,
    };
  } else if (error.request) {
    return {
      message: "Network error - please check your connection",
      status: 0,
      statusText: "Network Error",
      code: "NETWORK_ERROR",
      timestamp: now,
    };
  } else {
    return {
      message: error.message || "An unexpected error occurred",
      status: 500,
      statusText: "Internal Error",
      code: "UNKNOWN_ERROR",
      timestamp: now,
    };
  }
}

export async function apiRequest<T = unknown>(
  config: ApiRequestConfig
): Promise<T> {
  try {
    const response = await apiClient.request<T>(config);
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
}

export async function apiGet<T = unknown>(
  url: string,
  params?: Record<string, unknown>
): Promise<T> {
  return apiRequest<T>({
    url,
    method: "GET",
    params,
  });
}

export async function apiPost<T = unknown>(
  url: string,
  data?: unknown
): Promise<T> {
  return apiRequest<T>({
    url,
    method: "POST",
    data,
  });
}

export async function apiPut<T = unknown>(
  url: string,
  data?: unknown
): Promise<T> {
  return apiRequest<T>({
    url,
    method: "PUT",
    data,
  });
}

export async function apiPatch<T = unknown>(
  url: string,
  data?: unknown
): Promise<T> {
  return apiRequest<T>({
    url,
    method: "PATCH",
    data,
  });
}

export async function apiDelete<T = unknown>(url: string): Promise<T> {
  return apiRequest<T>({
    url,
    method: "DELETE",
  });
}

export async function uploadFile(
  url: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<{ url: string; filename: string }> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });

    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
}

export async function downloadFile(
  url: string,
  filename: string
): Promise<void> {
  try {
    const response = await apiClient.get(url, {
      responseType: "blob",
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
}

export function createCancelToken() {
  return axios.CancelToken.source();
}

export function isCancelError(error: unknown): boolean {
  return axios.isCancel(error);
}
