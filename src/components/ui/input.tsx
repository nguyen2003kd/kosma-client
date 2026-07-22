// Core
import * as React from 'react'

// App
import { cn } from '@/lib/utils'


// Components
// Input
export type InputProps = React.ComponentProps<'input'>

export const baseInputClassName = `text-ellipsis flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground  
  focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
  disabled:cursor-not-allowed disabled:opacity-50 text-sm`

export const Input = ({ className, type, placeholder, ...props }: InputProps) => {
  // Hooks

  // Template
  return (
    <input
      data-slot='input'
      type={type}
      className={cn(baseInputClassName, className)}
      placeholder={placeholder}
      {...props}
    />
  )
}
