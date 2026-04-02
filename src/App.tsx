import { useState, useCallback } from 'react'
import { WeekNav } from './components/WeekNav'
import { WeeklyStats } from './components/WeeklyStats'
import { TodoList } from './components/TodoList'
import { AddTodoModal } from './components/AddTodoModal'
import { getWeekInfo, shiftWeek } from './utils/date'

export default function App() {
  const [currentDate, setCurrentDate] = useState(() => new Date())
  const [selectedDay, setSelectedDay] = useState(() => new Date().getDay())
  const [showAdd, setShowAdd] = useState(false)

  const weekInfo = getWeekInfo(currentDate)

  const handlePrevWeek = useCallback(() => {
    setCurrentDate((d) => shiftWeek(d, -1))
  }, [])

  const handleNextWeek = useCallback(() => {
    setCurrentDate((d) => shiftWeek(d, 1))
  }, [])

  return (
    <div className="app">
      {/* Header */}
      <header style={{
        padding: '20px 20px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>
          주간 플래너
        </h1>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--toss-blue)',
          background: 'var(--toss-blue-light)',
          padding: '4px 10px',
          borderRadius: 6,
        }}>
          oh-my-zhs
        </span>
      </header>

      {/* Week navigation */}
      <WeekNav
        weekInfo={weekInfo}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
      />

      {/* Weekly stats */}
      <WeeklyStats weekKey={weekInfo.weekKey} />

      {/* Todo list */}
      <TodoList weekKey={weekInfo.weekKey} selectedDay={selectedDay} />

      {/* FAB */}
      <button
        onClick={() => setShowAdd(true)}
        style={{
          position: 'fixed',
          bottom: 'calc(24px + var(--safe-bottom))',
          right: 'calc(50% - 220px)',
          width: 56,
          height: 56,
          borderRadius: 56,
          background: 'var(--toss-blue)',
          color: '#fff',
          fontSize: 28,
          fontWeight: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(49, 130, 246, 0.4)',
          zIndex: 50,
        }}
      >
        +
      </button>

      {/* Add modal */}
      {showAdd && (
        <AddTodoModal
          weekKey={weekInfo.weekKey}
          initialDay={selectedDay}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  )
}
