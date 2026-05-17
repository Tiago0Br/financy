import type { CreateTransactionInput } from '@/dtos/input/transaction.input.js'
import { prisma } from '@/lib/prisma.js'

export class CreateTransactionUseCase {
  async execute(data: CreateTransactionInput, userId: string) {
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
}
