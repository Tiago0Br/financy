import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { Transaction } from '@/utils/types'
import { TransactionsFilters } from './-components/transactions-filters'
import { TransactionsHeader } from './-components/transactions-header'
import { TransactionsPagination } from './-components/transactions-pagination'
import { TransactionsTable } from './-components/transactions-table'
import { useTransactionsController } from './-hooks/use-transactions-controller'
import { TransactionsModals } from './-components/transactions-modals'

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
  const { isModalOpen, setIsModalOpen, handleOpenCreate, onSubmit } =
    useTransactionsController()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(transactions.length / itemsPerPage)

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <main className="p-6 md:p-12 flex flex-col gap-8">
      <TransactionsHeader onOpenCreate={handleOpenCreate} />
      <TransactionsFilters />

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <TransactionsTable transactions={paginatedTransactions} />
        <TransactionsPagination
          totalCount={transactions.length}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <TransactionsModals
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onSubmit={onSubmit}
      />
    </main>
  )
}
