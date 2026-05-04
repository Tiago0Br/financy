import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function TransactionsFilters() {
  return (
    <div className="pt-5 pb-6 px-6 flex justify-center gap-4 bg-white rounded-lg border border-gray-200">
      <Input
        label="Buscar"
        icon={SearchIcon}
        placeholder="Buscar por descrição"
      />
      <Input label="Tipo" placeholder="Tipo" />
      <Input label="Categoria" placeholder="Categoria" />
      <Input label="Período" placeholder="Período" />
    </div>
  )
}
