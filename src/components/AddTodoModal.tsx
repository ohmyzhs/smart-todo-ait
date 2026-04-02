import { useState } from 'react'
import { useTodoStore } from '../stores/todoStore'
import { CATEGORY_CONFIG, DAY_LABELS } from '../types/todo'
import type { Category } from '../types/todo'

interface AddTodoModalProps {
  weekKey: string
  initialDay: number
  onClose: () => void
}

export function AddTodoModal({ weekKey, initialDay, onClose }: AddTodoModalProps) {
  const [text, setText] = useState('')
  const [category, setCategory] = useState<Category>('work')
  const [dayOfWeek, setDayOfWeek] = useState(initialDay)
  const addTodo = useTodoStore((s) => s.addTodo)

  const handleSubmit = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    addTodo(trimmed, category, dayOfWeek, weekKey)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 100,
        }}
      />

      {/* Modal */}
      <div
        className="slide-up"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'var(--bg)',
          borderRadius: '20px 20px 0 0',
          padding: '24px 20px',
          paddingBottom: 'calc(24px + var(--safe-bottom))',
          zIndex: 101,
          maxWidth: 480,
          margin: '0 auto',
        }}
      >
        <div style={{
          width: 36,
          height: 4,
          borderRadius: 2,
          background: 'var(--toss-gray-300)',
          margin: '0 auto 20px',
        }} />

        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
          할일 추가
        </h3>

        {/* Text input */}
        <input
          autoFocus
          placeholder="할일을 입력하세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          style={{
            width: '100%',
            padding: '14px 16px',
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            fontSize: 15,
            marginBottom: 16,
          }}
        />

        {/* Category selector */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
            카테고리
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            {(Object.entries(CATEGORY_CONFIG) as [Category, typeof CATEGORY_CONFIG[Category]][]).map(
              ([key, config]) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    color: category === key ? '#fff' : config.color,
                    background: category === key ? config.color : config.bg,
                    transition: 'all 0.15s',
                  }}
                >
                  {config.label}
                </button>
              )
            )}
          </div>
        </div>

        {/* Day selector */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
            요일
          </p>
          <div style={{ display: 'flex', gap: 6 }}>
            {DAY_LABELS.map((label, i) => (
              <button
                key={i}
                onClick={() => setDayOfWeek(i)}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: dayOfWeek === i ? 700 : 500,
                  color: dayOfWeek === i ? '#fff' : 'var(--text-secondary)',
                  background: dayOfWeek === i ? 'var(--toss-blue)' : 'var(--bg-secondary)',
                  transition: 'all 0.15s',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          style={{
            width: '100%',
            padding: 16,
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 700,
            color: '#fff',
            background: text.trim() ? 'var(--toss-blue)' : 'var(--toss-gray-300)',
            transition: 'background 0.15s',
          }}
        >
          추가하기
        </button>
      </div>
    </>
  )
}
