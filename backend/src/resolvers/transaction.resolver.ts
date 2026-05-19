import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from 'type-graphql'
import { Inject, Service } from 'typedi'
import {
  CreateTransactionInput,
  FindTransactionsInput,
  UpdateTransactionInput
} from '@/dtos/input/transaction.input.js'
import { TopCategory } from '@/dtos/output/category.output.js'
import {
  DashboardStats,
  PaginatedTransactions
} from '@/dtos/output/transaction.output.js'
import type { User } from '@/generated/prisma/client.js'
import { GqlUser } from '@/graphql/decorators/user.decorator.js'
import { IsAuth } from '@/middlewares/auth.middleware.js'
import { CategoryModel } from '@/models/category.model.js'
import { TransactionModel } from '@/models/transaction.model.js'
import { UserModel } from '@/models/user.model.js'
import { GetCategoryByIdUseCase } from '@/use-cases/categories/get-category-by-id.js'
import { CreateTransactionUseCase } from '@/use-cases/transactions/create-transaction.js'
import { DeleteTransactionUseCase } from '@/use-cases/transactions/delete-transaction.js'
import { FindManyTransactionsUseCase } from '@/use-cases/transactions/find-many-transactions.js'
import { FindRecentTransactionsUseCase } from '@/use-cases/transactions/find-recent-transactions.js'
import { GetDashboardStatsUseCase } from '@/use-cases/transactions/get-dashboard-stats.js'
import { GetTopCategoriesUseCase } from '@/use-cases/transactions/get-top-categories.js'
import { GetTransactionByIdUseCase } from '@/use-cases/transactions/get-transaction-by-id.js'
import { UpdateTransactionUseCase } from '@/use-cases/transactions/update-transaction.js'
import { GetUserByIdUseCase as GetUserByIdFromUsersUseCase } from '@/use-cases/users/get-user-by-id.js'

@Service()
@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  @Inject(() => GetUserByIdFromUsersUseCase)
  private readonly getUserByIdUseCase!: GetUserByIdFromUsersUseCase

  @Inject(() => CreateTransactionUseCase)
  private readonly createTransactionUseCase!: CreateTransactionUseCase

  @Inject(() => FindManyTransactionsUseCase)
  private readonly findManyTransactionsUseCase!: FindManyTransactionsUseCase

  @Inject(() => FindRecentTransactionsUseCase)
  private readonly findRecentTransactionsUseCase!: FindRecentTransactionsUseCase

  @Inject(() => GetDashboardStatsUseCase)
  private readonly getDashboardStatsUseCase!: GetDashboardStatsUseCase

  @Inject(() => GetTopCategoriesUseCase)
  private readonly getTopCategoriesUseCase!: GetTopCategoriesUseCase

  @Inject(() => GetTransactionByIdUseCase)
  private readonly getTransactionByIdUseCase!: GetTransactionByIdUseCase

  @Inject(() => UpdateTransactionUseCase)
  private readonly updateTransactionUseCase!: UpdateTransactionUseCase

  @Inject(() => DeleteTransactionUseCase)
  private readonly deleteTransactionUseCase!: DeleteTransactionUseCase

  @Inject(() => GetCategoryByIdUseCase)
  private readonly getCategoryByIdUseCase!: GetCategoryByIdUseCase

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: User
  ) {
    return this.createTransactionUseCase.execute(data, user.id)
  }

  @Query(() => PaginatedTransactions)
  async listTransactions(
    @Arg('data', () => FindTransactionsInput) data: FindTransactionsInput,
    @GqlUser() user: User
  ) {
    return this.findManyTransactionsUseCase.execute(data, user.id)
  }

  @Query(() => [TransactionModel])
  async recentTransactions(@GqlUser() user: User) {
    return this.findRecentTransactionsUseCase.execute(user.id)
  }

  @Query(() => DashboardStats)
  async dashboardStats(@GqlUser() user: User) {
    return this.getDashboardStatsUseCase.execute(user.id)
  }

  @Query(() => [TopCategory])
  async topCategories(@GqlUser() user: User) {
    return this.getTopCategoriesUseCase.execute(user.id)
  }

  @Query(() => TransactionModel)
  async getTransactionByID(
    @Arg('id', () => String) id: string,
    @GqlUser() user: User
  ) {
    return this.getTransactionByIdUseCase.execute(id, user.id)
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @GqlUser() user: User
  ) {
    return this.updateTransactionUseCase.execute(data, user.id)
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string,
    @GqlUser() user: User
  ) {
    await this.deleteTransactionUseCase.execute(id, user.id)

    return true
  }

  @FieldResolver(() => UserModel)
  async user(@Root() transaction: TransactionModel) {
    return this.getUserByIdUseCase.execute(transaction.userId)
  }

  @FieldResolver(() => CategoryModel)
  async category(@Root() transaction: TransactionModel) {
    return this.getCategoryByIdUseCase.execute(
      transaction.categoryId,
      transaction.userId
    )
  }
}
