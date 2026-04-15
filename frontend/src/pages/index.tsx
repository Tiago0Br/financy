import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IndexPage
})

function IndexPage() {
  return <h1 className="text-blue-500 text-4xl">Financy</h1>
}
