import type { AIProvider } from '../types/types.ts'
import styles from './Header.module.css'

type Props = {
  model: AIProvider
  onModelChange: (m: AIProvider) => void
  onNewChat: () => void
}

export default function Header({ model, onModelChange, onNewChat }: Props) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>JourBoddy</h1>
      <div className={styles.actions}>
        <label className={styles.modelLabel}>
          <span>Model</span>
          <select
            className={styles.modelSelect}
            aria-label="AI model"
            value={model}
            onChange={(e) => onModelChange(e.target.value as AIProvider)}
          >
            <option value="openai">OpenAI</option>
            <option value="gemini">Gemini</option>
          </select>
        </label>
        <button className={styles.ghost} onClick={onNewChat}>New chat</button>
      </div>
    </header>
  )
}
