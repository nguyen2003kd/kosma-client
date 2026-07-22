// Core
import { useRef, useEffect } from 'react'

// Hook
const useInitialEffectSkipper = (callback: CallableFunction, deps: unknown[]) => {
  // Refs
  const isInitialRenderRef = useRef(true)

  // Effects
  useEffect(() => {
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false
      return
    }
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useInitialEffectSkipper
