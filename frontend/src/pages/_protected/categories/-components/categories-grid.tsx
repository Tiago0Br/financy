import { getCategoryIcon } from '@/utils/icons'
import type { Category, CategoryColor } from '@/utils/types'
import { CategoryCard } from './category-card'
import { CategoryCardSkeleton } from './category-card-skeleton'

interface CategoriesGridProps {
  categories: Category[]
  loading: boolean
  onOpenEdit: (category: Category) => void
  onOpenDelete: (category: Category) => void
}

export function CategoriesGrid({
  categories,
  loading,
  onOpenEdit,
  onOpenDelete
}: CategoriesGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center flex-wrap gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CategoryCardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex justify-center flex-wrap gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          icon={getCategoryIcon(category.icon)}
          name={category.title}
          description={category.description}
          itemCount={0}
          color={category.color as CategoryColor}
          onEdit={() => onOpenEdit(category)}
          onDelete={() => onOpenDelete(category)}
        />
      ))}
    </div>
  )
}
