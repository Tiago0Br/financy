import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IndexPage
})

function IndexPage() {
  return <h1 className="text-4xl text-blue-base">Financy</h1>
}
