
import { useCallback, useState } from 'react'
import type { AIProvider, Message } from '../types/types.ts'
import { useSuggestions } from './useSuggestions.ts'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: 'Hi! Select a model above and ask me anything to get started.'
    }
  ])
  const { loading: sending, error, requestSuggestions, clearError } = useSuggestions()

  const newChat = useCallback(() => {
    setMessages([
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'New chat started. How can I help?'
      }
    ])
    clearError()
  }, [clearError])

  const handleSend = useCallback(
    (prompt: string, provider: AIProvider) => {
      if (!prompt || sending) return

      const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: prompt }
      setMessages((m) => [...m, userMsg])
      clearError()

      requestSuggestions({ prompt, count: 3, provider })
        .then((res) => {
          const formatted = res.suggestions.map((s) => `• ${s}`).join('\n')
          const reply: Message = { id: crypto.randomUUID(), role: 'assistant', content: formatted }
          setMessages((m) => [...m, reply])
        })
        .catch((err: unknown) => {
          console.log(err)
          // Even if the request fails, we should show an error message.
          const reply: Message = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: 'Sorry, I had an issue. Please try again.'
          }
          setMessages((m) => [...m, reply])
        })
    },
    [sending, requestSuggestions, clearError]
  )

  return {
    messages,
    sending,
    error,
    newChat,
    handleSend
  }
}
