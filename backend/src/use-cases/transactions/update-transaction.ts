import type { UpdateTransactionInput } from '@/dtos/input/transaction.input.js'
import { prisma } from '@/lib/prisma.js'

export class UpdateTransactionUseCase {
  async execute(data: UpdateTransactionInput, userId: string) {
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
}
