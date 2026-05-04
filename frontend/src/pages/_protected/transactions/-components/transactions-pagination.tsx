import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

interface TransactionsPaginationProps {
  totalCount: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function TransactionsPagination({
  totalCount,
  currentPage,
  totalPages,
  onPageChange
}: TransactionsPaginationProps) {
  const pageButtons = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).filter((page) => page >= currentPage && page < currentPage + 3)

  const initalPosition = (currentPage - 1) * 10 + 1
  const finalPosition =
    currentPage === totalPages ? totalCount : currentPage * 10

  return (
    <div className="px-6 py-4 flex items-center justify-between bg-white border-t border-gray-200">
      <span className="text-gray-700 text-sm">
        {initalPosition} a {finalPosition} | {totalCount} resultados
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="size-8 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeftIcon className="size-4" />
        </button>

        {pageButtons.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`size-8 rounded-md border flex items-center justify-center text-sm font-medium transition-colors cursor-pointer ${
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
          disabled={currentPage === totalPages}
          className="size-8 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}
