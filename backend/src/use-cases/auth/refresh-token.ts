import { Service } from 'typedi'
import { z } from 'zod'
import type { RefreshTokenInput } from '@/dtos/input/auth.input.js'
import { UnauthorizedError } from '@/errors/app-error.js'
import { prisma } from '@/lib/prisma.js'
import { verifyJwt } from '@/utils/jwt.js'
import { generateToken } from '@/utils/token-generator.js'

@Service()
export class RefreshTokenUseCase {
  async execute(data: RefreshTokenInput) {
    const schema = z.object({
      refreshToken: z.string().min(1)
    })

    const { refreshToken } = schema.parse(data)

    try {
      const payload = verifyJwt(refreshToken)

      const user = await prisma.user.findUnique({
        where: {
          id: payload.id
        }
      })

      if (!user) {
        throw new UnauthorizedError('Invalid credentials.')
      }

      return generateToken(user)
    } catch {
      throw new UnauthorizedError('Invalid or expired refresh token.')
    }
  }
}
