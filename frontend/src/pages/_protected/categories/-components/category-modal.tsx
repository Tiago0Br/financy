import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { availableColors } from '@/utils/consts'
import { categoryIcons } from '@/utils/icons'
import {
  type CreateCategoryFormData,
  createCategorySchema
} from '@/utils/schemas'
import type { CategoryColor } from '@/utils/types'

interface CategoryModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  onSubmit: (data: CreateCategoryFormData) => void
  initialData?: CreateCategoryFormData
}

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
  onSubmit,
  initialData
}: CategoryModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: initialData ?? {
      title: '',
      description: '',
      icon: '',
      color: 'blue'
    }
  })

  useEffect(() => {
    if (open) {
      reset(
        initialData ?? {
          title: '',
          description: '',
          icon: '',
          color: 'blue'
        }
      )
    }
  }, [open, initialData, reset])

  return (
    <Modal
      title={initialData ? 'Alterar categoria' : 'Nova categoria'}
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
            error={errors.title?.message}
            disabled={isSubmitting}
            {...register('title')}
          />

          <Input
            label="Descrição"
            placeholder="Descrição da categoria"
            error={errors.description?.message}
            hint="Opcional"
            disabled={isSubmitting}
            {...register('description')}
          />

          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-700">Ícone</span>
            <Controller
              name="icon"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                  {categoryIcons.map(({ name, icon: Icon }) => (
                    <button
                      key={name}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => field.onChange(name)}
                      className={`size-10 flex items-center justify-center rounded-lg border transition-all cursor-pointer ${
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
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => field.onChange(color)}
                      className={`w-10 h-10 sm:w-12.5 sm:h-7.5 rounded-sm transition-all cursor-pointer ring-offset-2 ${
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

        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Salvar
        </Button>
      </form>
    </Modal>
  )
}
