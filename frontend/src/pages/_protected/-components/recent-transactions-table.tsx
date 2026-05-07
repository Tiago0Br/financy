import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import {
  ChevronRightIcon,
  CircleArrowDownIcon,
  CircleArrowUpIcon,
  PlusIcon
} from 'lucide-react'
import { colorVariants } from '@/utils/consts'
import { getCategoryIcon } from '@/utils/icons'
import type { Transaction } from '@/utils/types'

interface RecentTransactionsTableProps {
  transactions: Transaction[]
  onOpenCreate: () => void
}

export function RecentTransactionsTable({
  transactions,
  onOpenCreate
}: RecentTransactionsTableProps) {
  return (
    <div className="flex-1 bg-white rounded-lg border border-gray-200 flex flex-col min-w-0 max-w-250">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="uppercase text-xs text-gray-500">Transações recentes</h2>
        <Link
          to="/transactions"
          search={(prev) => ({
            ...prev,
            page: 1,
            month: new Date().getMonth(),
            year: new Date().getFullYear()
          })}
          className="text-brand-base hover:text-brand-dark transition-colors text-sm flex gap-1"
        >
          Ver todas
          <ChevronRightIcon className="size-5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <tbody>
            {transactions.map((transaction) => {
              const Icon = getCategoryIcon(transaction.category.icon)
              const variant = colorVariants[transaction.category.color]
              const isIncome = transaction.type === 'INCOME'

              return (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`size-10 rounded-md ${variant.iconBg} flex justify-center items-center shrink-0`}
                      >
                        <Icon className={`size-4 ${variant.iconText}`} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-gray-800 font-medium line-clamp-1">
                          {transaction.description}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {format(new Date(transaction.date), 'dd/MM/yyyy')}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-xl py-1 px-2 ${variant.tagBg} ${variant.tagText} text-sm whitespace-nowrap`}
                    >
                      {transaction.category.title}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 text-right whitespace-nowrap font-semibold ${isIncome ? 'text-success' : 'text-danger'}`}
                  >
                    <div className="flex items-center justify-end gap-2">
                      <span>
                        {isIncome ? '+ ' : '- '}
                        {transaction.amount.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </span>
                      {isIncome ? (
                        <CircleArrowUpIcon className="size-4" />
                      ) : (
                        <CircleArrowDownIcon className="size-4" />
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="p-6 mt-auto flex justify-center border-t border-gray-100">
        <button
          type="button"
          onClick={onOpenCreate}
          className="flex items-center gap-1 text-sm text-brand-base hover:text-brand-dark transition-colors cursor-pointer"
        >
          <PlusIcon className="size-5" />
          Nova transação
        </button>
      </div>
    </div>
  )
}
