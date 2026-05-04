import { createFileRoute } from '@tanstack/react-router'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleArrowDownIcon,
  CircleArrowUpIcon,
  PlusIcon,
  SearchIcon,
  SquarePenIcon,
  TrashIcon
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { colorVariants } from '@/utils/consts'
import { getCategoryIcon } from '@/utils/icons'
import type { CategoryColor, Transaction } from '@/utils/types'

export const Route = createFileRoute('/_protected/transactions/')({
  component: TransactionsPage
})

const transactions: Transaction[] = [
  {
    id: '1',
    description: 'Salário Mensal',
    date: '04/05/26',
    category: { name: 'Trabalho', color: 'green', icon: 'BriefcaseBusiness' },
    type: 'INCOME',
    amount: 5000
  },
  {
    id: '2',
    description: 'Aluguel Casa',
    date: '05/05/26',
    category: { name: 'Casa', color: 'blue', icon: 'House' },
    type: 'EXPENSE',
    amount: 1500
  },
  {
    id: '3',
    description: 'Supermercado',
    date: '06/05/26',
    category: { name: 'Alimentação', color: 'orange', icon: 'ShoppingCart' },
    type: 'EXPENSE',
    amount: 850.5
  },
  {
    id: '4',
    description: 'Freelance Design',
    date: '07/05/26',
    category: { name: 'Trabalho', color: 'green', icon: 'BriefcaseBusiness' },
    type: 'INCOME',
    amount: 1200
  },
  {
    id: '5',
    description: 'Restaurante Japa',
    date: '08/05/26',
    category: { name: 'Alimentação', color: 'orange', icon: 'Utensils' },
    type: 'EXPENSE',
    amount: 150
  },
  {
    id: '6',
    description: 'Cinema',
    date: '10/05/26',
    category: { name: 'Lazer', color: 'purple', icon: 'Ticket' },
    type: 'EXPENSE',
    amount: 60
  },
  {
    id: '7',
    description: 'Gasolina',
    date: '11/05/26',
    category: { name: 'Transporte', color: 'yellow', icon: 'CarFront' },
    type: 'EXPENSE',
    amount: 250
  },
  {
    id: '8',
    description: 'Academia',
    date: '12/05/26',
    category: { name: 'Saúde', color: 'pink', icon: 'Dumbbell' },
    type: 'EXPENSE',
    amount: 110
  },
  {
    id: '9',
    description: 'Venda de Celular',
    date: '15/05/26',
    category: { name: 'Vendas', color: 'green', icon: 'PiggyBank' },
    type: 'INCOME',
    amount: 2000
  },
  {
    id: '10',
    description: 'Assinatura Netflix',
    date: '16/05/26',
    category: { name: 'Lazer', color: 'purple', icon: 'Ticket' },
    type: 'EXPENSE',
    amount: 55.9
  },
  {
    id: '11',
    description: 'Internet Fibra',
    date: '17/05/26',
    category: { name: 'Casa', color: 'blue', icon: 'House' },
    type: 'EXPENSE',
    amount: 99.9
  },
  {
    id: '12',
    description: 'Conta de Luz',
    date: '18/05/26',
    category: { name: 'Casa', color: 'blue', icon: 'House' },
    type: 'EXPENSE',
    amount: 180.5
  },
  {
    id: '13',
    description: 'Venda de Roupas',
    date: '20/05/26',
    category: { name: 'Vendas', color: 'green', icon: 'PiggyBank' },
    type: 'INCOME',
    amount: 350
  },
  {
    id: '14',
    description: 'Seguro Carro',
    date: '22/05/26',
    category: { name: 'Transporte', color: 'yellow', icon: 'CarFront' },
    type: 'EXPENSE',
    amount: 1200
  },
  {
    id: '15',
    description: 'Livros',
    date: '25/05/26',
    category: { name: 'Educação', color: 'purple', icon: 'BookOpen' },
    type: 'EXPENSE',
    amount: 150
  }
]

function TransactionsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(transactions.length / itemsPerPage)

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const pageButtons = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).filter((page) => page >= currentPage && page < currentPage + 3)

  return (
    <main className="p-6 md:p-12 flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">Transações</h1>
          <span className="text-gray-600">
            Gerencie todas as suas transações financeiras
          </span>
        </div>

        <div className="w-full sm:w-auto">
          <Button icon={PlusIcon} className="w-full sm:w-auto">
            Nova transação
          </Button>
        </div>
      </div>

      <div className="pt-5 pb-6 px-6 flex justify-center gap-4 bg-white rounded-lg border border-gray-200">
        <Input
          label="Buscar"
          icon={SearchIcon}
          placeholder="Buscar por descrição"
        />
        <Input label="Tipo" placeholder="Tipo" />
        <Input label="Categoria" placeholder="Categoria" />
        <Input label="Período" placeholder="Período" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
              {paginatedTransactions.map((transaction) => {
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
                          <span className="text-green-dark text-sm">
                            Entrada
                          </span>
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
                        <button
                          type="button"
                          className="size-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <TrashIcon className="size-4 text-danger" />
                        </button>
                        <button
                          type="button"
                          className="size-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <SquarePenIcon className="size-4 text-gray-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 flex items-center justify-between bg-white border-t border-gray-200">
          <span className="text-gray-700 text-sm">
            Total de {transactions.length} registros
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="size-8 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeftIcon className="size-4" />
            </button>

            {pageButtons.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="size-8 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRightIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
