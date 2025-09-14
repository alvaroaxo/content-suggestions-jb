import { useRef } from 'react'
import { useAutoResize } from '../hooks/useAutoResize'
import styles from './Composer.module.css'

type Props = {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  disabled: boolean
}

export default function Composer({ value, onChange, onSend, disabled }: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  useAutoResize(textAreaRef.current, [value])

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className={styles.composer}>
      <div className={styles.inner}>
        <textarea
          ref={textAreaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Suggestions about sport topic..."
          rows={1}
          className={styles.textarea}
        />
        <button className={styles.send} disabled={disabled} onClick={onSend}>
          Send
        </button>
      </div>
    </div>
  )
}
