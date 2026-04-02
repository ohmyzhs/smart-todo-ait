import type { WeekInfo } from '../types/todo'

export function getWeekKey(date: Date): string {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  // ISO week: Monday is first day
  const dayNum = d.getDay() || 7
  d.setDate(d.getDate() + 4 - dayNum)
  const yearStart = new Date(d.getFullYear(), 0, 1)
  const weekNum = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, '0')}`
}

export function getWeekInfo(date: Date): WeekInfo {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  const day = d.getDay()
  const monday = new Date(d)
  monday.setDate(d.getDate() - ((day + 6) % 7))
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  const fmt = (dt: Date) => `${dt.getMonth() + 1}/${dt.getDate()}`

  return {
    weekKey: getWeekKey(date),
    startDate: monday,
    endDate: sunday,
    label: `${fmt(monday)} - ${fmt(sunday)}`,
  }
}

export function getWeekDates(weekInfo: WeekInfo): Date[] {
  const dates: Date[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekInfo.startDate)
    d.setDate(weekInfo.startDate.getDate() + i)
    dates.push(d)
  }
  return dates
}

export function shiftWeek(date: Date, offset: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + offset * 7)
  return d
}

export function isToday(date: Date): boolean {
  const today = new Date()
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}
