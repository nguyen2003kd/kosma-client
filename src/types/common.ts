/**
 * Common types used across the application
 */

// Base API response structure
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  error?: string;
  statusCode?: number;
}

// Pagination structure
export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Loading and error states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = unknown> {
  data: T | null;
  loading: LoadingState;
  error: string | null;
}

// Form field types
export interface FormField {
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

// File upload types
export interface FileUpload {
  file: File;
  name: string;
  size: number;
  type: string;
  url?: string;
  progress?: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
}

// Navigation item
export interface NavItem {
  id: string
  name: string
  type: string
  content_type: string
  badge?: string | number
  link: string
  sequence: number
  display?: boolean
  parent_id: string | null
  children?: NavItem[]
}

// SEO metadata
export interface SeoMeta {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string[];
  noIndex?: boolean;
}

// Theme and UI
export type Theme = 'light' | 'dark' | 'system';

export interface DialogState {
  isOpen: boolean;
  title?: string;
  description?: string;
}

// Common props for components
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Date range
export interface DateRange {
  from: Date;
  to: Date;
}

// Generic ID types
export type ID = string | number;

// Action types for reducers/stores
export interface ActionWithPayload<T, P> {
  type: T;
  payload: P;
}

export interface ActionWithoutPayload<T> {
  type: T;
}