import { useEffect } from 'react'
import type { RefObject } from 'react'

export function useScrollToBottom(ref: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
