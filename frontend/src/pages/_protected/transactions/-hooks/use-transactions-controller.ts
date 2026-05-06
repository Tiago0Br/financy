import { useMutation } from '@apollo/client/react'
import { useState } from 'react'
import { toast } from 'sonner'
import { CREATE_TRANSACTION } from '@/lib/graphql/mutations/transactions'
import type { CreateTransactionFormData } from '@/utils/schemas'

export function useTransactionsController() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [createTransaction] = useMutation<
    unknown,
    { data: CreateTransactionFormData }
  >(CREATE_TRANSACTION, {
    onCompleted() {
      toast.success('Transação cadastrada!')
      setIsModalOpen(false)
    },
    onError() {
      toast.error('Não foi possível criar a transação')
    }
  })

  function handleOpenCreate() {
    setIsModalOpen(true)
  }

  async function onSubmit(data: CreateTransactionFormData) {
    await createTransaction({
      variables: {
        data: {
          type: data.type,
          description: data.description,
          categoryId: data.categoryId,
          amount: data.amount,
          date: new Date(data.date).toISOString()
        }
      }
    })
  }

  return {
    isModalOpen,
    setIsModalOpen,
    handleOpenCreate,
    onSubmit
  }
}
