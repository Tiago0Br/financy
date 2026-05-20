import { useQuery } from '@apollo/client/react'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTransactionMutations } from '@/hooks/use-transaction-mutations'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/category'
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/transactions'
import type { CreateTransactionFormData } from '@/utils/schemas'
import type {
  Category,
  PaginatedTransactions,
  Transaction
} from '@/utils/types'
import { useDebounce } from '@/utils/use-debounce'

interface Filters {
  description?: string
  type?: string
  categoryId?: string
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

  const { createTransaction, updateTransaction, deleteTransaction, isLoading } =
    useTransactionMutations({
      onSuccess() {
        setIsModalOpen(false)
        setIsDeleteModalOpen(false)
        refetch()
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

    await deleteTransaction(transactionToDelete.id)
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
      await updateTransaction(editingTransaction.id, data)
      return
    }

    await createTransaction(data)
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
    isDeleting: isLoading,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    confirmDelete,
    onSubmit
  }
}
