import { useEffect } from 'react'

export function useAutoResize(el: HTMLTextAreaElement | null, deps: unknown[] = []) {
  useEffect(() => {
    if (!el) return
    // Reset height to measure natural content height, then clamp.
    el.style.height = '0px'
    const next = Math.min(el.scrollHeight, 200)
    el.style.height = next + 'px'
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

