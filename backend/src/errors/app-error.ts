import { GraphQLError } from 'graphql'
import { ErrorType } from '@financy/shared'

export class AppError extends GraphQLError {
  constructor(
    message: string,
    type: ErrorType,
    extensions?: Record<string, unknown>
  ) {
    super(message, {
      extensions: {
        ...extensions,
        type
      }
    })
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, ErrorType.NOT_FOUND)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, string[]>) {
    super(
      message,
      ErrorType.VALIDATION_ERROR,
      details ? { details } : undefined
    )
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, ErrorType.UNAUTHORIZED)
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, ErrorType.FORBIDDEN)
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, ErrorType.CONFLICT)
  }
}

export class CategoryInUseError extends AppError {
  constructor(
    message = 'Cannot delete category with associated transactions.'
  ) {
    super(message, ErrorType.CONFLICT)
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, ErrorType.BAD_REQUEST)
  }
}
