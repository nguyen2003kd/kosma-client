import axios, { AxiosError, AxiosRequestConfig,InternalAxiosRequestConfig } from 'axios'
import baseConfig from '../../configs/base'

const fetchAxiosInstance = axios.create({
    baseURL: baseConfig.backendDomain,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})
fetchAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear auth data and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-client');
        window.location.href = '/login'
      }
    }

    // Handle other errors
    const errorMessage = 
      (error.response?.data as Record<string, unknown>)?.message || 
      error.message || 
      'An unexpected error occurred';

    return Promise.reject({
      status: error.response?.status,
      message: errorMessage,
      data: error.response?.data,
    });
  }
);
export function fetchInstance(config: AxiosRequestConfig) {
    return fetchAxiosInstance(config)
}