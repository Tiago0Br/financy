import { endOfMonth, startOfMonth } from 'date-fns'
import { z } from 'zod'
import { prisma } from '@/lib/prisma.js'

export class GetTopCategoriesUseCase {
  async execute(userId: string) {
    const schema = z.uuid()
    const validatedUserId = schema.parse(userId)

    const now = new Date()
    const monthStart = startOfMonth(now)
    const monthEnd = endOfMonth(now)

    const aggregatedData = await prisma.transaction.groupBy({
      by: ['categoryId'],
      _count: { id: true },
      _sum: { amount: true },
      where: {
        userId: validatedUserId,
        date: { gte: monthStart, lte: monthEnd }
      },
      orderBy: {
        _count: { id: 'desc' }
      },
      take: 5
    })

    if (aggregatedData.length === 0) {
      return []
    }

    const categoryIds = aggregatedData.map((data) => data.categoryId)
    const categories = await prisma.category.findMany({
      where: {
        id: { in: categoryIds },
        userId: validatedUserId
      }
    })

    return aggregatedData.map((data) => {
      const category = categories.find((c) => c.id === data.categoryId)

      if (!category) {
        throw new Error(`Category ${data.categoryId} not found`)
      }

      return {
        category,
        transactionCount: data._count.id,
        totalAmount: data._sum.amount || 0
      }
    })
  }
}
