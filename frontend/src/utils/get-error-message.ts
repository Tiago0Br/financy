import { CombinedGraphQLErrors } from '@apollo/client/errors'
import { ErrorType } from './types'

/**
 * Retorna uma mensagem de erro amigável em português baseada no tipo de erro
 * retornado pelo backend.
 *
 * @param error - O erro capturado na requisição
 * @returns Mensagem de erro em português
 */
export function getErrorMessage(error: unknown): string {
  if (CombinedGraphQLErrors.is(error)) {
    const graphQLError = error.errors?.[0]

    if (graphQLError?.extensions?.type) {
      const errorType = graphQLError.extensions.type as ErrorType

      switch (errorType) {
        case ErrorType.NOT_FOUND:
          return 'Recurso não encontrado'
        case ErrorType.VALIDATION_ERROR:
          return 'Erro de validação nos dados enviados'
        case ErrorType.UNAUTHORIZED:
          return 'Credenciais inválidas ou sessão expirada'
        case ErrorType.FORBIDDEN:
          return 'Você não tem permissão para realizar esta ação'
        case ErrorType.CONFLICT:
          return 'Conflito de dados (ex: e-mail já cadastrado)'
        case ErrorType.INTERNAL_SERVER_ERROR:
          return 'Erro interno no servidor, tente novamente mais tarde'
        case ErrorType.BAD_REQUEST:
          return 'Requisição inválida'
        default:
          break
      }
    }
  }

  return 'Ocorreu um erro inesperado. Tente novamente.'
}
