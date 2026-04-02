import { useTodoStore } from '../stores/todoStore'
import { TodoItem } from './TodoItem'
import { DAY_LABELS } from '../types/todo'

interface TodoListProps {
  weekKey: string
  selectedDay: number
}

export function TodoList({ weekKey, selectedDay }: TodoListProps) {
  const getTodosForDay = useTodoStore((s) => s.getTodosForDay)
  const todos = getTodosForDay(weekKey, selectedDay)

  const pending = todos.filter((t) => !t.completed)
  const completed = todos.filter((t) => t.completed)

  return (
    <div style={{ flex: 1, padding: '0 20px', overflowY: 'auto' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 0 12px',
      }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>
          {DAY_LABELS[selectedDay]}요일
        </h2>
        <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
          {todos.length}개 할일
        </span>
      </div>

      {todos.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '48px 0',
          color: 'var(--text-tertiary)',
        }}>
          <p style={{ fontSize: 32, marginBottom: 8 }}>+</p>
          <p style={{ fontSize: 14 }}>할일을 추가해보세요</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pending.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}

          {completed.length > 0 && (
            <>
              <div style={{
                fontSize: 12,
                color: 'var(--text-tertiary)',
                fontWeight: 600,
                padding: '12px 0 4px',
              }}>
                완료됨 ({completed.length})
              </div>
              {completed.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </>
          )}
        </div>
      )}

      {/* Bottom spacer for FAB */}
      <div style={{ height: 80 }} />
    </div>
  )
}
