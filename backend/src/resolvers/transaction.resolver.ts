import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from 'type-graphql'
import {
  CreateTransactionInput,
  UpdateTransactionInput
} from '@/dtos/input/transaction.input.js'
import type { User } from '@/generated/prisma/client.js'
import { GqlUser } from '@/graphql/decorators/user.decorator.js'
import { IsAuth } from '@/middlewares/auth.middleware.js'
import { CategoryModel } from '@/models/category.model.js'
import { TransactionModel } from '@/models/transaction.model.js'
import { UserModel } from '@/models/user.model.js'
import { CategoryService } from '@/services/category.service.js'
import { TransactionService } from '@/services/transaction.service.js'
import { UserService } from '@/services/user.service.js'

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private readonly transactionService: TransactionService
  private readonly userService: UserService
  private readonly categoryService: CategoryService

  constructor() {
    this.transactionService = new TransactionService()
    this.userService = new UserService()
    this.categoryService = new CategoryService()
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

  @FieldResolver(() => UserModel)
  async user(@Root() transaction: TransactionModel) {
    return this.userService.getById(transaction.userId)
  }

  @FieldResolver(() => CategoryModel)
  async category(@Root() transaction: TransactionModel) {
    return this.categoryService.getById(
      transaction.categoryId,
      transaction.userId
    )
  }
}
