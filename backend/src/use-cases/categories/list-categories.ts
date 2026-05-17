import { prisma } from '@/lib/prisma.js'

export class ListCategoriesUseCase {
  async execute(userId: string) {
    return prisma.category.findMany({
      where: { userId }
    })
  }
}
