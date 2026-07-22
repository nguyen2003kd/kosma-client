// Core
import { LoaderCircle } from 'lucide-react'
import { HttpStatusCode, isAxiosError } from 'axios'

// Internal
import { type QueryContainerProps } from './lib'

// Component
export const QueryContainer = <T,>(props: QueryContainerProps<T>) => {
  // Props
  const { query, children, additional } = props
  const { isFetching = false, isError = false, isSuccess = true, error } = additional ?? {}

  // Hooks
  // Template
  if (query.isFetching || isFetching) {
    return <LoaderCircle className='mx-auto animate-spin' />
  }

  if (query.isError || isError) {
    if ([query.error, error].some((error) => isAxiosError(error) && error.status === HttpStatusCode.Forbidden)) {
      return <div>{''}</div>
    }

    if ([query.error, error].some((error) => isAxiosError(error) && error.status === HttpStatusCode.NotFound)) {
      return <div>{''}</div>
    }

    return <div>{''}</div>
  }

  if (query.isSuccess && isSuccess) {
    return children(query.data)
  }

  return null
}

export * from './lib'
