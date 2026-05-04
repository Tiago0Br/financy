import type { ElementType } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface SummaryCardProps {
  icon: ElementType
  value: string | number
  label: string
  iconClassName?: string
  isLoading?: boolean
}

export function SummaryCard({
  icon: Icon,
  value,
  label,
  iconClassName,
  isLoading
}: SummaryCardProps) {
  return (
    <div className="flex-1 max-w-94.5 flex gap-5 bg-white rounded-lg border border-gray-200 p-6">
      {isLoading ? (
        <>
          <Skeleton className="mt-1.5 size-6 shrink-0" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </>
      ) : (
        <>
          <Icon className={`mt-1.5 size-6 shrink-0 ${iconClassName}`} />
          <div className="flex flex-col">
            <strong className="text-[28px] text-gray-800 leading-tight">
              {value}
            </strong>
            <span className="text-xs text-gray-500 uppercase">{label}</span>
          </div>
        </>
      )}
    </div>
  )
}
