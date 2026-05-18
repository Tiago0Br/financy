import { z } from 'zod'
import type { RegisterInput } from '@/dtos/input/auth.input.js'
import { prisma } from '@/lib/prisma.js'
import { hashPassword } from '@/utils/hash.js'
import { generateToken } from '@/utils/token-generator.js'

export class RegisterUseCase {
  async execute(data: RegisterInput) {
    const schema = z.object({
      name: z.string().min(2).max(255),
      email: z.email(),
      password: z.string().min(6)
    })

    const { name, email, password } = schema.parse(data)

    const existingUser = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (existingUser) {
      throw new Error('User already exists.')
    }

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash
      }
    })

    return generateToken(user)
  }
}
