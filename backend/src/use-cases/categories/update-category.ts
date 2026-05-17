import type { UpdateCategoryInput } from '@/dtos/input/category.input.js'
import { prisma } from '@/lib/prisma.js'

export class UpdateCategoryUseCase {
  async execute(data: UpdateCategoryInput, userId: string) {
    return prisma.category.update({
      where: {
        id: data.id,
        userId
      },
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color
      }
    })
  }
}
