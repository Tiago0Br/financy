import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { months } from '@/utils/consts'
import type { Category } from '@/utils/types'

interface TransactionsFiltersProps {
  filters: {
    description?: string
    type?: string
    categoryId?: string
    month?: number
    year?: number
  }
  categories: Category[]
  onChange: (name: string, value: string | number) => void
}

const years = Array.from(
  { length: 5 },
  (_, i) => new Date().getFullYear() - 2 + i
)

export function TransactionsFilters({
  filters,
  categories,
  onChange
}: TransactionsFiltersProps) {
  return (
    <div className="pt-5 pb-6 px-6 flex flex-col lg:flex-row lg:items-end gap-4 bg-white rounded-lg border border-gray-200">
      <div className="w-full lg:max-w-96">
        <Input
          label="Buscar"
          icon={SearchIcon}
          placeholder="Buscar por descrição"
          value={filters.description}
          onChange={(e) => onChange('description', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-end gap-4 w-full lg:w-auto">
        <div className="w-full lg:w-40">
          <Select
            label="Tipo"
            options={[
              { label: 'Todos', value: 'ALL' },
              { label: 'Entrada', value: 'INCOME' },
              { label: 'Saída', value: 'OUTCOME' }
            ]}
            value={filters.type}
            onValueChange={(value) => onChange('type', value)}
          />
        </div>

        <div className="w-full lg:w-48">
          <Select
            label="Categoria"
            options={[
              { label: 'Todas', value: 'ALL' },
              ...categories.map((category) => ({
                label: category.title,
                value: category.id
              }))
            ]}
            value={filters.categoryId}
            onValueChange={(value) => onChange('categoryId', value)}
          />
        </div>

        <div className="w-full lg:w-40">
          <Select
            label="Mês"
            options={months.map((month, index) => ({
              label: month,
              value: String(index)
            }))}
            value={String(filters.month)}
            onValueChange={(value) => onChange('month', Number(value))}
          />
        </div>

        <div className="w-full lg:w-32">
          <Select
            label="Ano"
            options={years.map((year) => ({
              label: String(year),
              value: String(year)
            }))}
            value={String(filters.year)}
            onValueChange={(value) => onChange('year', Number(value))}
          />
        </div>
      </div>
    </div>
  )
}
