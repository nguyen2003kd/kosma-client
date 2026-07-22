/**
 * Custom hooks for permissions UI
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  fetchRoles,
  fetchPermissions,
  fetchRolePermissions,
  createRole as apiCreateRole,
  updateRole as apiUpdateRole,
  deleteRole as apiDeleteRole,
  assignMultiplePermissionsToRole,
  replaceRolePermissions,
  assignRoleToUser,
  type Role as BackendRole,
  type Permission as BackendPermission,
} from '@/lib/permission-utils';
import {
  rolePermissionsToModulePermissions,
  modulePermissionsToBackendPermissionIds,
  MODULE_DEFINITIONS,
} from '@/lib/permission-adapter';
import type { Role, ModulePermission } from '@/types/permissions-page';

/**
 * Fetch all roles with their permissions
 */
export function useRoles() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['permissions-ui', 'roles'],
    queryFn: async () => {
      try {
        const allPermsResponse = await fetchPermissions({ pageSize: 1000 });
        const allBackendPermissions =
          (allPermsResponse.responseData?.rows as BackendPermission[]) || [];

        const rolesResponse = await fetchRoles({ pageSize: 100 });
        const roles = (rolesResponse.responseData?.rows as unknown[]) || [];

        const rolesWithPermissions = await Promise.all(
          roles.map(async (role) => {
            try {
              const r = role as BackendRole;
              if (!r.id) return null;

              const rolePermsResponse = await fetchRolePermissions(r.id);
              const rolePermissions =
                (rolePermsResponse.responseData?.rows as unknown[]) || [];

              const modulePermissions = rolePermissionsToModulePermissions(
                rolePermissions,
                MODULE_DEFINITIONS,
                allBackendPermissions
              );

              const result: Role = {
                id: r.id,
                name: r.name || '',
                description: r.description || '',
                permissions: modulePermissions,
                isSystem: false,
              };

              if (r.created_at) {
                result.createdAt = r.created_at;
              }

              return result;
            } catch {
              const r = role as BackendRole;
              return {
                id: r.id || '',
                name: r.name || '',
                description: r.description || '',
                permissions: [] as ModulePermission[],
                isSystem: false,
              } as Role;
            }
          })
        );

        return rolesWithPermissions.filter((r): r is Role => r !== null);
      } catch (error) {
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    roles: data || [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Fetch all backend permissions
 */
export function useBackendPermissions() {
  return useQuery({
    queryKey: ['permissions-ui', 'backend-permissions'],
    queryFn: async () => {
      const response = await fetchPermissions({ pageSize: 1000 });
      return (response.responseData?.rows as BackendPermission[]) || [];
    },
    staleTime: 1000 * 60 * 10,
  });
}

/**
 * Update role info only (name + description)
 */
export function useUpdateRoleInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      name,
      description,
    }: {
      id: string;
      name: string;
      description: string;
    }) => {
      await apiUpdateRole(id, { name, description });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions-ui', 'roles'] });
      toast.success('Thông tin vai trò đã được cập nhật');
    },
    onError: (error) => {
      console.error('Error updating role:', error);
      toast.error('Có lỗi xảy ra khi cập nhật vai trò');
    },
  });
}

/**
 * Create or update a role (full — name + description + permissions)
 */
export function useSaveRole() {
  const queryClient = useQueryClient();
  const { data: allBackendPermissions } = useBackendPermissions();

  return useMutation({
    mutationFn: async (role: Role) => {
      let roleId: string;
      const isNewRole = role.id.startsWith('role-');

      if (isNewRole) {
        const response = await apiCreateRole({
          name: role.name,
          description: role.description,
        });
        roleId = response.responseData?.id || '';
        if (!roleId) throw new Error('Failed to create role');
      } else {
        roleId = role.id;
      }

      if (allBackendPermissions) {
        const permissionIds = modulePermissionsToBackendPermissionIds(
          role.permissions,
          allBackendPermissions
        );

        if (isNewRole) {
          if (permissionIds.length > 0) {
            await assignMultiplePermissionsToRole(roleId, permissionIds);
          }
        } else {
          await replaceRolePermissions(roleId, permissionIds);
        }
      }

      return roleId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions-ui', 'roles'] });
      toast.success('Vai trò đã được lưu thành công');
    },
    onError: (error) => {
      console.error('Error saving role:', error);
      toast.error('Có lỗi xảy ra khi lưu vai trò');
    },
  });
}

/**
 * Delete a role
 */
export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roleId: string) => {
      await apiDeleteRole(roleId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions-ui', 'roles'] });
      toast.success('Vai trò đã được xóa');
    },
    onError: (error) => {
      console.error('Error deleting role:', error);
      toast.error('Có lỗi xảy ra khi xóa vai trò');
    },
  });
}

/**
 * Assign role to user
 */
export function useAssignRoleToUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, roleId }: { userId: string; roleId: string }) => {
      await assignRoleToUser(userId, roleId, false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['permissions-ui', 'users-with-roles'],
      });
      toast.success('Đã gán vai trò cho người dùng');
    },
    onError: (error) => {
      console.error('Error assigning role:', error);
      toast.error('Có lỗi xảy ra khi gán vai trò');
    },
  });
}
