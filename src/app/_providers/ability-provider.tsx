'use client';

import { ReactNode, useMemo } from 'react';
import { AbilityContext } from '@configs/AbilityContext';
import { buildAbilityFor } from '@configs/acl';
import useAuthStore from '@stores/auth-store';

interface AbilityProviderProps {
  children: ReactNode;
}


export const AbilityProvider = ({ children }: AbilityProviderProps) => {
  const permissions = useAuthStore((state) => state.permissions) || [];
  const roles = useAuthStore((state) => state.roles) || [];

  const ability = useMemo(() => {
    return buildAbilityFor(permissions, roles);
  }, [permissions, roles]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};
