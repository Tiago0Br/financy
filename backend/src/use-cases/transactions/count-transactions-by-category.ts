import { z } from 'zod'
import { prisma } from '@/lib/prisma.js'

export class CountTransactionsByCategoryUseCase {
  async execute(categoryId: string) {
    const schema = z.uuid()
    const validatedCategoryId = schema.parse(categoryId)

    return prisma.transaction.count({
      where: { categoryId: validatedCategoryId }
    })
  }
}
