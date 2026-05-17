import type { LoginInput } from '@/dtos/input/auth.input.js'
import { prisma } from '@/lib/prisma.js'
import { comparePassword } from '@/utils/hash.js'
import { generateToken } from '@/utils/token-generator.js'

export class LoginUseCase {
  async execute(data: LoginInput) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: data.email
      }
    })

    if (!existingUser) {
      throw new Error('User do not exists.')
    }

    const compare = await comparePassword(
      data.password,
      existingUser.password ?? ''
    )

    if (!compare) {
      throw new Error('Invalid Password!')
    }

    return generateToken(existingUser)
  }
}
