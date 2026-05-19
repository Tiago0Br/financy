import { endOfMonth, startOfMonth } from 'date-fns'
import { Service } from 'typedi'
import { z } from 'zod'
import { prisma } from '@/lib/prisma.js'

@Service()
export class GetDashboardStatsUseCase {
  async execute(userId: string) {
    const schema = z.uuid()
    const validatedUserId = schema.parse(userId)

    const now = new Date()
    const monthStart = startOfMonth(now)
    const monthEnd = endOfMonth(now)

    const [totalIncome, totalOutcome, monthlyIncome, monthlyOutcome] =
      await prisma.$transaction([
        prisma.transaction.aggregate({
          _sum: { amount: true },
          where: { userId: validatedUserId, type: 'INCOME' }
        }),
        prisma.transaction.aggregate({
          _sum: { amount: true },
          where: { userId: validatedUserId, type: 'OUTCOME' }
        }),
        prisma.transaction.aggregate({
          _sum: { amount: true },
          where: {
            userId: validatedUserId,
            type: 'INCOME',
            date: { gte: monthStart, lte: monthEnd }
          }
        }),
        prisma.transaction.aggregate({
          _sum: { amount: true },
          where: {
            userId: validatedUserId,
            type: 'OUTCOME',
            date: { gte: monthStart, lte: monthEnd }
          }
        })
      ])

    const totalIncomeAmount = totalIncome._sum.amount || 0
    const totalOutcomeAmount = totalOutcome._sum.amount || 0

    return {
      totalBalance: totalIncomeAmount - totalOutcomeAmount,
      monthlyIncome: monthlyIncome._sum.amount || 0,
      monthlyOutcome: monthlyOutcome._sum.amount || 0
    }
  }
}
