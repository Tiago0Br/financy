import type { UpdateUserInput } from '@/dtos/input/user.input.js'
import { prisma } from '@/lib/prisma.js'

export class UpdateUserUseCase {
  async execute(data: UpdateUserInput, userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name
      }
    })
  }
}
