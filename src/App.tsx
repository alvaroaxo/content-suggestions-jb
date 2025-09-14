import { useMemo, useState } from 'react'
import styles from './App.module.css'
import type { AIProvider } from './types/types.ts'
import Header from './components/Header'
import Messages from './components/Messages'
import Composer from './components/Composer'
import { useChat } from './hooks/useChat.ts'

function App() {
  const [model, setModel] = useState<AIProvider>('openai')
  const [input, setInput] = useState('')
  const { messages, sending, error, newChat, handleSend } = useChat()

  const canSend = useMemo(() => input.trim().length > 0 && !sending, [input, sending])

  const onSend = () => {
    handleSend(input, model)
    setInput('')
  }

  const onNewChat = () => {
    newChat()
    setInput('')
  }

  return (
    <div className={styles.app}>
      <main className={styles.chat}>
        <Header model={model} onModelChange={setModel} onNewChat={onNewChat} />
        {error && (
          <div className={styles.errorBanner} role="status">
            {error}
          </div>
        )}
        <Messages items={messages} sending={sending} />
        <Composer value={input} onChange={setInput} onSend={onSend} disabled={!canSend} />
      </main>
    </div>
  )
}

export default App
