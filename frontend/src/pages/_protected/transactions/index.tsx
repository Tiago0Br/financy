import { createFileRoute } from '@tanstack/react-router'
import { transactionsSearchSchema } from '@/utils/schemas'
import { TransactionsFilters } from './-components/transactions-filters'
import { TransactionsHeader } from './-components/transactions-header'
import { TransactionsModals } from './-components/transactions-modals'
import { TransactionsPagination } from './-components/transactions-pagination'
import { TransactionsTable } from './-components/transactions-table'
import { useTransactionsController } from './-hooks/use-transactions-controller'

export const Route = createFileRoute('/_protected/transactions/')({
  component: TransactionsPage,
  validateSearch: (search) => transactionsSearchSchema.parse(search)
})

function TransactionsPage() {
  const search = Route.useSearch()
  const {
    transactionData,
    categories,
    filters,
    handleChangeFilters,
    isModalOpen,
    setIsModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    editingTransaction,
    transactionToDelete,
    isDeleting,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    confirmDelete,
    onSubmit
  } = useTransactionsController(search)

  return (
    <main className="p-6 md:p-12 flex flex-col gap-8">
      <TransactionsHeader onOpenCreate={handleOpenCreate} />
      <TransactionsFilters
        filters={filters}
        categories={categories}
        onChange={handleChangeFilters}
      />

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <TransactionsTable
          transactions={transactionData?.items ?? []}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
        <TransactionsPagination
          totalCount={transactionData?.totalCount ?? 0}
          currentPage={transactionData?.pageInfo.currentPage ?? 1}
          totalPages={transactionData?.pageInfo.totalPages ?? 1}
          rangeStart={transactionData?.pageInfo.rangeStart ?? 1}
          rangeEnd={transactionData?.pageInfo.rangeEnd ?? 1}
          onPageChange={(page) => handleChangeFilters('page', page)}
        />
      </div>

      <TransactionsModals
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        editingTransaction={editingTransaction}
        transactionToDelete={transactionToDelete}
        isDeleting={isDeleting}
        onSubmit={onSubmit}
        confirmDelete={confirmDelete}
      />
    </main>
  )
}
