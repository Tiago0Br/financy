import { useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION
} from '@/lib/graphql/mutations/transactions'
import { getErrorMessage } from '@/utils/get-error-message'
import type {
  CreateTransactionFormData,
  UpdateTransactionFormData
} from '@/utils/schemas'

interface UseTransactionMutationsProps {
  onSuccess?: (type: 'CREATE' | 'UPDATE' | 'DELETE') => void
}

export function useTransactionMutations({
  onSuccess
}: UseTransactionMutationsProps = {}) {
  const [createMutation, { loading: isCreating }] = useMutation<
    unknown,
    { data: CreateTransactionFormData }
  >(CREATE_TRANSACTION, {
    onCompleted() {
      toast.success('Transação cadastrada!')
      onSuccess?.('CREATE')
    },
    onError(error: unknown) {
      toast.error(getErrorMessage(error))
    }
  })

  const [updateMutation, { loading: isUpdating }] = useMutation<
    unknown,
    { data: UpdateTransactionFormData }
  >(UPDATE_TRANSACTION, {
    onCompleted() {
      toast.success('Transação atualizada!')
      onSuccess?.('UPDATE')
    },
    onError(error: unknown) {
      toast.error(getErrorMessage(error))
    }
  })

  const [deleteMutation, { loading: isDeleting }] = useMutation<
    unknown,
    { id: string }
  >(DELETE_TRANSACTION, {
    onCompleted() {
      toast.success('Transação removida!')
      onSuccess?.('DELETE')
    },
    onError(error: unknown) {
      toast.error(getErrorMessage(error))
    }
  })

  async function createTransaction(data: CreateTransactionFormData) {
    await createMutation({
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

  async function updateTransaction(
    id: string,
    data: CreateTransactionFormData
  ) {
    await updateMutation({
      variables: {
        data: {
          id,
          type: data.type,
          description: data.description,
          categoryId: data.categoryId,
          amount: data.amount,
          date: new Date(data.date).toISOString()
        }
      }
    })
  }

  async function deleteTransaction(id: string) {
    await deleteMutation({
      variables: { id }
    })
  }

  return {
    createTransaction,
    updateTransaction,
    deleteTransaction,
    isLoading: isCreating || isUpdating || isDeleting
  }
}
