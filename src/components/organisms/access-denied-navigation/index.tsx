"use client"

// Core
import { FC, useEffect } from 'react'
import { toast } from 'sonner'
// App
import { useRouter } from 'next/navigation'
import { BASE_PATHS } from '@constants/path'

// Internal
import { type Props } from './lib'

// Component
export const AccessDeniedNavigation: FC<Props> = () => {
  // Hooks
  const router = useRouter()


  useEffect(() => {
    toast.warning('Không có quyền truy cập', {
      description: 'Bạn sẽ được chuyển về trang chính.'
    })


    router.push(BASE_PATHS.main.path)

  }, [router])

  // Template
  return null
}
