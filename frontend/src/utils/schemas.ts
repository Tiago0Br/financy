import z from 'zod/v3'
import { availableColors } from './consts'

export const categorySchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().optional(),
  icon: z.string().min(1, 'Selecione um ícone'),
  color: z.enum([availableColors[0], ...availableColors], {
    errorMap: () => ({ message: 'Selecione uma cor' })
  })
})

export type CategoryFormData = z.infer<typeof categorySchema>
