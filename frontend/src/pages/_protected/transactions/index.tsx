import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { TransactionsFilters } from './-components/transactions-filters'
import { TransactionsHeader } from './-components/transactions-header'
import { TransactionsModals } from './-components/transactions-modals'
import { TransactionsPagination } from './-components/transactions-pagination'
import { TransactionsTable } from './-components/transactions-table'
import { useTransactionsController } from './-hooks/use-transactions-controller'

export const Route = createFileRoute('/_protected/transactions/')({
  component: TransactionsPage
})

function TransactionsPage() {
  const {
    transactions,
    isModalOpen,
    setIsModalOpen,
    handleOpenCreate,
    onSubmit
  } = useTransactionsController()
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
