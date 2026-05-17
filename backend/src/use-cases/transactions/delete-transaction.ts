import { prisma } from '@/lib/prisma.js'

export class DeleteTransactionUseCase {
  async execute(transactionId: string, userId: string) {
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
