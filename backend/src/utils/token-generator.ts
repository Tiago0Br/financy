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

  const refreashToken = signJwt(
    {
      id: user.id,
      email: user.email
    },
    env.REFREASH_TOKEN_EXPIRES_IN
  )

  return {
    token,
    refreashToken,
    user
  }
}
