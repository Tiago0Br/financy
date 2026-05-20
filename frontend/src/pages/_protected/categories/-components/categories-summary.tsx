import { ArrowUpDownIcon, TagIcon, UtensilsIcon } from 'lucide-react'
import { SummaryCard } from './summary-card'

interface CategoriesSummaryProps {
  categoriesCount: number
  transactionsCount: number
  mostUsedCategory?: string
  loading: boolean
}

export function CategoriesSummary({
  categoriesCount,
  transactionsCount,
  mostUsedCategory,
  loading
}: CategoriesSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:flex md:justify-center gap-6">
      <SummaryCard
        icon={TagIcon}
        value={categoriesCount}
        label="Total de categorias"
        iconClassName="text-gray-700"
        isLoading={loading}
      />
      <SummaryCard
        icon={ArrowUpDownIcon}
        value={transactionsCount}
        label="Total de transações"
        iconClassName="text-purple-base"
        isLoading={loading}
      />
      <SummaryCard
        icon={UtensilsIcon}
        value={mostUsedCategory ?? '---'}
        label="Categoria mais utilizada"
        iconClassName="text-blue-base"
        isLoading={loading}
      />
    </div>
  )
}
