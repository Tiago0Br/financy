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
