import type {
  CreateTransactionInput,
  FindTransactionsInput,
  UpdateTransactionInput
} from '@/dtos/input/transaction.input.js'
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

  async findMany(filters: FindTransactionsInput, userId: string) {
    return prisma.transaction.findMany({
      where: {
        userId,
        description: {
          contains: filters.description
        },
        type: filters.type,
        categoryId: filters.categoryId
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
