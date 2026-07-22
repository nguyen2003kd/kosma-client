// Core
import { LoaderCircle } from 'lucide-react'

// App
import { cn } from '@/lib/utils'

// Internal
import { type LoadingOverlayProps } from './lib'

// Component
export const LoadingOverlay = (props: LoadingOverlayProps) => {
  // Props
  const { isLoading } = props

  // Template
  return (
    <div
      className={cn(
        `bg-muted/60 absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center transition-[visibility]`,
        isLoading ? 'visible' : 'invisible'
      )}
    >
      <LoaderCircle className='animate-spin' />
    </div>
  )
}

export * from './lib'
