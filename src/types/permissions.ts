/**
 * Permission System Type Definitions
 * Centralized type definitions for the permission system
 */

// =============================================================================
// PERMISSION TYPES
// =============================================================================

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
  created_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface PermissionMutate {
  name: string;
  description: string;
  resource: string;
  action: string;
}

// =============================================================================
// ROLE TYPES
// =============================================================================

export interface Role {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

export interface RoleMutate {
  name: string;
  description: string;
}

// =============================================================================
// USER ROLE TYPES
// =============================================================================

export interface UserRole {
  id: string;
  user_id: string;
  role_id: string;
  assigned_at: string;
  assigned_by?: string;
  is_primary: boolean;
  updated_at?: string;
  user?: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  role?: Role;
  assigned_by_user?: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}

export interface UserRoleMutate {
  user_id: string;
  role_id: string;
  is_primary?: boolean;
}

// =============================================================================
// ROLE PERMISSION TYPES
// =============================================================================

export interface RolePermission {
  id: string;
  role_id: string;
  permission_id: string;
  created_at: string;
  role?: Role;
  permission?: Permission;
}

export interface RolePermissionMutate {
  role_id: string;
  permission_id: string;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface ApiResponse<T> {
  responseCode: number;
  responseMessage: {
    vi: string;
    en: string;
  };
  responseData: T;
}

// =============================================================================
// CASL ABILITY TYPES
// =============================================================================

export type Actions =
  | 'manage'
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'list';

export type Subjects = string;

export interface ACLObj {
  action: Actions;
  subject: string;
}

// =============================================================================
// PERMISSION FORMAT HELPERS
// =============================================================================

/**
 * Standard permission format: "resource:action"
 * Examples: "user:create", "post:delete", "comment:update"
 */
export type PermissionString = `${string}:${string}`;

export function formatPermissionString(
  resource: string,
  action: string
): PermissionString {
  return `${resource}:${action}`;
}

export function parsePermissionString(
  permissionString: PermissionString
): { resource: string; action: string } | null {
  const [resource, action] = permissionString.split(':');
  if (!resource || !action) return null;
  return { resource, action };
}

// =============================================================================
// TYPE GUARDS
// =============================================================================

export function isPermission(obj: unknown): obj is Permission {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'resource' in obj &&
    'action' in obj
  );
}

export function isRole(obj: unknown): obj is Role {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'description' in obj
  );
}

export function isUserRole(obj: unknown): obj is UserRole {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'user_id' in obj &&
    'role_id' in obj &&
    'is_primary' in obj
  );
}

// =============================================================================
// MODULE PERMISSION TYPES (for UI permission matrix)
// =============================================================================

/**
 * Một permission cụ thể của module với action name động
 * Ví dụ: { view_detail: true, update: false, delete: true, create_post_info: false }
 */
export type ModulePermissions = Record<string, boolean>;

export interface ModulePermission {
  id: string;
  name: string;
  description: string;
  /**
   * Dynamic permissions: key = action name từ API, value = có/không
   * Ví dụ news: { view_detail: true, update: false, delete: false, create_post_info: true }
   */
  permissions: ModulePermissions;
  /**
   * Danh sach tất cả actions có thể có của module này (lấy từ backend)
   */
  availableActions: string[];
}

export interface UserPermission {
  userId: string;
  username: string;
  email: string;
  role: string;
  roleId?: string;
  modules: ModulePermission[];
  customPermissions?: boolean;
}

export interface PermissionTemplate {
  id: string;
  name: string;
  description: string;
  modules: string[];
}

export interface RoleWithPermissions {
  id: string;
  name: string;
  description: string;
  permissions: ModulePermission[];
  createdAt?: string;
  updatedAt?: string;
  isSystem?: boolean;
}

// Types for API response from /api/v1.0/userRole
export interface UserRoleUser {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
}

export interface UserRoleRole {
  id: string;
  name: string;
  description: string;
}

export interface UserRoleItem {
  id: string;
  user_id: string;
  role_id: string;
  assigned_at: string;
  assigned_by: string | null;
  is_primary: boolean | null;
  updated_at: string | null;
  user: UserRoleUser;
  role: UserRoleRole;
  assigned_by_user: unknown | null;
}
