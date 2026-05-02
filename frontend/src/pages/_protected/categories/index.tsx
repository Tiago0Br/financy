import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowUpDownIcon,
  PlusIcon,
  SquarePenIcon,
  TagIcon,
  TicketIcon,
  TrashIcon,
  UtensilsIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'

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
          <Button icon={PlusIcon}>Nova categoria</Button>
        </div>
      </div>

      <div className="flex justify-center gap-6">
        <div className="flex-1 max-w-94.5 flex gap-5 bg-white rounded-lg border border-gray-200 p-6">
          <TagIcon className="mt-1.5 size-6 text-gray-700" />
          <div className="flex flex-col">
            <strong className="text-[28px] text-gray-800 leading-tight">
              8
            </strong>
            <span className="text-xs text-gray-500 uppercase">
              Total de categorias
            </span>
          </div>
        </div>
        <div className="flex-1 max-w-94.5 flex gap-5 bg-white rounded-lg border border-gray-200 p-6">
          <ArrowUpDownIcon className="mt-1.5 size-6 text-purple-base" />
          <div className="flex flex-col">
            <strong className="text-[28px] text-gray-800 leading-tight">
              27
            </strong>
            <span className="text-xs text-gray-500 uppercase">
              Total de transações
            </span>
          </div>
        </div>
        <div className="flex-1 max-w-94.5 flex gap-5 bg-white rounded-lg border border-gray-200 p-6">
          <UtensilsIcon className="mt-1.5 size-6 text-blue-base" />
          <div className="flex flex-col">
            <strong className="text-[28px] text-gray-800 leading-tight">
              Alimentação
            </strong>
            <span className="text-xs text-gray-500 uppercase">
              Categoria mais utilizada
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center flex-wrap gap-4">
        <div className="w-71 bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-5">
          <div className="flex justify-between">
            <div className="size-10 rounded-md bg-blue-light flex justify-center items-center">
              <UtensilsIcon className="size-4 text-blue-base" />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="size-8 rounded-md border border-gray-300 flex items-center justify-center cursor-pointer"
              >
                <TrashIcon className="size-4 text-danger" />
              </button>

              <button
                type="button"
                className="size-8 rounded-md border border-gray-300 flex items-center justify-center cursor-pointer"
              >
                <SquarePenIcon className="size-4 text-gray-700" />
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <strong className="text-gray-800">Alimentação</strong>
            <span className="text-gray-600 text-sm">
              Restaurantes, delivery e refeições
            </span>
          </div>

          <div className="flex justify-between">
            <span className="rounded-xl py-1 px-2 bg-blue-light text-blue-dark text-sm">
              Alimentação
            </span>

            <span className="text-sm text-gray-600">12 itens</span>
          </div>
        </div>
        <div className="w-71 bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-5">
          <div className="flex justify-between">
            <div className="size-10 rounded-md bg-pink-light flex justify-center items-center">
              <TicketIcon className="size-4 text-pink-base" />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="size-8 rounded-md border border-gray-300 flex items-center justify-center cursor-pointer"
              >
                <TrashIcon className="size-4 text-danger" />
              </button>

              <button
                type="button"
                className="size-8 rounded-md border border-gray-300 flex items-center justify-center cursor-pointer"
              >
                <SquarePenIcon className="size-4 text-gray-700" />
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <strong className="text-gray-800">Entretenimento</strong>
            <span className="text-gray-600 text-sm">
              Restaurantes, delivery e refeições
            </span>
          </div>

          <div className="flex justify-between">
            <span className="rounded-xl py-1 px-2 bg-pink-light text-pink-dark text-sm">
              Entretenimento
            </span>

            <span className="text-sm text-gray-600">2 itens</span>
          </div>
        </div>
      </div>
    </main>
  )
}
