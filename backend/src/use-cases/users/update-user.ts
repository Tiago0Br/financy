import { Service } from 'typedi'
import { z } from 'zod'
import type { UpdateUserInput } from '@/dtos/input/user.input.js'
import { prisma } from '@/lib/prisma.js'

@Service()
export class UpdateUserUseCase {
  async execute(data: UpdateUserInput, userId: string) {
    const schema = z.object({
      name: z.string().min(2).max(255).optional(),
      userId: z.uuid()
    })

    const validatedData = schema.parse({ ...data, userId })

    return prisma.user.update({
      where: { id: validatedData.userId },
      data: {
        name: validatedData.name
      }
    })
  }
}
