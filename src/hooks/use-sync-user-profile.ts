'use client';

import { useEffect } from 'react';
import { useGetApiV10AuthProfile } from '@/api/endpoints/authentication';
import useAuthStore, { authStoreName } from '@stores/auth-store';
import { clearAuthPresenceCookie } from '@/lib/auth-cookie';

const useSyncUserProfile = () => {
  const setStore = useAuthStore((state) => state.setStore);
  const auth = useAuthStore();
  const resetStore = useAuthStore((state) => state.resetStore);
  const token =
    typeof window !== 'undefined' ? localStorage.getItem(authStoreName) : null;
  const { data, error } = useGetApiV10AuthProfile({
    query: {
      enabled: !!(token && auth.email),
    },
  });

  useEffect(() => {
    if (data?.data) {
      setStore({
        email: data.data.email ?? undefined,
        username: data.data.username ?? undefined,
        first_name: undefined,
        last_name: undefined,
        roles: data.data.role ? [data.data.role] : undefined,
        permissions: data.data.permissions ?? undefined,
      });
    }

    if (error) {
      resetStore();
      localStorage.removeItem(authStoreName);
      clearAuthPresenceCookie();
    }
  }, [data, error, setStore, resetStore]);
};

export default useSyncUserProfile;
