import { endOfMonth, startOfMonth } from 'date-fns'
import { prisma } from '@/lib/prisma.js'

export class GetDashboardStatsUseCase {
  async execute(userId: string) {
    const now = new Date()
    const monthStart = startOfMonth(now)
    const monthEnd = endOfMonth(now)

    const [totalIncome, totalOutcome, monthlyIncome, monthlyOutcome] =
      await prisma.$transaction([
        prisma.transaction.aggregate({
          _sum: { amount: true },
          where: { userId, type: 'INCOME' }
        }),
        prisma.transaction.aggregate({
          _sum: { amount: true },
          where: { userId, type: 'OUTCOME' }
        }),
        prisma.transaction.aggregate({
          _sum: { amount: true },
          where: {
            userId,
            type: 'INCOME',
            date: { gte: monthStart, lte: monthEnd }
          }
        }),
        prisma.transaction.aggregate({
          _sum: { amount: true },
          where: {
            userId,
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
