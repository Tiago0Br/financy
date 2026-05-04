import { ArrowUpDownIcon, TagIcon, UtensilsIcon } from 'lucide-react'
import { SummaryCard } from './summary-card'

interface CategoriesSummaryProps {
  categoriesCount: number
  loading: boolean
}

export function CategoriesSummary({
  categoriesCount,
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
  )
}
