'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAbility } from '@/hooks/use-ability';
import { ReactNode, useEffect, useMemo, useState, ReactElement } from 'react';
import useAuthStore from '@stores/auth-store';
import { ROUTE_ACCESS, hasRouteAccess } from '@configs/permissions-matrix';

interface RouteGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

export function RouteGuard({ children, fallback }: RouteGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const ability = useAbility();
  const permissionsFromStore = useAuthStore((state) => state.permissions);
  const userPermissions = useMemo(
    () => permissionsFromStore || [],
    [permissionsFromStore]
  );
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkPermission = () => {
      // SuperAdmin: full access
      if (ability.can('manage', 'all')) {
        setIsChecking(false);
        return;
      }

      // Find matching route (check exact match or parent route)
      let matchedRoute: string | null = null;

      // Check exact match first
      if (ROUTE_ACCESS[pathname]) {
        matchedRoute = pathname;
      } else {
        // Check if current path starts with any registered route prefix
        const sortedRoutes = Object.keys(ROUTE_ACCESS).sort(
          (a, b) => b.length - a.length
        );
        for (const route of sortedRoutes) {
          if (pathname.startsWith(route + '/')) {
            matchedRoute = route;
            break;
          }
        }
      }

      // If no route matched, allow access (unprotected route)
      if (!matchedRoute) {
        setIsChecking(false);
        return;
      }

      const routeRule = ROUTE_ACCESS[matchedRoute];

      // Check if user has at least one required permission for this route
      const hasPermission = hasRouteAccess(userPermissions, routeRule);

      if (!hasPermission) {
        // Find first accessible route, or redirect to /403
        const allowedRoute = Object.entries(ROUTE_ACCESS).find(([, rule]) =>
          hasRouteAccess(userPermissions, rule)
        );

        if (allowedRoute) {
          router.push(allowedRoute[0]);
        } else {
          router.push('/403');
        }
      } else {
        setIsChecking(false);
      }
    };

    checkPermission();
  }, [pathname, ability, router, userPermissions]);

  if (isChecking) {
    return fallback;
  }

  return <>{children}</>;
}
