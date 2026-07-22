/**
 * Authentication and user related types
 */

// User roles
export type UserRole = 'admin' | 'moderator' | 'user';

// User status
export type UserStatus = 'active' | 'inactive' | 'banned' | 'pending';

// Base User interface
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: Address;
  preferences?: UserPreferences;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

// User address
export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault?: boolean;
}

// User preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'vi' | 'en';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  marketing: boolean;
}

// Authentication tokens
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  tokenType: 'Bearer';
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Register data
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

// Password reset
export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetData {
  token: string;
  password: string;
  confirmPassword: string;
}

// Change password
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Update profile
export interface UpdateProfileData {
  name?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  avatar?: string;
}

// Auth state
export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Social login providers
export type SocialProvider = 'google' | 'facebook' | 'github' | 'apple';

export interface SocialLoginData {
  provider: SocialProvider;
  token: string;
  userData?: {
    email: string;
    name: string;
    avatar?: string;
  };
}

// Permission system
export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

// Session management
export interface Session {
  id: string;
  userId: string;
  deviceInfo: {
    browser: string;
    os: string;
    device: string;
    ip: string;
  };
  location?: {
    country: string;
    city: string;
  };
  isActive: boolean;
  lastActivity: string;
  createdAt: string;
}

// Auth API responses
export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
  message: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
  verificationRequired?: boolean;
}

// Two-factor authentication
export interface TwoFactorAuth {
  enabled: boolean;
  backupCodes?: string[];
  qrCode?: string;
}

export interface TwoFactorVerifyData {
  token: string;
  code: string;
}