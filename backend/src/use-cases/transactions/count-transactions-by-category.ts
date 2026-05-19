import { Service } from 'typedi'
import { z } from 'zod'
import { prisma } from '@/lib/prisma.js'

@Service()
export class CountTransactionsByCategoryUseCase {
  async execute(categoryId: string) {
    const schema = z.uuid()
    const validatedCategoryId = schema.parse(categoryId)

    return prisma.transaction.count({
      where: { categoryId: validatedCategoryId }
    })
  }
}
