import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TransactionsHeaderProps {
  onOpenCreate: () => void
}

export function TransactionsHeader({ onOpenCreate }: TransactionsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-800">Transações</h1>
        <span className="text-gray-600">
          Gerencie todas as suas transações financeiras
        </span>
      </div>

      <div className="w-full sm:w-auto">
        <Button
          icon={PlusIcon}
          onClick={onOpenCreate}
          className="w-full sm:w-auto"
        >
          Nova transação
        </Button>
      </div>
    </div>
  )
}
