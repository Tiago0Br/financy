import { endOfMonth, startOfMonth } from 'date-fns'
import type {
  CreateTransactionInput,
  FindTransactionsInput,
  UpdateTransactionInput
} from '@/dtos/input/transaction.input.js'
import type { PaginatedTransactions } from '@/dtos/output/transaction.output.js'
import { prisma } from '@/lib/prisma.js'

export class TransactionService {
  async create(data: CreateTransactionInput, userId: string) {
    return prisma.transaction.create({
      data: {
        type: data.type,
        description: data.description,
        amount: data.amount,
        date: data.date,
        categoryId: data.categoryId,
        userId
      }
    })
  }

  async findMany(
    filters: FindTransactionsInput,
    userId: string
  ): Promise<PaginatedTransactions> {
    const {
      month,
      year,
      description,
      type,
      categoryId,
      page = 1,
      limit = 10
    } = filters

    let dateRange = {}

    if (month && year) {
      const date = new Date(year, month - 1)

      dateRange = {
        gte: startOfMonth(date),
        lte: endOfMonth(date)
      }
    }

    const where = {
      userId,
      description: {
        contains: description
      },
      type: type,
      categoryId: categoryId,
      date: dateRange
    }

    const skip = (page - 1) * limit
    const take = limit

    const [items, totalCount] = await prisma.$transaction([
      prisma.transaction.findMany({
        where,
        skip,
        take,
        orderBy: {
          date: 'desc'
        }
      }),
      prisma.transaction.count({ where })
    ])

    const totalPages = Math.ceil(totalCount / limit)
    const rangeStart = totalCount > 0 ? skip + 1 : 0
    const rangeEnd = Math.min(skip + limit, totalCount)

    return {
      items,
      totalCount,
      pageInfo: {
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        rangeStart,
        rangeEnd
      }
    }
  }

  async findRecent(userId: string, limit = 5) {
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

  async getDashboardStats(userId: string) {
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

  async getTopCategories(userId: string) {
    const now = new Date()
    const monthStart = startOfMonth(now)
    const monthEnd = endOfMonth(now)

    const aggregatedData = await prisma.transaction.groupBy({
      by: ['categoryId'],
      _count: { id: true },
      _sum: { amount: true },
      where: {
        userId,
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
        userId
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

  async getById(transactionId: string, userId: string) {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
        userId
      }
    })

    if (!transaction) {
      throw new Error(`Transaction with id ${transactionId} not found`)
    }

    return transaction
  }

  async update(data: UpdateTransactionInput, userId: string) {
    return prisma.transaction.update({
      where: {
        id: data.id,
        userId
      },
      data: {
        type: data.type,
        description: data.description,
        amount: data.amount,
        date: data.date,
        categoryId: data.categoryId
      }
    })
  }

  async delete(transactionId: string, userId: string) {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
        userId
      }
    })

    if (!transaction) {
      throw new Error(`Transaction with id ${transactionId} not found`)
    }

    await prisma.transaction.delete({
      where: {
        id: transactionId,
        userId
      }
    })
  }
}
