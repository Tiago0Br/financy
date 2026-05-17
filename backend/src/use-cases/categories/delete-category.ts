import { prisma } from '@/lib/prisma.js'

export class DeleteCategoryUseCase {
  async execute(categoryId: string, userId: string) {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
        userId
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
