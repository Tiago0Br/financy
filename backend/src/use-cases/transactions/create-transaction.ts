import { Service } from 'typedi'
import { z } from 'zod'
import type { CreateTransactionInput } from '@/dtos/input/transaction.input.js'
import { prisma } from '@/lib/prisma.js'
import { TransactionType } from '@/models/transaction.model.js'

@Service()
export class CreateTransactionUseCase {
  async execute(data: CreateTransactionInput, userId: string) {
    const schema = z.object({
      type: z.enum(TransactionType),
      description: z.string().min(1).max(255),
      amount: z.number().positive(),
      date: z.date(),
      categoryId: z.uuid(),
      userId: z.uuid()
    })

    const validatedData = schema.parse({ ...data, userId })

    return prisma.transaction.create({
      data: {
        type: validatedData.type,
        description: validatedData.description,
        amount: validatedData.amount,
        date: validatedData.date,
        categoryId: validatedData.categoryId,
        userId: validatedData.userId
      }
    })
  }
}
