import { useMutation, useQuery } from '@apollo/client/react'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION
} from '@/lib/graphql/mutations/transactions'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/category'
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/transactions'
import type {
  CreateTransactionFormData,
  UpdateTransactionFormData
} from '@/utils/schemas'
import type {
  Category,
  PaginatedTransactions,
  Transaction
} from '@/utils/types'
import { useDebounce } from '@/utils/use-debounce'

interface Filters {
  description: string
  type: string
  categoryId: string
  month: number
  year: number
  page: number
}

export function useTransactionsController(initialFilters: Filters) {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null)
  const [transactionToDelete, setTransactionToDelete] =
    useState<Transaction | null>(null)

  const [filters, setFilters] = useState<Filters>(initialFilters)

  const debouncedDescription = useDebounce(filters.description, 500)

  // Sync local state with URL changes (e.g. browser back/forward)
  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  useEffect(() => {
    navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        type: filters.type,
        categoryId: filters.categoryId,
        month: filters.month,
        year: filters.year,
        page: filters.page,
        description: debouncedDescription
      }),
      replace: true
    })
  }, [
    debouncedDescription,
    filters.type,
    filters.categoryId,
    filters.month,
    filters.year,
    filters.page,
    navigate
  ])

  const { data, loading, refetch } = useQuery<{
    listTransactions: PaginatedTransactions
  }>(LIST_TRANSACTIONS, {
    variables: {
      data: {
        description: debouncedDescription || undefined,
        type: filters.type === 'ALL' ? undefined : filters.type,
        categoryId:
          filters.categoryId === 'ALL' ? undefined : filters.categoryId,
        month: filters.month + 1,
        year: filters.year,
        page: filters.page
      }
    }
  })

  const { data: categoriesData } = useQuery<{
    listCategories: Category[]
  }>(LIST_CATEGORIES)

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

  function handleChangeFilters<T extends keyof typeof filters>(
    name: string,
    value: (typeof filters)[T]
  ) {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: name === 'page' ? (value as number) : 1
    }))
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
    transactionData: data?.listTransactions,
    categories: categoriesData?.listCategories ?? [],
    loading,
    filters,
    setFilters,
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
  }
}
