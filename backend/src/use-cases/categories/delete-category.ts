import { z } from 'zod'
import { prisma } from '@/lib/prisma.js'

export class DeleteCategoryUseCase {
  async execute(categoryId: string, userId: string) {
    const schema = z.object({
      categoryId: z.uuid(),
      userId: z.uuid()
    })

    const validatedData = schema.parse({ categoryId, userId })

    const category = await prisma.category.findUnique({
      where: {
        id: validatedData.categoryId,
        userId: validatedData.userId
      }
    })

    if (!category) {
      throw new Error(`Category with id ${categoryId} not found`)
    }

    await prisma.category.delete({
      where: {
        id: categoryId,
        userId
      }
    })
  }
}
