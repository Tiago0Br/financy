import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CategoriesHeaderProps {
  onOpenCreate: () => void
}

export function CategoriesHeader({ onOpenCreate }: CategoriesHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
        <span className="text-gray-600">
          Organize suas transações por categorias
        </span>
      </div>

      <div className="w-full sm:w-auto">
        <Button
          icon={PlusIcon}
          onClick={onOpenCreate}
          className="w-full sm:w-auto"
        >
          Nova categoria
        </Button>
      </div>
    </div>
  )
}
