import { useQuery } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Select } from '@/components/ui/select'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/category'
import {
  type CreateTransactionFormData,
  createTransactionSchema
} from '@/utils/schemas'
import type { Category } from '@/utils/types'

interface TransactionModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  onSubmit: (data: CreateTransactionFormData) => void
  initialData?: CreateTransactionFormData
}

export function TransactionModal({
  open,
  onOpenChange,
  trigger,
  onSubmit,
  initialData
}: TransactionModalProps) {
  const { data: categoriesData } = useQuery<{
    listCategories: Category[]
  }>(LIST_CATEGORIES)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateTransactionFormData>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: initialData ?? {
      type: 'EXPENSE',
      description: '',
      date: '',
      amount: 0,
      categoryId: ''
    }
  })

  useEffect(() => {
    if (open) {
      reset(
        initialData ?? {
          type: 'EXPENSE',
          description: '',
          date: '',
          amount: 0,
          categoryId: ''
        }
      )
    }
  }, [open, initialData, reset])

  const categoryOptions =
    categoriesData?.listCategories.map((category) => ({
      label: category.title,
      value: category.id
    })) ?? []

  return (
    <Modal
      title={initialData ? 'Alterar transação' : 'Nova transação'}
      description="Gerencie seus gastos e ganhos"
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-700">Tipo</span>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => field.onChange('EXPENSE')}
                    className={`flex items-center justify-center gap-2 h-11 rounded-lg border transition-all cursor-pointer ${
                      field.value === 'EXPENSE'
                        ? 'border-red-base bg-red-base/10 text-red-base'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <ArrowDownIcon className="size-4" />
                    <span>Despesa</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange('INCOME')}
                    className={`flex items-center justify-center gap-2 h-11 rounded-lg border transition-all cursor-pointer ${
                      field.value === 'INCOME'
                        ? 'border-green-base bg-green-base/10 text-green-base'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <ArrowUpIcon className="size-4" />
                    <span>Receita</span>
                  </button>
                </div>
              )}
            />
            {errors.type && (
              <span className="text-xs text-danger">{errors.type.message}</span>
            )}
          </div>

          <Input
            label="Descrição"
            placeholder="Ex: Aluguel"
            error={errors.description?.message}
            disabled={isSubmitting}
            {...register('description')}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Data"
              placeholder="00/00/0000"
              error={errors.date?.message}
              disabled={isSubmitting}
              {...register('date')}
            />

            <Input
              label="Valor"
              placeholder="0,00"
              type="number"
              step="0.01"
              error={errors.amount?.message}
              disabled={isSubmitting}
              {...register('amount')}
            />
          </div>

          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select
                label="Categoria"
                error={errors.categoryId?.message}
                disabled={isSubmitting}
                options={categoryOptions}
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>

        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Salvar
        </Button>
      </form>
    </Modal>
  )
}
