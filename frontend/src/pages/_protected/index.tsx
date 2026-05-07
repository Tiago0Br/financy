import { createFileRoute } from '@tanstack/react-router'
import {
  CircleArrowDownIcon,
  CircleArrowUpIcon,
  WalletIcon
} from 'lucide-react'
import { useState } from 'react'
import type { Transaction } from '@/utils/types'
import { RecentTransactionsTable } from './-components/recent-transactions-table'
import { SummaryCard } from './-components/summary-card'
import { TopCategoriesTable } from './-components/top-categories-table'
import { TransactionModal } from './transactions/-components/transaction-modal'

export const Route = createFileRoute('/_protected/')({
  component: DashboardPage
})

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    description: 'Salário',
    amount: 5000,
    date: new Date().toISOString(),
    type: 'INCOME',
    category: {
      id: '1',
      title: 'Trabalho',
      icon: 'BriefcaseBusiness',
      color: 'green'
    }
  },
  {
    id: '2',
    description: 'Aluguel',
    amount: 1500,
    date: new Date().toISOString(),
    type: 'OUTCOME',
    category: { id: '2', title: 'Casa', icon: 'House', color: 'red' }
  },
  {
    id: '3',
    description: 'Supermercado',
    amount: 450.6,
    date: new Date().toISOString(),
    type: 'OUTCOME',
    category: {
      id: '3',
      title: 'Alimentação',
      icon: 'ShoppingCart',
      color: 'orange'
    }
  },
  {
    id: '4',
    description: 'Freelance',
    amount: 1200,
    date: new Date().toISOString(),
    type: 'INCOME',
    category: {
      id: '1',
      title: 'Trabalho',
      icon: 'BriefcaseBusiness',
      color: 'green'
    }
  },
  {
    id: '5',
    description: 'Internet',
    amount: 100,
    date: new Date().toISOString(),
    type: 'OUTCOME',
    category: { id: '4', title: 'Serviços', icon: 'Mailbox', color: 'blue' }
  }
]

const MOCK_TOP_CATEGORIES = [
  {
    id: '1',
    title: 'Trabalho',
    color: 'green' as const,
    transactionCount: 2,
    totalAmount: 6200
  },
  {
    id: '2',
    title: 'Casa',
    color: 'red' as const,
    transactionCount: 1,
    totalAmount: 1500
  },
  {
    id: '3',
    title: 'Alimentação',
    color: 'orange' as const,
    transactionCount: 1,
    totalAmount: 450.6
  },
  {
    id: '4',
    title: 'Serviços',
    color: 'blue' as const,
    transactionCount: 1,
    totalAmount: 100
  }
]

function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="p-6 md:p-12 flex flex-col gap-8">
      <div className="flex gap-6 justify-center">
        <SummaryCard
          icon={WalletIcon}
          label="Saldo total"
          value="R$ 12.847,32"
          iconClassName="text-purple-base size-5"
        />

        <SummaryCard
          icon={CircleArrowUpIcon}
          label="Receitas do mês"
          value="R$ 4.250,00"
          iconClassName="text-brand-base size-5"
        />

        <SummaryCard
          icon={CircleArrowDownIcon}
          label="Despesas do mês"
          value="R$ 2.180,45"
          iconClassName="text-red-base size-5"
        />
      </div>

      <div className="flex flex-col items-center lg:flex-row gap-8 justify-center lg:items-start">
        <RecentTransactionsTable
          transactions={MOCK_TRANSACTIONS}
          onOpenCreate={() => setIsModalOpen(true)}
        />

        <TopCategoriesTable categories={MOCK_TOP_CATEGORIES} />
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
