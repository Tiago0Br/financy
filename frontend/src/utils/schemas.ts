import z from 'zod/v3'
import { availableColors } from './consts'

export const createCategorySchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().optional(),
  icon: z.string().min(1, 'Selecione um ícone'),
  color: z.enum([availableColors[0], ...availableColors], {
    errorMap: () => ({ message: 'Selecione uma cor' })
  })
})

export type CreateCategoryFormData = z.infer<typeof createCategorySchema>

export const updateCategorySchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  color: z
    .enum([availableColors[0], ...availableColors], {
      errorMap: () => ({ message: 'Selecione uma cor' })
    })
    .optional()
})

export type UpdateCategoryFormData = z.infer<typeof updateCategorySchema>

export const createTransactionSchema = z.object({
  type: z.enum(['INCOME', 'EXPENSE'], {
    errorMap: () => ({ message: 'Selecione o tipo da transação' })
  }),
  description: z.string().min(1, 'A descrição é obrigatória'),
  date: z.string().min(1, 'A data é obrigatória'),
  amount: z.coerce.number().min(0.01, 'O valor deve ser maior que zero'),
  categoryId: z.string().min(1, 'Selecione uma categoria')
})

export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>
