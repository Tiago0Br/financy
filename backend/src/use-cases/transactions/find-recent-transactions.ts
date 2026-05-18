import { z } from 'zod'
import { prisma } from '@/lib/prisma.js'

export class FindRecentTransactionsUseCase {
  async execute(userId: string, limit = 5) {
    const schema = z.object({
      userId: z.uuid(),
      limit: z.number().min(1).max(50).optional().default(5)
    })

    const validatedData = schema.parse({ userId, limit })

    return prisma.transaction.findMany({
      where: {
        userId: validatedData.userId
      },
      orderBy: {
        date: 'desc'
      },
      take: validatedData.limit
    })
  }
}
