/**
 * Types cho hệ thống phân quyền fine-grained
 * Permissions là dynamic theo resource (không cố định view/create/edit/delete)
 */

/**
 * Một permission cụ thể của module với action name động
 * Ví dụ: { view_detail: true, update: false, delete: true, create_post_info: false }
 */
export type ModulePermissions = Record<string, boolean>;

export interface ModulePermission {
  id: string;
  name: string;
  description: string;
  permissions: ModulePermissions;
  availableActions: string[];
}

export interface Role {
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
