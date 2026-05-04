import type { ElementType } from 'react'
import { cn } from '@/utils/cn'

interface ActionButtonProps {
  icon: ElementType
  onClick?: () => void
  variant?: 'default' | 'danger'
  className?: string
}

export function ActionButton({
  icon: Icon,
  onClick,
  variant = 'default',
  className
}: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'size-8 rounded-md border border-gray-300 flex items-center justify-center transition-colors cursor-pointer hover:bg-gray-50',
        className
      )}
    >
      <Icon
        className={cn(
          'size-4',
          variant === 'danger' ? 'text-danger' : 'text-gray-700'
        )}
      />
    </button>
  )
}
