import { useQuery } from '@apollo/client/react'
import { useState } from 'react'
import { useTransactionMutations } from '@/hooks/use-transaction-mutations'
import { GET_TOP_CATEGORIES } from '@/lib/graphql/queries/category'
import {
  GET_TRANSACTIONS_STATS,
  LIST_RECENT_TRANSACTIONS
} from '@/lib/graphql/queries/transactions'
import type { CreateTransactionFormData } from '@/utils/schemas'
import type { CategoryColor, Transaction } from '@/utils/types'

interface DashboardStats {
  monthlyIncome: number
  monthlyOutcome: number
  totalBalance: number
}

interface TopCategory {
  category: {
    id: string
    title: string
    color: CategoryColor
  }
  totalAmount: number
  transactionCount: number
}

export function useDashboardController() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    data: statsData,
    loading: statsLoading,
    refetch: refetchStats
  } = useQuery<{
    dashboardStats: DashboardStats
  }>(GET_TRANSACTIONS_STATS)

  const {
    data: recentTransactionsData,
    loading: transactionsLoading,
    refetch: refetchRecent
  } = useQuery<{
    recentTransactions: Transaction[]
  }>(LIST_RECENT_TRANSACTIONS)

  const {
    data: topCategoriesData,
    loading: categoriesLoading,
    refetch: refetchTopCategories
  } = useQuery<{
    topCategories: TopCategory[]
  }>(GET_TOP_CATEGORIES)

  const { createTransaction } = useTransactionMutations({
    onSuccess() {
      setIsModalOpen(false)
      refetchStats()
      refetchRecent()
      refetchTopCategories()
    }
  })

  async function onSubmit(data: CreateTransactionFormData) {
    await createTransaction(data)
  }

  const topCategories =
    topCategoriesData?.topCategories.map((item) => ({
      id: item.category.id,
      title: item.category.title,
      color: item.category.color,
      transactionCount: item.transactionCount,
      totalAmount: item.totalAmount
    })) ?? []

  return {
    stats: statsData?.dashboardStats,
    recentTransactions: recentTransactionsData?.recentTransactions ?? [],
    topCategories,
    loading: statsLoading || transactionsLoading || categoriesLoading,
    isModalOpen,
    setIsModalOpen,
    onSubmit
  }
}
