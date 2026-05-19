import { Service } from 'typedi'
import { z } from 'zod'
import type { UpdateTransactionInput } from '@/dtos/input/transaction.input.js'
import { prisma } from '@/lib/prisma.js'
import { TransactionType } from '@/models/transaction.model.js'

@Service()
export class UpdateTransactionUseCase {
  async execute(data: UpdateTransactionInput, userId: string) {
    const schema = z.object({
      id: z.uuid(),
      type: z.enum(TransactionType).optional(),
      description: z.string().min(1).max(255).optional(),
      amount: z.number().positive().optional(),
      date: z.date().optional(),
      categoryId: z.uuid().optional(),
      userId: z.uuid()
    })

    const validatedData = schema.parse({ ...data, userId })

    return prisma.transaction.update({
      where: {
        id: validatedData.id,
        userId: validatedData.userId
      },
      data: {
        type: validatedData.type,
        description: validatedData.description,
        amount: validatedData.amount,
        date: validatedData.date,
        categoryId: validatedData.categoryId
      }
    })
  }
}
