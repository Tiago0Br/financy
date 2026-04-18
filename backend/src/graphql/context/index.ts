import type { ExpressContextFunctionArgument } from '@as-integrations/express5'
import { verifyJwt } from '@/utils/jwt.js'

export interface GraphqlContext {
  user?: string
  token?: string
  req: ExpressContextFunctionArgument['req']
  res: ExpressContextFunctionArgument['res']
}

export async function buildContext({
  req,
  res
}: ExpressContextFunctionArgument) {
  const authHeader = req.headers.authorization || ''
  let user: string | undefined
  let token: string | undefined

  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.substring('Bearer '.length)

    try {
      const payload = verifyJwt(token)
      user = payload.id
    } catch {
      throw new Error('Unauthorized')
    }
  }

  return {
    user,
    token,
    req,
    res
  }
}
