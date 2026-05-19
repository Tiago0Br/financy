import { env } from '@/env.js'
import type { User } from '@/generated/prisma/client.js'
import { signJwt } from '@/utils/jwt.js'

export function generateToken(user: User) {
  const token = signJwt(
    {
      id: user.id,
      email: user.email
    },
    env.TOKEN_EXPIRES_IN
  )

  const refreshToken = signJwt(
    {
      id: user.id,
      email: user.email
    },
    env.REFRESH_TOKEN_EXPIRES_IN
  )

  return {
    token,
    refreshToken,
    user
  }
}
