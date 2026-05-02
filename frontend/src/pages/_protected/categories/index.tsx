import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowUpDownIcon,
  PlusIcon,
  TagIcon,
  TicketIcon,
  UtensilsIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CategoryCard } from '@/components/ui/category-card'
import { CategoryModal } from '@/components/ui/category-modal'
import { SummaryCard } from '@/components/ui/summary-card'

export const Route = createFileRoute('/_protected/categories/')({
  component: CategoriesPage
})

function CategoriesPage() {
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
            onSubmit={(data) => console.log(data)}
            trigger={<Button icon={PlusIcon}>Nova categoria</Button>}
          />
        </div>
      </div>

      <div className="flex justify-center gap-6 flex-wrap">
        <SummaryCard
          icon={TagIcon}
          value={8}
          label="Total de categorias"
          iconClassName="text-gray-700"
        />
        <SummaryCard
          icon={ArrowUpDownIcon}
          value={27}
          label="Total de transações"
          iconClassName="text-purple-base"
        />
        <SummaryCard
          icon={UtensilsIcon}
          value="Alimentação"
          label="Categoria mais utilizada"
          iconClassName="text-blue-base"
        />
      </div>

      <div className="flex justify-center flex-wrap gap-4">
        <CategoryCard
          icon={UtensilsIcon}
          name="Alimentação"
          description="Restaurantes, delivery e refeições"
          itemCount={12}
          color="blue"
        />
        <CategoryCard
          icon={TicketIcon}
          name="Entretenimento"
          description="Restaurantes, delivery e refeições"
          itemCount={2}
          color="pink"
        />
      </div>
    </main>
  )
}
