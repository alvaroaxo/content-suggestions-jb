import { useRef } from 'react'
import type { Message } from '../types/types.ts'
import { useScrollToBottom } from '../hooks/useScrollToBottom'
import styles from './Messages.module.css'

type Props = {
  items: Message[]
  sending: boolean
}

export default function Messages({ items, sending }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  useScrollToBottom(scrollRef, [items, sending])

  return (
    <div className={styles.messages} ref={scrollRef}>
      {items.map((m) => (
        <div key={m.id} className={`${styles.message} ${m.role === 'user' ? styles.user : styles.assistant}`}>
          <div className={styles.avatar} aria-hidden>
            {m.role === 'assistant' ? 'JB' : 'You'}
          </div>
          <div className={styles.bubble}>
            {m.content.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      ))}

      {sending && (
        <div className={`${styles.message} ${styles.assistant}`}>
          <div className={styles.avatar} aria-hidden>AI</div>
          <div className={`${styles.bubble} ${styles.typing}`}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        </div>
      )}
    </div>
  )
}
