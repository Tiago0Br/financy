import { unwrapResolverError } from '@apollo/server/errors'
import type { GraphQLFormattedError } from 'graphql'
import { ZodError, z } from 'zod'
import { ErrorType } from './error-types.js'

export const formatError = (
  formattedError: GraphQLFormattedError,
  error: unknown
): GraphQLFormattedError => {
  const originalError = unwrapResolverError(error)

  if (originalError instanceof ZodError) {
    return {
      ...formattedError,
      message: 'Dados de entrada inválidos',
      extensions: {
        ...formattedError.extensions,
        type: ErrorType.VALIDATION_ERROR,
        errors: z.treeifyError(originalError).errors
      }
    }
  }

  return {
    ...formattedError,
    message: formattedError.message,
    extensions: {
      ...formattedError.extensions,
      type:
        (formattedError.extensions?.type as string) ??
        ErrorType.INTERNAL_SERVER_ERROR
    }
  }
}
