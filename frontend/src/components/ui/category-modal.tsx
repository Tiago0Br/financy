import { zodResolver } from '@hookform/resolvers/zod'
import {
  Book,
  Car,
  Gamepad2,
  Heart,
  Music,
  Plane,
  ShoppingBag,
  Tag,
  Ticket,
  Utensils
} from 'lucide-react'
import type { ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod/v3'
import { Button } from './button'
import type { CategoryColor } from './category-card'
import { Input } from './input'
import { Modal } from './modal'

const categorySchema = z.object({
  name: z.string().min(1, 'O título é obrigatório'),
  description: z.string().optional(),
  icon: z.string().min(1, 'Selecione um ícone'),
  color: z.enum(
    ['blue', 'purple', 'pink', 'red', 'orange', 'yellow', 'green'],
    {
      errorMap: () => ({ message: 'Selecione uma cor' })
    }
  )
})

type CategoryFormData = z.infer<typeof categorySchema>

interface CategoryModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: ReactNode
  onSubmit: (data: CategoryFormData) => void
}

const icons = [
  { name: 'Tag', icon: Tag },
  { name: 'Utensils', icon: Utensils },
  { name: 'Ticket', icon: Ticket },
  { name: 'ShoppingBag', icon: ShoppingBag },
  { name: 'Car', icon: Car },
  { name: 'Heart', icon: Heart },
  { name: 'Plane', icon: Plane },
  { name: 'Music', icon: Music },
  { name: 'Gamepad2', icon: Gamepad2 },
  { name: 'Book', icon: Book }
]

const colors: CategoryColor[] = [
  'blue',
  'purple',
  'pink',
  'red',
  'orange',
  'yellow',
  'green'
]

const colorBgVariants: Record<CategoryColor, string> = {
  blue: 'bg-blue-base',
  purple: 'bg-purple-base',
  pink: 'bg-pink-base',
  red: 'bg-red-base',
  orange: 'bg-orange-base',
  yellow: 'bg-yellow-base',
  green: 'bg-green-base'
}

export function CategoryModal({
  open,
  onOpenChange,
  trigger,
  onSubmit
}: CategoryModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
      icon: '',
      color: 'blue'
    }
  })

  return (
    <Modal
      title="Nova categoria"
      description="Organize suas transações com categorias"
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Input
            label="Título"
            placeholder="Ex: Alimentação"
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            label="Descrição"
            placeholder="Descrição da categoria"
            error={errors.description?.message}
            hint="Opcional"
            {...register('description')}
          />

          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-700">Ícone</span>
            <Controller
              name="icon"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {icons.map(({ name, icon: Icon }) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => field.onChange(name)}
                      className={`size-10.5 flex items-center justify-center rounded-lg border transition-all cursor-pointer ${
                        field.value === name
                          ? 'border-brand-base bg-brand-base/10 text-brand-base'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="size-5" />
                    </button>
                  ))}
                </div>
              )}
            />
            {errors.icon && (
              <span className="text-xs text-danger">{errors.icon.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-700">Cor</span>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <div className="flex gap-2 flex-wrap">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => field.onChange(color)}
                      className={`w-12.5 h-7.5 rounded-sm transition-all cursor-pointer ring-offset-2 ${
                        colorBgVariants[color]
                      } ${
                        field.value === color
                          ? 'ring-2 ring-brand-base'
                          : 'hover:opacity-80'
                      }`}
                    />
                  ))}
                </div>
              )}
            />
            {errors.color && (
              <span className="text-xs text-danger">
                {errors.color.message}
              </span>
            )}
          </div>
        </div>

        <Button type="submit" isLoading={isSubmitting}>
          Salvar
        </Button>
      </form>
    </Modal>
  )
}
