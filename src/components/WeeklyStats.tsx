import { useTodoStore } from '../stores/todoStore'
import { CATEGORY_CONFIG } from '../types/todo'
import type { Category } from '../types/todo'

interface WeeklyStatsProps {
  weekKey: string
}

export function WeeklyStats({ weekKey }: WeeklyStatsProps) {
  const getCompletionRate = useTodoStore((s) => s.getCompletionRate)
  const getCategoryStats = useTodoStore((s) => s.getCategoryStats)

  const rate = getCompletionRate(weekKey)
  const stats = getCategoryStats(weekKey)
  const totalTodos = Object.values(stats).reduce((sum, s) => sum + s.total, 0)

  if (totalTodos === 0) return null

  return (
    <div style={{
      margin: '0 20px 8px',
      padding: 16,
      background: 'var(--bg-secondary)',
      borderRadius: 16,
    }}>
      {/* Progress bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
          주간 달성률
        </span>
        <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--toss-blue)' }}>
          {rate}%
        </span>
      </div>

      <div style={{
        height: 8,
        borderRadius: 4,
        background: 'var(--border)',
        overflow: 'hidden',
        marginBottom: 16,
      }}>
        <div style={{
          height: '100%',
          width: `${rate}%`,
          borderRadius: 4,
          background: rate === 100 ? 'var(--toss-green)' : 'var(--toss-blue)',
          transition: 'width 0.3s ease',
        }} />
      </div>

      {/* Category breakdown */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 8,
      }}>
        {(Object.entries(stats) as [Category, { total: number; done: number }][])
          .filter(([, s]) => s.total > 0)
          .map(([cat, s]) => (
            <div key={cat} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
            }}>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: 8,
                background: CATEGORY_CONFIG[cat].color,
                flexShrink: 0,
              }} />
              <span style={{ color: 'var(--text-secondary)' }}>
                {CATEGORY_CONFIG[cat].label}
              </span>
              <span style={{ color: 'var(--text-tertiary)', marginLeft: 'auto' }}>
                {s.done}/{s.total}
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}
