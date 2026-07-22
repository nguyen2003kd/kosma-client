
import { APP_ROUTES, type AppRouteAccessRule } from './app-routes';

export type RouteAccessRule = AppRouteAccessRule;


export const ROUTE_ACCESS: Record<string, RouteAccessRule> = {
  ...APP_ROUTES.reduce<Record<string, RouteAccessRule>>((acc, route) => {
    acc[route.path] = route.access;
    return acc;
  }, {}),
};

type ParsedPermission = {
  resource: string;
  action: string;
};

const parsePermission = (permission: string): ParsedPermission | null => {
  const colonIndex = permission.indexOf(':');
  if (colonIndex === -1) return null;

  const resource = permission.substring(0, colonIndex);
  const action = permission.substring(colonIndex + 1);
  if (!resource || !action) return null;

  return { resource, action };
};
export const hasAnyPermission = (
  userPermissions: string[],
  requiredPermissions: string[]
): boolean => {
  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission)
  );
};
export const hasAnyResourcePermission = (
  userPermissions: string[],
  resources: string[],
  requiredActions?: string[]
): boolean => {
  const resourceSet = new Set(resources);
  const hasActionConstraint = !!requiredActions && requiredActions.length > 0;
  const actionSet = new Set(requiredActions || []);

  return userPermissions.some((permission) => {
    const parsed = parsePermission(permission);
    if (!parsed) return false;
    if (!resourceSet.has(parsed.resource)) return false;
    if (!hasActionConstraint) return true;
    return actionSet.has(parsed.action);
  });
};
export const hasRouteAccess = (
  userPermissions: string[],
  routeRule: RouteAccessRule
): boolean => {
  return hasAnyResourcePermission(
    userPermissions,
    routeRule.resources,
    routeRule.requiredActions
  );
};

/**
 * Lấy danh sach resources user đang có quyền (dùng cho sidebar filter).
 */
export const getAccessibleResources = (
  userPermissions: string[]
): string[] => {
  const resources = userPermissions
    .map(parsePermission)
    .filter((permission): permission is ParsedPermission => permission !== null)
    .map((permission) => permission.resource);

  return Array.from(new Set(resources));
};
