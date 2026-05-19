import { Service } from 'typedi'
import { z } from 'zod'
import type { LoginInput } from '@/dtos/input/auth.input.js'
import { UnauthorizedError } from '@/errors/app-error.js'
import { prisma } from '@/lib/prisma.js'
import { comparePassword } from '@/utils/hash.js'
import { generateToken } from '@/utils/token-generator.js'

@Service()
export class LoginUseCase {
  async execute(data: LoginInput) {
    const schema = z.object({
      email: z.email(),
      password: z.string().min(6)
    })

    const { email, password } = schema.parse(data)

    const existingUser = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (!existingUser) {
      throw new UnauthorizedError('Credenciais inválidas.')
    }

    const compare = await comparePassword(password, existingUser.password ?? '')

    if (!compare) {
      throw new UnauthorizedError('Credenciais inválidas.')
    }

    return generateToken(existingUser)
  }
}
