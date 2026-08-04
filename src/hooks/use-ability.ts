'use client';

import { useContext } from 'react';
import { AbilityContext } from '@configs/AbilityContext';
import type { AppAbility } from '@configs/acl';

/**
 * Hook to access CASL ability in components
 * @example
 * const ability = useAbility();
 * if (ability.can('view_summary', 'dashboard')) {
 *   // Show dashboard summary
 * }
 */
export const useAbility = (): AppAbility => {
  return useContext(AbilityContext);
};

/**
 * Hook to check permission to perform an action
 * @param action - Action name (e.g., 'view_summary', 'update', 'delete')
 * @param subject - Resource name (e.g., 'dashboard', 'news', 'category')
 * @example
 * const canUpdate = useCan('update', 'news');
 */
export const useCan = (action: string, subject: string): boolean => {
  const ability = useAbility();
  return ability.can(action, subject);
};

/**
 * Hook to check if the user does NOT have permission to perform an action
 * @example
 * const cannotDelete = useCannot('delete', 'news');
 */
export const useCannot = (action: string, subject: string): boolean => {
  const ability = useAbility();
  return ability.cannot(action, subject);
};

/**
 * Hook to check if the user has at least 1 permission in the list
 * @example
 * const canAccessNews = useCanAny(['news:view_detail', 'news:update']);
 */
export const useCanAny = (permissions: string[]): boolean => {
  const ability = useAbility();

  // SuperAdmin check
  if (ability.can('manage', 'all')) return true;

  return permissions.some((permission) => {
    const colonIndex = permission.indexOf(':');
    if (colonIndex === -1) return false;
    const action = permission.substring(colonIndex + 1);
    const subject = permission.substring(0, colonIndex);
    return ability.can(action, subject);
  });
};
