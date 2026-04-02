import { CATEGORY_CONFIG } from '../types/todo'
import type { Category } from '../types/todo'

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md'
}

export function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const config = CATEGORY_CONFIG[category]
  return (
    <span style={{
      display: 'inline-block',
      padding: size === 'sm' ? '2px 8px' : '4px 12px',
      borderRadius: 6,
      fontSize: size === 'sm' ? 11 : 13,
      fontWeight: 600,
      color: config.color,
      background: config.bg,
      whiteSpace: 'nowrap',
    }}>
      {config.label}
    </span>
  )
}
