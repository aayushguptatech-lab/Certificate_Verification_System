import { useState, useCallback } from 'react'

/**
 * Custom hook for handling API calls with loading and error states
 */
export const useApi = <T,>(
  apiFunction: () => Promise<T>,
  options?: {
    onSuccess?: (data: T) => void
    onError?: (error: Error) => void
    immediate?: boolean
  }
) => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(options?.immediate ?? false)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await apiFunction()
      setData(result)
      options?.onSuccess?.(result)
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      setError(error)
      options?.onError?.(error)
    } finally {
      setIsLoading(false)
    }
  }, [apiFunction, options])

  return { data, isLoading, error, execute }
}
