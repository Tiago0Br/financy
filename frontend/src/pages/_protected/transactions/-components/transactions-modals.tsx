import { format } from 'date-fns'
import { AlertDialog } from '@/components/ui/alert-dialog'
import type { CreateTransactionFormData } from '@/utils/schemas'
import type { Transaction } from '@/utils/types'
import { TransactionModal } from './transaction-modal'

interface TransactionsModalsProps {
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  isDeleteModalOpen: boolean
  setIsDeleteModalOpen: (open: boolean) => void
  editingTransaction: Transaction | null
  transactionToDelete: Transaction | null
  isDeleting: boolean
  onSubmit: (data: CreateTransactionFormData) => void
  confirmDelete: () => void
}

export function TransactionsModals({
  isModalOpen,
  setIsModalOpen,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  editingTransaction,
  transactionToDelete,
  isDeleting,
  onSubmit,
  confirmDelete
}: TransactionsModalsProps) {
  return (
    <>
      <TransactionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={onSubmit}
        initialData={
          editingTransaction
            ? {
                type: editingTransaction.type as 'INCOME' | 'OUTCOME',
                description: editingTransaction.description,
                date: format(editingTransaction.date, 'yyyy-MM-dd'),
                amount: editingTransaction.amount,
                categoryId: editingTransaction.category.id
              }
            : undefined
        }
      />

      <AlertDialog
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="Você tem certeza?"
        description={`Esta ação é irreversível e excluirá permanentemente a transação "${transactionToDelete?.description}".`}
        confirmText="Excluir"
        variant="danger"
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      />
    </>
  )
}
