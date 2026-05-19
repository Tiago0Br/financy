import { Service } from 'typedi'
import { z } from 'zod'
import type { UpdateCategoryInput } from '@/dtos/input/category.input.js'
import { prisma } from '@/lib/prisma.js'
import { CategoryColor } from '@/utils/types.js'

@Service()
export class UpdateCategoryUseCase {
  async execute(data: UpdateCategoryInput, userId: string) {
    const schema = z.object({
      id: z.uuid(),
      title: z.string().min(2).max(255).optional(),
      description: z.string().max(255).optional(),
      icon: z.string().optional(),
      color: z.enum(CategoryColor).optional(),
      userId: z.uuid()
    })

    const validatedData = schema.parse({ ...data, userId })

    return prisma.category.update({
      where: {
        id: validatedData.id,
        userId: validatedData.userId
      },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        icon: validatedData.icon,
        color: validatedData.color
      }
    })
  }
}
