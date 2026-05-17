import { endOfMonth, startOfMonth } from 'date-fns'
import type { FindTransactionsInput } from '@/dtos/input/transaction.input.js'
import type { PaginatedTransactions } from '@/dtos/output/transaction.output.js'
import { prisma } from '@/lib/prisma.js'

export class FindManyTransactionsUseCase {
  async execute(
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
}
