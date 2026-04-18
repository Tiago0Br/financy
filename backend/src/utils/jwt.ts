import jwt, { type Secret, type SignOptions } from 'jsonwebtoken'
import { env } from '@/env.js'

export interface JwtPayload {
  id: string
  email: string
}

export function signJwt(payload: JwtPayload, expiresIn?: string) {
  const secret: Secret = env.JWT_SECRET as Secret
  let options: SignOptions | undefined

  if (expiresIn) {
    options = {
      expiresIn: expiresIn as unknown as NonNullable<SignOptions['expiresIn']>
    }
  }

  return jwt.sign(payload, secret, options)
}

export function verifyJwt(token: string) {
  const secret = env.JWT_SECRET as Secret

  return jwt.verify(token, secret) as JwtPayload
}
