import { format } from 'date-fns'
import {
  CircleArrowDownIcon,
  CircleArrowUpIcon,
  SquarePenIcon,
  TrashIcon
} from 'lucide-react'
import { ActionButton } from '@/components/ui/action-button'
import { colorVariants } from '@/utils/consts'
import { getCategoryIcon } from '@/utils/icons'
import type { CategoryColor, Transaction } from '@/utils/types'
import { TransactionRowSkeleton } from './transaction-row-skeleton'

interface TransactionsTableProps {
  transactions: Transaction[]
  onEdit: (transaction: Transaction) => void
  onDelete: (transaction: Transaction) => void
  loading?: boolean
}

export function TransactionsTable({
  transactions,
  onEdit,
  onDelete,
  loading = false
}: TransactionsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-200">
        <thead className="border-b border-gray-200">
          <tr className="text-xs text-gray-500 uppercase">
            <th className="px-6 py-4 font-medium">Descrição</th>
            <th className="px-6 py-4 font-medium">Data</th>
            <th className="px-6 py-4 font-medium">Categoria</th>
            <th className="px-6 py-4 font-medium">Tipo</th>
            <th className="px-6 py-4 font-medium text-right">Valor</th>
            <th className="px-6 py-4 font-medium text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {loading &&
            Array.from({ length: 10 }).map((_, i) => (
              <TransactionRowSkeleton key={`skeleton-${i}`} />
            ))}

          {!loading &&
            transactions.map((transaction) => {
              const Icon = getCategoryIcon(transaction.category.icon)
              const variant =
                colorVariants[transaction.category.color as CategoryColor]
              const isOutcome = transaction.type === 'OUTCOME'

              return (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`size-10 rounded-md ${variant.iconBg} flex justify-center items-center shrink-0`}
                      >
                        <Icon className={`size-4 ${variant.iconText}`} />
                      </div>
                      <span className="text-gray-800 font-medium line-clamp-1">
                        {transaction.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm whitespace-nowrap">
                    {format(new Date(transaction.date), 'dd/MM/yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-xl py-1 px-2 ${variant.tagBg} ${variant.tagText} text-sm whitespace-nowrap`}
                    >
                      {transaction.category.title}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {isOutcome ? (
                      <div className="flex items-center gap-2 font-medium">
                        <CircleArrowDownIcon className="size-4 text-red-base" />
                        <span className="text-red-dark text-sm">Saída</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 font-medium">
                        <CircleArrowUpIcon className="size-4 text-green-base" />
                        <span className="text-green-dark text-sm">Entrada</span>
                      </div>
                    )}
                  </td>
                  <td
                    className={`px-6 py-4 font-semibold text-right whitespace-nowrap ${isOutcome ? 'text-danger' : 'text-success'}`}
                  >
                    {isOutcome ? '-' : '+'}{' '}
                    {transaction.amount.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <ActionButton
                        icon={TrashIcon}
                        variant="danger"
                        onClick={() => onDelete(transaction)}
                      />
                      <ActionButton
                        icon={SquarePenIcon}
                        onClick={() => onEdit(transaction)}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}
