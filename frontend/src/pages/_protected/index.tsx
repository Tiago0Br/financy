import { createFileRoute } from '@tanstack/react-router'
import {
  CircleArrowDownIcon,
  CircleArrowUpIcon,
  WalletIcon
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { RecentTransactionsTable } from './-components/recent-transactions-table'
import { SummaryCard } from './-components/summary-card'
import { TopCategoriesTable } from './-components/top-categories-table'
import { useDashboardController } from './-hooks/use-dashboard-controller'
import { TransactionModal } from './transactions/-components/transaction-modal'

export const Route = createFileRoute('/_protected/')({
  component: DashboardPage
})

function DashboardPage() {
  const {
    stats,
    recentTransactions,
    topCategories,
    loading,
    isModalOpen,
    setIsModalOpen
  } = useDashboardController()

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  return (
    <main className="p-6 md:p-12 flex flex-col gap-8">
      <div className="flex gap-6 justify-center">
        <SummaryCard
          icon={WalletIcon}
          label="Saldo total"
          value={
            loading ? (
              <Skeleton className="h-9 w-32" />
            ) : (
              formatCurrency(stats?.totalBalance ?? 0)
            )
          }
          iconClassName="text-purple-base size-5"
        />

        <SummaryCard
          icon={CircleArrowUpIcon}
          label="Receitas do mês"
          value={
            loading ? (
              <Skeleton className="h-9 w-32" />
            ) : (
              formatCurrency(stats?.monthlyIncome ?? 0)
            )
          }
          iconClassName="text-brand-base size-5"
        />

        <SummaryCard
          icon={CircleArrowDownIcon}
          label="Despesas do mês"
          value={
            loading ? (
              <Skeleton className="h-9 w-32" />
            ) : (
              formatCurrency(stats?.monthlyOutcome ?? 0)
            )
          }
          iconClassName="text-red-base size-5"
        />
      </div>

      <div className="flex flex-col items-center lg:flex-row gap-8 justify-center lg:items-start">
        <RecentTransactionsTable
          transactions={recentTransactions}
          onOpenCreate={() => setIsModalOpen(true)}
        />

        <TopCategoriesTable categories={topCategories} />
      </div>

      <TransactionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={(data) => {
          console.log(data)
          setIsModalOpen(false)
        }}
      />
    </main>
  )
}
