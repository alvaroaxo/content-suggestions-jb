import { useCallback, useState } from 'react'
import {fetchSuggestions, type SuggestionResponseItem} from '../services/suggestions'
import type { AIProvider } from '../types/types.ts'

export type RequestParams = {
  prompt: string
  count: number
  provider: AIProvider
}

export function useSuggestions() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => setError(null), [])

  const requestSuggestions = useCallback(async (params: RequestParams): Promise<SuggestionResponseItem> => {
    setLoading(true)
    setError(null)
    try {
      return  await fetchSuggestions({ ...params })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, error, requestSuggestions, clearError }
}
