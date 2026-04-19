import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import {
  CreateTransactionInput,
  UpdateTransactionInput
} from '@/dtos/input/transaction.input.js'
import type { User } from '@/generated/prisma/client.js'
import { GqlUser } from '@/graphql/decorators/user.decorator.js'
import { IsAuth } from '@/middlewares/auth.middleware.js'
import { TransactionModel } from '@/models/transaction.model.js'
import { TransactionService } from '@/services/transaction.service.js'

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private readonly transactionService: TransactionService

  constructor() {
    this.transactionService = new TransactionService()
  }

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: User
  ) {
    return this.transactionService.create(data, user.id)
  }

  @Query(() => [TransactionModel])
  async listTransactions(@GqlUser() user: User) {
    return this.transactionService.list(user.id)
  }

  @Query(() => TransactionModel)
  async getTransactionByID(
    @Arg('id', () => String) id: string,
    @GqlUser() user: User
  ) {
    return this.transactionService.getById(id, user.id)
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @GqlUser() user: User
  ) {
    return this.transactionService.update(data, user.id)
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string,
    @GqlUser() user: User
  ) {
    await this.transactionService.delete(id, user.id)

    return true
  }
}
