import { prisma } from '@/lib/prisma.js'

export class GetUserByIdUseCase {
  async execute(id: string) {
    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      throw new Error(`User with id ${id} not found.`)
    }

    return user
  }
}
