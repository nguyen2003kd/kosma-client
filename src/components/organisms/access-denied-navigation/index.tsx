"use client"

// Core
import { FC, useEffect } from 'react'
import { toast } from 'sonner'
// App
import { useRouter } from 'next/navigation'

// Internal
import { type Props } from './lib'

// Component
export const AccessDeniedNavigation: FC<Props> = () => {
  // Hooks
  const router = useRouter()


  useEffect(() => {
    toast.warning('Access denied', {
      description: 'You will be redirected to the main page.'
    })


    router.push('/home')

  }, [router])

  // Template
  return null
}
