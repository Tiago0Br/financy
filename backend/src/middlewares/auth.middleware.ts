import type { MiddlewareFn } from 'type-graphql'
import { UnauthorizedError } from '@/errors/app-error.js'
import type { GraphqlContext } from '@/graphql/context/index.js'

export const IsAuth: MiddlewareFn<GraphqlContext> = async (
  { context },
  next
) => {
  if (!context.user) {
    throw new UnauthorizedError('User not authenticated')
  }

  return next()
}
