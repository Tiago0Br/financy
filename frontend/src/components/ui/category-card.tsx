import { SquarePenIcon, TrashIcon } from 'lucide-react'
import type { ElementType } from 'react'
import type { CategoryColor } from '@/utils/types'

interface CategoryCardProps {
  icon: ElementType
  name: string
  description: string
  itemCount: number
  color: CategoryColor
  onEdit?: () => void
  onDelete?: () => void
}

const colorVariants: Record<
  CategoryColor,
  { iconBg: string; iconText: string; tagBg: string; tagText: string }
> = {
  blue: {
    iconBg: 'bg-blue-light',
    iconText: 'text-blue-base',
    tagBg: 'bg-blue-light',
    tagText: 'text-blue-dark'
  },
  purple: {
    iconBg: 'bg-purple-light',
    iconText: 'text-purple-base',
    tagBg: 'bg-purple-light',
    tagText: 'text-purple-dark'
  },
  pink: {
    iconBg: 'bg-pink-light',
    iconText: 'text-pink-base',
    tagBg: 'bg-pink-light',
    tagText: 'text-pink-dark'
  },
  red: {
    iconBg: 'bg-red-light',
    iconText: 'text-red-base',
    tagBg: 'bg-red-light',
    tagText: 'text-red-dark'
  },
  orange: {
    iconBg: 'bg-orange-light',
    iconText: 'text-orange-base',
    tagBg: 'bg-orange-light',
    tagText: 'text-orange-dark'
  },
  yellow: {
    iconBg: 'bg-yellow-light',
    iconText: 'text-yellow-base',
    tagBg: 'bg-yellow-light',
    tagText: 'text-yellow-dark'
  },
  green: {
    iconBg: 'bg-green-light',
    iconText: 'text-green-base',
    tagBg: 'bg-green-light',
    tagText: 'text-green-dark'
  }
}

export function CategoryCard({
  icon: Icon,
  name,
  description,
  itemCount,
  color,
  onEdit,
  onDelete
}: CategoryCardProps) {
  const variant = colorVariants[color]

  return (
    <div className="w-71 bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-5">
      <div className="flex justify-between">
        <div
          className={`size-10 rounded-md ${variant.iconBg} flex justify-center items-center`}
        >
          <Icon className={`size-4 ${variant.iconText}`} />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onDelete}
            className="size-8 rounded-md border border-gray-300 flex items-center justify-center cursor-pointer"
          >
            <TrashIcon className="size-4 text-danger" />
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="size-8 rounded-md border border-gray-300 flex items-center justify-center cursor-pointer"
          >
            <SquarePenIcon className="size-4 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <strong className="text-gray-800">{name}</strong>
        <span className="text-gray-600 text-sm">{description}</span>
      </div>

      <div className="flex justify-between items-center">
        <span
          className={`rounded-xl py-1 px-2 ${variant.tagBg} ${variant.tagText} text-sm`}
        >
          {name}
        </span>

        <span className="text-sm text-gray-600">{itemCount} itens</span>
      </div>
    </div>
  )
}
