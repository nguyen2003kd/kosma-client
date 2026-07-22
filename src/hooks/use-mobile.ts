// Core
import { useState, useEffect } from 'react'

// Constants
const MOBILE_BREAKPOINT = 1280

// Hook
export const useIsMobile = () => {
  // States
  const [isMobile, setIsMobile] = useState(false)

  // Effects
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)

    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  // Result
  return isMobile
}
