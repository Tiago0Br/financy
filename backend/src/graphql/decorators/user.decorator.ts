import { createParameterDecorator, type ResolverData } from 'type-graphql'
import type { User } from '@/generated/prisma/client.js'
import { prisma } from '@/lib/prisma.js'
import type { GraphqlContext } from '../context/index.js'

export const GqlUser = () => {
  return createParameterDecorator(
    async ({ context }: ResolverData<GraphqlContext>): Promise<User | null> => {
      if (!context?.user) {
        return null
      }

      const user = await prisma.user.findUnique({
        where: {
          id: context.user
        }
      })

      if (!user) {
        throw new Error('User not found')
      }

      return user
    }
  )
}
