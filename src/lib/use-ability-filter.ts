/**
 * Permission hooks for the Permission Management page
 */

'use client';

import { useAbility } from '@/hooks/use-ability';

/**
 * role:create → create new role button
 */
export function useCanCreateRole(): boolean {
  const ability = useAbility();
  return ability.can('create', 'role') || ability.can('manage', 'all');
}

/**
 * role:update → edit role name/description button
 */
export function useCanUpdateRole(): boolean {
  const ability = useAbility();
  return ability.can('update', 'role') || ability.can('manage', 'all');
}

/**
 * role:update-permission → edit permissions button
 */
export function useCanUpdateRolePermission(): boolean {
  const ability = useAbility();
  return ability.can('update_permission', 'role') || ability.can('manage', 'all');
}

/**
 * role:add-user → add user to role button
 */
export function useCanAddUserToRole(): boolean {
  const ability = useAbility();
  return ability.can('add_user', 'role') || ability.can('manage', 'all');
}

/**
 * role:delete → delete role
 */
export function useCanDeleteRole(): boolean {
  const ability = useAbility();
  return ability.can('delete', 'role') || ability.can('manage', 'all');
}
