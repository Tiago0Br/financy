import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/')({
  component: DashboardPage
})

function DashboardPage() {
  return <h1>Financy</h1>
}
