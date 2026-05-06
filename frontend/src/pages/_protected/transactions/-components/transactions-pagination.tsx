import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface TransactionsPaginationProps {
  totalCount: number
  currentPage: number
  totalPages: number
  rangeStart: number
  rangeEnd: number
  onPageChange: (page: number) => void
  loading?: boolean
}

export function TransactionsPagination({
  totalCount,
  currentPage,
  totalPages,
  rangeStart,
  rangeEnd,
  onPageChange,
  loading = false
}: TransactionsPaginationProps) {
  const pageButtons = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).filter((page) => page >= currentPage - 1 && page <= currentPage + 1)

  return (
    <div className="px-6 py-4 flex items-center justify-between bg-white border-t border-gray-200">
      {loading ? (
        <Skeleton className="h-5 w-48" />
      ) : (
        <span className="text-gray-700 text-sm">
          {rangeStart} a {rangeEnd} | {totalCount} resultados
        </span>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={loading || currentPage === 1}
          className="size-8 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeftIcon className="size-4" />
        </button>

        {pageButtons.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            disabled={loading}
            className={`size-8 rounded-md border flex items-center justify-center text-sm font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              currentPage === page
                ? 'bg-brand-base border-brand-base text-white'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={loading || currentPage === totalPages}
          className="size-8 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}
