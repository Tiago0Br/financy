import { z } from 'zod'
import type { CreateCategoryInput } from '@/dtos/input/category.input.js'
import { prisma } from '@/lib/prisma.js'
import { CategoryColor } from '@/utils/types.js'

export class CreateCategoryUseCase {
  async execute(data: CreateCategoryInput, userId: string) {
    const schema = z.object({
      title: z.string().min(2).max(255),
      description: z.string().max(255).optional(),
      icon: z.string(),
      color: z.enum(CategoryColor),
      userId: z.uuid()
    })

    const validatedData = schema.parse({ ...data, userId })

    return prisma.category.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        icon: validatedData.icon,
        color: validatedData.color,
        userId: validatedData.userId
      }
    })
  }
}
