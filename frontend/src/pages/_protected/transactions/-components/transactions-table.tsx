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

interface TransactionsTableProps {
  transactions: Transaction[]
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-200">
        <thead className="border-b border-gray-200">
          <tr className="text-xs text-gray-500 uppercase">
            <th className="px-6 py-4 font-medium">Descrição</th>
            <th className="px-6 py-4 font-medium">Data</th>
            <th className="px-6 py-4 font-medium">Categoria</th>
            <th className="px-6 py-4 font-medium">Tipo</th>
            <th className="px-6 py-4 font-medium">Valor</th>
            <th className="px-6 py-4 font-medium text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            const Icon = getCategoryIcon(transaction.category.icon)
            const variant =
              colorVariants[transaction.category.color as CategoryColor]
            const isExpense = transaction.type === 'EXPENSE'

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
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {transaction.date}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-xl py-1 px-2 ${variant.tagBg} ${variant.tagText} text-sm whitespace-nowrap`}
                  >
                    {transaction.category.name}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {isExpense ? (
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
                  className={`px-6 py-4 font-semibold ${isExpense ? 'text-danger' : 'text-success'}`}
                >
                  {isExpense ? '-' : '+'}{' '}
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
                      onClick={() => {}}
                    />
                    <ActionButton icon={SquarePenIcon} onClick={() => {}} />
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
