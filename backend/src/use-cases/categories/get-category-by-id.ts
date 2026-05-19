import { z } from 'zod'
import { NotFoundError } from '@/errors/app-error.js'
import { prisma } from '@/lib/prisma.js'

export class GetCategoryByIdUseCase {
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

    return category
  }
}
