import {
  Arg,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from 'type-graphql'
import { Inject, Service } from 'typedi'
import {
  CreateCategoryInput,
  UpdateCategoryInput
} from '@/dtos/input/category.input.js'
import type { User } from '@/generated/prisma/client.js'
import { GqlUser } from '@/graphql/decorators/user.decorator.js'
import { IsAuth } from '@/middlewares/auth.middleware.js'
import { CategoryModel } from '@/models/category.model.js'
import { UserModel } from '@/models/user.model.js'
import { CreateCategoryUseCase } from '@/use-cases/categories/create-category.js'
import { DeleteCategoryUseCase } from '@/use-cases/categories/delete-category.js'
import { GetCategoryByIdUseCase } from '@/use-cases/categories/get-category-by-id.js'
import { ListCategoriesUseCase } from '@/use-cases/categories/list-categories.js'
import { UpdateCategoryUseCase } from '@/use-cases/categories/update-category.js'
import { CountTransactionsByCategoryUseCase } from '@/use-cases/transactions/count-transactions-by-category.js'
import { GetUserByIdUseCase } from '@/use-cases/users/get-user-by-id.js'

@Service()
@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  @Inject(() => GetUserByIdUseCase)
  private readonly getUserByIdUseCase!: GetUserByIdUseCase

  @Inject(() => CreateCategoryUseCase)
  private readonly createCategoryUseCase!: CreateCategoryUseCase

  @Inject(() => ListCategoriesUseCase)
  private readonly listCategoriesUseCase!: ListCategoriesUseCase

  @Inject(() => GetCategoryByIdUseCase)
  private readonly getCategoryByIdUseCase!: GetCategoryByIdUseCase

  @Inject(() => UpdateCategoryUseCase)
  private readonly updateCategoryUseCase!: UpdateCategoryUseCase

  @Inject(() => DeleteCategoryUseCase)
  private readonly deleteCategoryUseCase!: DeleteCategoryUseCase

  @Inject(() => CountTransactionsByCategoryUseCase)
  private readonly countTransactionsByCategoryUseCase!: CountTransactionsByCategoryUseCase

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: User
  ) {
    return this.createCategoryUseCase.execute(data, user.id)
  }

  @Query(() => [CategoryModel])
  async listCategories(@GqlUser() user: User) {
    return this.listCategoriesUseCase.execute(user.id)
  }

  @Query(() => CategoryModel)
  async getCategoryById(
    @Arg('id', () => String) id: string,
    @GqlUser() user: User
  ) {
    return this.getCategoryByIdUseCase.execute(id, user.id)
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput,
    @GqlUser() user: User
  ) {
    return this.updateCategoryUseCase.execute(data, user.id)
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('id', () => String) id: string,
    @GqlUser() user: User
  ) {
    await this.deleteCategoryUseCase.execute(id, user.id)

    return true
  }

  @FieldResolver(() => UserModel)
  async user(@Root() category: CategoryModel) {
    return this.getUserByIdUseCase.execute(category.userId)
  }

  @FieldResolver(() => Int)
  async transactionsCount(@Root() category: CategoryModel) {
    return this.countTransactionsByCategoryUseCase.execute(category.id)
  }
}
