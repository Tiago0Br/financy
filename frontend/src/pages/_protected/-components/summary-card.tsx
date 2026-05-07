import type { ElementType } from 'react'

interface SummaryCardProps {
  icon: ElementType
  label: string
  value: string
  iconClassName?: string
}

export function SummaryCard({
  icon: Icon,
  label,
  value,
  iconClassName
}: SummaryCardProps) {
  return (
    <div className="flex-1 max-w-94.5 p-6 bg-white rounded-lg border border-gray-200 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Icon className={iconClassName} />
        <span className="uppercase text-xs text-gray-500">{label}</span>
      </div>

      <strong className="text-[28px] font-bold text-gray-800">{value}</strong>
    </div>
  )
}
