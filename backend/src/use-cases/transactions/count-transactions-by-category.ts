import { prisma } from '@/lib/prisma.js'

export class CountTransactionsByCategoryUseCase {
  async execute(categoryId: string) {
    return prisma.transaction.count({
      where: { categoryId }
    })
  }
}
