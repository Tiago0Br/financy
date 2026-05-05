import type { CreateTransactionFormData } from '@/utils/schemas'
import { TransactionModal } from './transaction-modal'

interface TransactionsModalsProps {
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  onSubmit: (data: CreateTransactionFormData) => void
}

export function TransactionsModals({
  isModalOpen,
  setIsModalOpen,
  onSubmit
}: TransactionsModalsProps) {
  return (
    <TransactionModal
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      onSubmit={onSubmit}
    />
  )
}
