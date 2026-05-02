import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/transactions/')({
  component: TransactionsPage
})

function TransactionsPage() {
  return <h1>Transações</h1>
}
