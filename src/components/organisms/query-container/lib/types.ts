// Core
import { ReactNode } from 'react'
import { UseQueryResult } from '@tanstack/react-query'

// Types
export interface QueryContainerProps<T> {
  query: UseQueryResult<T>
  children: (data: T) => ReactNode
  additional?: {
    isFetching?: boolean
    isError?: boolean
    isSuccess?: boolean
    error?: Error | null
  }
}
