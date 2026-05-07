import { Link } from '@tanstack/react-router'
import { ChevronRightIcon } from 'lucide-react'
import { colorVariants } from '@/utils/consts'
import type { CategoryColor } from '@/utils/types'

interface TopCategory {
  id: string
  title: string
  color: CategoryColor
  transactionCount: number
  totalAmount: number
}

interface TopCategoriesTableProps {
  categories: TopCategory[]
}

export function TopCategoriesTable({ categories }: TopCategoriesTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 flex flex-col min-w-0">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="uppercase text-xs text-gray-500">Categorias</h2>
        <Link
          to="/categories"
          className="text-brand-base hover:text-brand-dark transition-colors text-sm flex gap-1"
        >
          Gerenciar
          <ChevronRightIcon className="size-5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <tbody>
            {categories.map((category) => {
              const variant = colorVariants[category.color]

              return (
                <tr
                  key={category.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-3">
                    <span
                      className={`rounded-xl py-1 px-2 ${variant.tagBg} ${variant.tagText} text-xs whitespace-nowrap font-medium`}
                    >
                      {category.title}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center text-gray-600 text-sm whitespace-nowrap">
                    {category.transactionCount} itens
                  </td>
                  <td className="px-6 py-3 text-right text-gray-800 font-semibold whitespace-nowrap">
                    {category.totalAmount.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
