'use client';

import { useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuthStore, { authStoreName } from '@stores/auth-store';

/**
 * Hook to fetch and sync user permissions
 */
export const useUserPermissions = () => {
  const { email, setStore } = useAuthStore();

  const { data: userRolesData, isLoading: rolesLoading } = useQuery({
    queryKey: ['userRoles', email],
    queryFn: async () => {
      const response = await fetch('/api/v1.0/user/current', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(authStoreName ?? '')}`,
        },
      });
      return response.json();
    },
    enabled: !!email,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (userRolesData?.responseData) {
      const userData = userRolesData.responseData;
      const roles = userData.roles || [];
      const permissions = userData.permissions || [];

      setStore({ roles, permissions });
    }
  }, [userRolesData, setStore]);

  return {
    roles: useAuthStore((state) => state.roles) || [],
    permissions: useAuthStore((state) => state.permissions) || [],
    isLoading: rolesLoading,
  };
};

export const useUserPermissionDetails = (userId?: string) => {
  const fetchPermissionDetails = useCallback(async (uid: string) => {
    try {
      const userRolesResponse = await fetch(
        `/api/v1.0/userRole?filters=user_id@=${uid}&pageSize=100`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(authStoreName ?? '')}`,
          },
        }
      );
      const userRolesData = await userRolesResponse.json();
      const userRoles = userRolesData.responseData?.rows || [];

      const allPermissions: unknown[] = [];
      const roleDetails: unknown[] = [];

      for (const userRole of userRoles) {
        const ur = userRole as Record<string, unknown>;
        if (!ur.role_id) continue;

        roleDetails.push(ur.role);

        const rolePermsResponse = await fetch(
          `/api/v1.0/rolePermission?filters=role_id@=${ur.role_id}&pageSize=100`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(authStoreName ?? '')}`,
            },
          }
        );
        const rolePermsData = await rolePermsResponse.json();
        const rolePermissions = rolePermsData.responseData?.rows || [];

        rolePermissions.forEach(
          (rp: { permission?: { id: string; resource: string; action: string } }) => {
            if (rp.permission) {
              allPermissions.push(rp.permission);
            }
          }
        );
      }

      const uniquePermissions = Array.from(
        new Map(
          allPermissions.map((p) => {
            const perm = p as { id: string; resource: string; action: string };
            return [perm.id, perm];
          })
        ).values()
      );

      const formattedPermissions = uniquePermissions.map((p) => {
        const perm = p as { resource: string; action: string };
        return `${perm.resource}:${perm.action}`;
      });

      return { roles: roleDetails, permissions: uniquePermissions, formattedPermissions };
    } catch (error) {
      console.error('Error fetching permission details:', error);
      return { roles: [], permissions: [], formattedPermissions: [] };
    }
  }, []);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['userPermissionDetails', userId],
    queryFn: () => (userId ? fetchPermissionDetails(userId) : Promise.resolve(null)),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

  return {
    permissionDetails:
      data || { roles: [], permissions: [], formattedPermissions: [] },
    isLoading,
    error,
    refetch,
  };
};
