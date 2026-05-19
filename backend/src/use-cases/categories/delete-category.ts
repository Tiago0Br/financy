import { Service } from 'typedi'
import { z } from 'zod'
import { CategoryInUseError, NotFoundError } from '@/errors/app-error.js'
import { prisma } from '@/lib/prisma.js'

@Service()
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
      throw new NotFoundError(`Category with id ${categoryId} not found`)
    }

    const transactionCount = await prisma.transaction.count({
      where: {
        categoryId: validatedData.categoryId
      }
    })

    if (transactionCount > 0) {
      throw new CategoryInUseError()
    }

    await prisma.category.delete({
      where: {
        id: categoryId,
        userId
      }
    })
  }
}
