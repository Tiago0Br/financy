import { useMutation, useQuery } from '@apollo/client/react'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpDownIcon, PlusIcon, TagIcon, UtensilsIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { CategoryCard } from '@/components/ui/category-card'
import { CategoryModal } from '@/components/ui/category-modal'
import { Skeleton } from '@/components/ui/skeleton'
import { SummaryCard } from '@/components/ui/summary-card'
import { CREATE_CATEGORY } from '@/lib/graphql/mutations/category'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/category'
import { getCategoryIcon } from '@/utils/icons'
import type { CategoryFormData } from '@/utils/schemas'
import type { Category, CategoryColor } from '@/utils/types'

export const Route = createFileRoute('/_protected/categories/')({
  component: CategoriesPage
})

function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, loading, refetch } = useQuery<{
    listCategories: Category[]
  }>(LIST_CATEGORIES)

  const [createCategory] = useMutation<unknown, { data: CategoryFormData }>(
    CREATE_CATEGORY,
    {
      onCompleted() {
        toast.success('Categoria cadastrada!')
        setIsModalOpen(false)
      },
      onError() {
        toast.error('Não foi possível criar a categoria')
      }
    }
  )

  async function onSubmit(data: CategoryFormData) {
    await createCategory({
      variables: {
        data: {
          title: data.title,
          description: data.description,
          color: data.color,
          icon: data.icon
        }
      }
    })

    await refetch()
  }

  const categories = data?.listCategories ?? []

  return (
    <main className="p-12 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
          <span className="text-gray-600">
            Organize suas transações por categorias
          </span>
        </div>

        <div>
          <CategoryModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            onSubmit={onSubmit}
            trigger={<Button icon={PlusIcon}>Nova categoria</Button>}
          />
        </div>
      </div>

      <div className="flex justify-center gap-6 flex-wrap">
        <SummaryCard
          icon={TagIcon}
          value={categories.length}
          label="Total de categorias"
          iconClassName="text-gray-700"
          isLoading={loading}
        />
        <SummaryCard
          icon={ArrowUpDownIcon}
          value={27}
          label="Total de transações"
          iconClassName="text-purple-base"
          isLoading={loading}
        />
        <SummaryCard
          icon={UtensilsIcon}
          value="Alimentação"
          label="Categoria mais utilizada"
          iconClassName="text-blue-base"
          isLoading={loading}
        />
      </div>

      <div className="flex justify-center flex-wrap gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="w-71 h-48 bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-5"
              >
                <div className="flex justify-between">
                  <Skeleton className="size-10 rounded-md" />
                  <div className="flex gap-2">
                    <Skeleton className="size-8 rounded-md" />
                    <Skeleton className="size-8 rounded-md" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-40" />
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <Skeleton className="h-6 w-20 rounded-xl" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            ))
          : categories.map((category) => (
              <CategoryCard
                key={category.id}
                icon={getCategoryIcon(category.icon)}
                name={category.title}
                description={category.description}
                itemCount={0}
                color={category.color as CategoryColor}
              />
            ))}
      </div>
    </main>
  )
}
