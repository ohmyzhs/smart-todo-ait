import { getWeekDates, isToday } from '../utils/date'
import { DAY_LABELS } from '../types/todo'
import type { WeekInfo } from '../types/todo'

interface WeekNavProps {
  weekInfo: WeekInfo
  selectedDay: number
  onSelectDay: (day: number) => void
  onPrevWeek: () => void
  onNextWeek: () => void
}

export function WeekNav({ weekInfo, selectedDay, onSelectDay, onPrevWeek, onNextWeek }: WeekNavProps) {
  const dates = getWeekDates(weekInfo)

  return (
    <div style={{ padding: '16px 20px 8px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <button onClick={onPrevWeek} style={{ padding: 8, fontSize: 18 }}>{'<'}</button>
        <span style={{
          fontSize: 15,
          fontWeight: 600,
          color: 'var(--text-primary)',
        }}>
          {weekInfo.label}
        </span>
        <button onClick={onNextWeek} style={{ padding: 8, fontSize: 18 }}>{'>'}</button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 4,
      }}>
        {dates.map((date, i) => {
          // Monday-based: dates[0]=Mon(1), dates[6]=Sun(0)
          const dayOfWeek = (i + 1) % 7
          const today = isToday(date)
          const selected = dayOfWeek === selectedDay
          return (
            <button
              key={i}
              onClick={() => onSelectDay(dayOfWeek)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: '8px 0',
                borderRadius: 12,
                background: selected ? 'var(--toss-blue)' : today ? 'var(--toss-blue-light)' : 'transparent',
                color: selected ? '#fff' : dayOfWeek === 0 ? 'var(--toss-red)' : dayOfWeek === 6 ? 'var(--toss-blue)' : 'var(--text-primary)',
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 500, opacity: 0.7 }}>
                {DAY_LABELS[dayOfWeek]}
              </span>
              <span style={{ fontSize: 15, fontWeight: selected ? 700 : 500 }}>
                {date.getDate()}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
