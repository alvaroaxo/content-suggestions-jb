import { api } from '../config/api.ts'
import type { AIProvider } from '../types/types.ts'

export type SuggestionRequestItem = {
  prompt: string
  count: number
  provider: AIProvider
}

export type SuggestionResponseItem = {
  topic: string
  count: number
  provider: string
  suggestions: string[]
}

export async function fetchSuggestions(
  payload: SuggestionRequestItem
): Promise<SuggestionResponseItem> {
  const data: SuggestionResponseItem = await api.post('/suggestions', payload )
  return data
}
