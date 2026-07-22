/* eslint-disable no-console */
'use client';

import useAuthStore, { authStoreName } from '@stores/auth-store';

/**
 * Plain utility to clear auth localStorage and reset the auth zustand store.
 * This is NOT a React hook — call `clearAuth()` directly from callbacks or non-component code.
 */
export function clearAuth() {
  try {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(authStoreName);
      } catch (err: unknown) {
        console.warn('Could not remove auth localStorage key', err);
      }
    }
  } finally {
    // reset zustand store state without calling the hook
    try {
      const store = useAuthStore.getState();
      if (store && typeof store.resetStore === 'function') {
        store.resetStore();
      }
    } catch (err: unknown) {
      console.warn('Could not reset auth store', err);
    }
  }
}

/**
 * Hook wrapper for components — returns the same plain function.
 */
export function useClearAuth() {
  return { clearAuth };
}

export default useClearAuth;
