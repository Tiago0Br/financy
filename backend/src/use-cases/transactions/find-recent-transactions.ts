import { prisma } from '@/lib/prisma.js'

export class FindRecentTransactionsUseCase {
  async execute(userId: string, limit = 5) {
    return prisma.transaction.findMany({
      where: {
        userId
      },
      orderBy: {
        date: 'desc'
      },
      take: limit
    })
  }
}
