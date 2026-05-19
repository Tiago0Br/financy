import { z } from 'zod'
import { NotFoundError } from '@/errors/app-error.js'
import { prisma } from '@/lib/prisma.js'

export class DeleteTransactionUseCase {
  async execute(transactionId: string, userId: string) {
    const schema = z.object({
      transactionId: z.uuid(),
      userId: z.uuid()
    })

    const validatedData = schema.parse({ transactionId, userId })

    const transaction = await prisma.transaction.findUnique({
      where: {
        id: validatedData.transactionId,
        userId: validatedData.userId
      }
    })

    if (!transaction) {
      throw new NotFoundError(`Transaction with id ${transactionId} not found`)
    }

    await prisma.transaction.delete({
      where: {
        id: transactionId,
        userId
      }
    })
  }
}
