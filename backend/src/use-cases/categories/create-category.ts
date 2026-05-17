import type { CreateCategoryInput } from '@/dtos/input/category.input.js'
import { prisma } from '@/lib/prisma.js'

export class CreateCategoryUseCase {
  async execute(data: CreateCategoryInput, userId: string) {
    return prisma.category.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
        userId
      }
    })
  }
}
