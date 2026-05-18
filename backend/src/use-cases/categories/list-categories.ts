import { z } from 'zod'
import { prisma } from '@/lib/prisma.js'

export class ListCategoriesUseCase {
  async execute(userId: string) {
    const schema = z.uuid()
    const validatedUserId = schema.parse(userId)

    return prisma.category.findMany({
      where: { userId: validatedUserId }
    })
  }
}
