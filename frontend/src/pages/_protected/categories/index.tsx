import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/categories/')({
  component: CategoriesPage
})

function CategoriesPage() {
  return <h1>Categorias</h1>
}
