/* eslint-disable no-console */
import { toast } from 'sonner';
import {
  getApiV10Permission,
  postApiV10Permission,
  putApiV10PermissionId,
  deleteApiV10PermissionId,
} from '@/api/endpoints/permission';
import {
  getApiV10Role,
  postApiV10Role,
  putApiV10RoleId,
  deleteApiV10RoleId,
} from '@/api/endpoints/role';
import {
  getApiV10RolePermission,
  postApiV10RolePermissionRoleIdAssign,
  putApiV10RolePermissionRoleIdAssign,
} from '@/api/endpoints/role-permission';
import {
  getApiV10UserRole,
  postApiV10UserRole,
  deleteApiV10UserRoleId,
} from '@/api/endpoints/user-role';
import type { Permission as ApiPermission } from '@/api/models/permission';

// Re-export types
export type { Permission as Permission } from '@/api/models/permission';
export type { Role } from '@/api/models/role';
export type { UserRole } from '@/api/models/userRole';
export type { RolePermission } from '@/api/models/rolePermission';

// =============================================================================
// PERMISSION API HELPERS
// =============================================================================

export async function fetchPermissions(params?: {
  page?: number;
  pageSize?: number;
  filters?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}) {
  return getApiV10Permission(params);
}

export async function createPermission(data: {
  name: string;
  description: string;
  resource: string;
  action: string;
}) {
  const result = await postApiV10Permission(data);
  toast.success('Permission created successfully');
  return result;
}

export async function updatePermission(
  id: string,
  data: {
    name: string;
    description: string;
    resource: string;
    action: string;
  }
) {
  const result = await putApiV10PermissionId(id, data);
  toast.success('Permission updated successfully');
  return result;
}

export async function deletePermission(id: string) {
  const result = await deleteApiV10PermissionId(id);
  toast.success('Permission deleted successfully');
  return result;
}

// =============================================================================
// ROLE API HELPERS
// =============================================================================

export async function fetchRoles(params?: {
  page?: number;
  pageSize?: number;
}) {
  return getApiV10Role(params);
}

export async function createRole(data: { name: string; description: string }) {
  const result = await postApiV10Role(data);
  toast.success('Role created successfully');
  return result;
}

export async function updateRole(
  id: string,
  data: { name: string; description: string }
) {
  const result = await putApiV10RoleId(id, data);
  toast.success('Role updated successfully');
  return result;
}

export async function deleteRole(id: string) {
  const result = await deleteApiV10RoleId(id);
  toast.success('Role deleted successfully');
  return result;
}

// =============================================================================
// ROLE PERMISSION HELPERS
// =============================================================================

export async function fetchRolePermissions(roleId: string) {
  return getApiV10RolePermission({
    filters: `role_id==${roleId}`,
    pageSize: 1000,
  });
}

export async function assignPermissionToRole(
  roleId: string,
  permissionId: string
) {
  return assignMultiplePermissionsToRole(roleId, [permissionId]);
}

export async function bulkAssignPermissionsToRole(
  roleId: string,
  permissionIds: string[]
) {
  const promises = permissionIds.map((permissionId) =>
    assignPermissionToRole(roleId, permissionId)
  );

  try {
    await Promise.all(promises);
    toast.success(`${permissionIds.length} permissions assigned successfully`);
  } catch (error) {
    toast.error('Failed to assign some permissions');
    throw error;
  }
}

export async function assignMultiplePermissionsToRole(
  roleId: string,
  permissionIds: string[]
) {
  if (permissionIds.length === 0) return;

  const result = await postApiV10RolePermissionRoleIdAssign(roleId, {
    permission_ids: permissionIds,
  });
  toast.success(`Đã gán ${permissionIds.length} quyền cho vai trò`);
  return result;
}

export async function replaceRolePermissions(
  roleId: string,
  permissionIds: string[]
) {
  const result = await putApiV10RolePermissionRoleIdAssign(roleId, {
    permission_ids: permissionIds,
  });
  toast.success(`Đã cập nhật ${permissionIds.length} quyền cho vai trò`);
  return result;
}

// =============================================================================
// USER ROLE HELPERS
// =============================================================================

export async function fetchUserRoles(userId: string) {
  return getApiV10UserRole({
    filters: `user_id@=${userId}`,
    pageSize: 100,
  });
}

export async function assignRoleToUser(
  userId: string,
  roleId: string,
  isPrimary = false
) {
  const result = await postApiV10UserRole({
    user_id: userId,
    role_id: roleId,
    is_primary: isPrimary,
  });
  toast.success('Role assigned to user');
  return result;
}

export async function revokeRoleFromUser(userRoleId: string) {
  const result = await deleteApiV10UserRoleId(userRoleId);
  toast.success('Role revoked from user');
  return result;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export function groupPermissionsByResource(permissions: ApiPermission[]) {
  return permissions.reduce((acc, perm) => {
    const resource = perm.resource || 'unknown';
    if (!acc[resource]) {
      acc[resource] = [];
    }
    acc[resource].push(perm);
    return acc;
  }, {} as Record<string, ApiPermission[]>);
}

export function formatPermission(permission: ApiPermission): string {
  return `${permission.resource || 'unknown'}:${permission.action || 'unknown'}`;
}

export function parsePermission(permissionString: string): {
  resource: string;
  action: string;
} | null {
  const [resource, action] = permissionString.split(':');
  if (!resource || !action) return null;
  return { resource, action };
}

export function getUniqueResources(permissions: ApiPermission[]): string[] {
  return Array.from(
    new Set(permissions.map((p) => p.resource).filter((r): r is string => !!r))
  );
}

export function getUniqueActions(permissions: ApiPermission[]): string[] {
  return Array.from(
    new Set(permissions.map((p) => p.action).filter((a): a is string => !!a))
  );
}

export function hasPermission(
  userPermissions: string[],
  resource: string,
  action: string
): boolean {
  return userPermissions.includes(`${resource}:${action}`);
}

export async function getUserPermissionsFromRoles(
  userId: string
): Promise<string[]> {
  try {
    const userRolesData = await fetchUserRoles(userId);
    const userRoles = (userRolesData.responseData?.rows as unknown[]) || [];

    const allPermissions: ApiPermission[] = [];

    for (const userRole of userRoles) {
      const ur = userRole as Record<string, unknown>;
      if (!ur.role_id) continue;

      const rolePermsData = await fetchRolePermissions(ur.role_id as string);
      const rolePermissions = (rolePermsData.responseData?.rows as unknown[]) || [];

      rolePermissions.forEach((rp) => {
        const r = rp as Record<string, unknown>;
        if (r.permission) {
          allPermissions.push(r.permission as ApiPermission);
        }
      });
    }

    const uniquePermissions = Array.from(
      new Map(allPermissions.map((p) => [p.id, p])).values()
    );

    return uniquePermissions.map((p) => formatPermission(p));
  } catch (error) {
    console.error('Error fetching user permissions:', error);
    return [];
  }
}
