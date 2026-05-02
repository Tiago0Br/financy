import type { ElementType } from 'react'

interface SummaryCardProps {
  icon: ElementType
  value: string | number
  label: string
  iconClassName?: string
}

export function SummaryCard({
  icon: Icon,
  value,
  label,
  iconClassName
}: SummaryCardProps) {
  return (
    <div className="flex-1 max-w-94.5 flex gap-5 bg-white rounded-lg border border-gray-200 p-6">
      <Icon className={`mt-1.5 size-6 ${iconClassName}`} />
      <div className="flex flex-col">
        <strong className="text-[28px] text-gray-800 leading-tight">
          {value}
        </strong>
        <span className="text-xs text-gray-500 uppercase">{label}</span>
      </div>
    </div>
  )
}
