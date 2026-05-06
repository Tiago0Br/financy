import { useMutation, useQuery } from '@apollo/client/react'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION
} from '@/lib/graphql/mutations/transactions'
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/transactions'
import type {
  CreateTransactionFormData,
  UpdateTransactionFormData
} from '@/utils/schemas'
import type { Transaction } from '@/utils/types'

export function useTransactionsController() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null)
  const [transactionToDelete, setTransactionToDelete] =
    useState<Transaction | null>(null)

  const { data, loading, refetch } = useQuery<{
    listTransactions: Transaction[]
  }>(LIST_TRANSACTIONS, {
    variables: {
      data: {}
    }
  })

  const [createTransaction] = useMutation<
    unknown,
    { data: CreateTransactionFormData }
  >(CREATE_TRANSACTION, {
    onCompleted() {
      toast.success('Transação cadastrada!')
      setIsModalOpen(false)
      refetch()
    },
    onError() {
      toast.error('Não foi possível criar a transação')
    }
  })

  const [updateTransaction] = useMutation<
    unknown,
    { data: UpdateTransactionFormData }
  >(UPDATE_TRANSACTION, {
    onCompleted() {
      toast.success('Transação atualizada!')
      setIsModalOpen(false)
      refetch()
    },
    onError() {
      toast.error('Não foi possível atualizar a transação')
    }
  })

  const [deleteTransaction, { loading: isDeleting }] = useMutation<
    unknown,
    { id: string }
  >(DELETE_TRANSACTION, {
    onCompleted() {
      toast.success('Transação removida!')
      setIsDeleteModalOpen(false)
      refetch()
    },
    onError() {
      toast.error('Não foi possível remover a transação')
    }
  })

  function handleOpenCreate() {
    setEditingTransaction(null)
    setIsModalOpen(true)
  }

  function handleOpenEdit(transaction: Transaction) {
    setEditingTransaction(transaction)
    setIsModalOpen(true)
  }

  function handleOpenDelete(transaction: Transaction) {
    setTransactionToDelete(transaction)
    setIsDeleteModalOpen(true)
  }

  async function confirmDelete() {
    if (!transactionToDelete) return

    await deleteTransaction({
      variables: {
        id: transactionToDelete.id
      }
    })
  }

  async function onSubmit(data: CreateTransactionFormData) {
    if (editingTransaction) {
      await updateTransaction({
        variables: {
          data: {
            id: editingTransaction.id,
            type: data.type,
            description: data.description,
            categoryId: data.categoryId,
            amount: data.amount,
            date: new Date(data.date).toISOString()
          }
        }
      })
      return
    }

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
    transactions: data?.listTransactions ?? [],
    loading,
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
  }
}
