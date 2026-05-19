import { z } from 'zod'
import { NotFoundError } from '@/errors/app-error.js'
import { prisma } from '@/lib/prisma.js'

export class GetUserByIdUseCase {
  async execute(id: string) {
    const schema = z.uuid()
    const validatedId = schema.parse(id)

    const user = await prisma.user.findUnique({
      where: { id: validatedId }
    })

    if (!user) {
      throw new NotFoundError(`User with id ${id} not found.`)
    }

    return user
  }
}
