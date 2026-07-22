/**
 * API related types and interfaces
 */

import type { PaginationParams, PaginatedResponse } from './common';

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// API Configuration
export interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
  withCredentials: boolean;
}

// Request configuration
export interface ApiRequestConfig {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  data?: unknown;
  timeout?: number;
  signal?: AbortSignal;
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  statusText: string;
  code?: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

// Validation errors
export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: unknown;
}

export interface ValidationErrorResponse {
  message: string;
  errors: ValidationError[];
  status: 422;
}

// API Response wrapper
export interface ApiSuccessResponse<T = unknown> {
  data: T;
  message: string;
  success: true;
  timestamp: string;
  requestId?: string;
}

export interface ApiErrorResponse {
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
  success: false;
  status: number;
  timestamp: string;
  requestId?: string;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

// Query parameters
export interface QueryParams extends Record<string, unknown> {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  fields?: string[];
  include?: string[];
  filter?: Record<string, unknown>;
}

// File upload
export interface FileUploadConfig {
  maxSize: number; // in bytes
  allowedTypes: string[];
  multiple: boolean;
  field: string;
}

export interface UploadResponse {
  url: string;
  filename: string;
  originalName: string;
  size: number;
  mimeType: string;
  path: string;
}

// Webhook types
export interface WebhookPayload {
  id: string;
  event: string;
  data: unknown;
  timestamp: string;
  signature: string;
}

// Rate limiting
export interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

// Cache control
export interface CacheConfig {
  ttl: number; // Time to live in seconds
  staleWhileRevalidate?: number;
  maxAge?: number;
  swr?: boolean;
}

// API client state
export interface ApiClientState {
  isOnline: boolean;
  pendingRequests: number;
  lastError: ApiError | null;
  retryCount: number;
}

// Retry configuration
export interface RetryConfig {
  attempts: number;
  delay: number;
  exponential: boolean;
  maxDelay: number;
  retryCondition?: (error: ApiError) => boolean;
}

// Interceptor types
export interface RequestInterceptor {
  onRequest?: (config: ApiRequestConfig) => ApiRequestConfig | Promise<ApiRequestConfig>;
  onRequestError?: (error: unknown) => unknown;
}

export interface ResponseInterceptor {
  onResponse?: <T>(response: ApiSuccessResponse<T>) => ApiSuccessResponse<T> | Promise<ApiSuccessResponse<T>>;
  onResponseError?: (error: ApiError) => ApiError | Promise<ApiError>;
}

// Specific API endpoint types
export interface HealthCheckResponse {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
  version: string;
  services: Record<string, 'healthy' | 'unhealthy'>;
}

// Search API
export interface SearchRequest {
  query: string;
  filters?: Record<string, unknown>;
  sort?: string;
  pagination?: PaginationParams;
}

export interface SearchResponse<T> extends PaginatedResponse<T> {
  query: string;
  took: number; // Search time in ms
  suggestions?: string[];
}

// Bulk operations
export interface BulkOperationRequest<T> {
  operation: 'create' | 'update' | 'delete';
  data: T[];
  options?: {
    skipValidation?: boolean;
    continueOnError?: boolean;
  };
}

export interface BulkOperationResponse {
  processed: number;
  successful: number;
  failed: number;
  errors?: Array<{
    index: number;
    error: string;
  }>;
}

// Real-time updates
export interface WebSocketMessage {
  type: string;
  payload: unknown;
  timestamp: string;
  id: string;
}

export interface SubscriptionConfig {
  channel: string;
  events?: string[];
  filters?: Record<string, unknown>;
}

// Export/Import
export interface ExportRequest {
  format: 'csv' | 'xlsx' | 'json' | 'pdf';
  filters?: Record<string, unknown>;
  fields?: string[];
}

export interface ExportResponse {
  downloadUrl: string;
  filename: string;
  expiresAt: string;
  size: number;
}