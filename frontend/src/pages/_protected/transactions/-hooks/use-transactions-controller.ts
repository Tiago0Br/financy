import { useState } from 'react'
import type { CreateTransactionFormData } from '@/utils/schemas'

export function useTransactionsController() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleOpenCreate() {
    setIsModalOpen(true)
  }

  function onSubmit(data: CreateTransactionFormData) {
    console.log('Submit transaction:', data)
    setIsModalOpen(false)
  }

  return {
    isModalOpen,
    setIsModalOpen,
    handleOpenCreate,
    onSubmit
  }
}
