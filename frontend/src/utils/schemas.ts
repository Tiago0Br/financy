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
