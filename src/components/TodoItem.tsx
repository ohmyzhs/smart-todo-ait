import { useState, useRef } from 'react'
import { useTodoStore } from '../stores/todoStore'
import { CategoryBadge } from './CategoryBadge'
import type { Todo } from '../types/todo'

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodoStore()
  const [offsetX, setOffsetX] = useState(0)
  const [swiping, setSwiping] = useState(false)
  const startX = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
    setSwiping(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swiping) return
    const diff = e.touches[0].clientX - startX.current
    if (diff < 0) setOffsetX(Math.max(diff, -80))
  }

  const handleTouchEnd = () => {
    setSwiping(false)
    if (offsetX < -50) {
      deleteTodo(todo.id)
    } else {
      setOffsetX(0)
    }
  }

  return (
    <div
      className="fade-in"
      style={{ position: 'relative', overflow: 'hidden', borderRadius: 12 }}
    >
      {/* Delete background */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 80,
        background: 'var(--toss-red)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 13,
        fontWeight: 600,
        borderRadius: 12,
      }}>
        삭제
      </div>

      {/* Todo card */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 16px',
          background: 'var(--bg)',
          borderRadius: 12,
          border: '1px solid var(--border)',
          transform: `translateX(${offsetX}px)`,
          transition: swiping ? 'none' : 'transform 0.2s ease',
          cursor: 'pointer',
        }}
        onClick={() => toggleTodo(todo.id)}
      >
        {/* Checkbox */}
        <div
          className={todo.completed ? 'check-pop' : ''}
          style={{
            width: 22,
            height: 22,
            borderRadius: 22,
            border: `2px solid ${todo.completed ? 'var(--toss-blue)' : 'var(--toss-gray-300)'}`,
            background: todo.completed ? 'var(--toss-blue)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.15s',
          }}
        >
          {todo.completed && (
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path d="M1 5L4.5 8.5L11 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        {/* Text + category */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: 15,
            fontWeight: 500,
            color: todo.completed ? 'var(--text-tertiary)' : 'var(--text-primary)',
            textDecoration: todo.completed ? 'line-through' : 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {todo.text}
          </p>
        </div>

        <CategoryBadge category={todo.category} />
      </div>
    </div>
  )
}
