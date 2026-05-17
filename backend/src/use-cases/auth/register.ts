import type { RegisterInput } from '@/dtos/input/auth.input.js'
import { prisma } from '@/lib/prisma.js'
import { hashPassword } from '@/utils/hash.js'
import { generateToken } from '@/utils/token-generator.js'

export class RegisterUseCase {
  async execute(data: RegisterInput) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: data.email
      }
    })

    if (existingUser) {
      throw new Error('User already exists.')
    }

    const passwordHash = await hashPassword(data.password)

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash
      }
    })

    return generateToken(user)
  }
}
