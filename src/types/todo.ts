export type Category = 'work' | 'personal' | 'health' | 'study'

export interface Todo {
  id: string
  text: string
  category: Category
  completed: boolean
  dayOfWeek: number // 0=Sun, 1=Mon, ..., 6=Sat
  weekKey: string // e.g. "2026-W14"
  createdAt: number
}

export interface WeekInfo {
  weekKey: string
  startDate: Date
  endDate: Date
  label: string
}

export const CATEGORY_CONFIG: Record<Category, { label: string; color: string; bg: string }> = {
  work: { label: '업무', color: '#3182F6', bg: '#E8F3FF' },
  personal: { label: '개인', color: '#F97316', bg: '#FFF3E8' },
  health: { label: '건강', color: '#22C55E', bg: '#E8FFE8' },
  study: { label: '학습', color: '#A855F7', bg: '#F3E8FF' },
}

export const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']
