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
  CreateCategoryInput,
  UpdateCategoryInput
} from '@/dtos/input/category.input.js'
import type { User } from '@/generated/prisma/client.js'
import { GqlUser } from '@/graphql/decorators/user.decorator.js'
import { IsAuth } from '@/middlewares/auth.middleware.js'
import { CategoryModel } from '@/models/category.model.js'
import { UserModel } from '@/models/user.model.js'
import { CategoryService } from '@/services/category.service.js'
import { UserService } from '@/services/user.service.js'

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private readonly categoryService: CategoryService
  private readonly userService: UserService

  constructor() {
    this.categoryService = new CategoryService()
    this.userService = new UserService()
  }

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: User
  ) {
    return this.categoryService.create(data, user.id)
  }

  @Query(() => [CategoryModel])
  async listCategories(@GqlUser() user: User) {
    return this.categoryService.list(user.id)
  }

  @Query(() => CategoryModel)
  async getCategoryById(
    @Arg('id', () => String) id: string,
    @GqlUser() user: User
  ) {
    return this.categoryService.getById(id, user.id)
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput,
    @GqlUser() user: User
  ) {
    return this.categoryService.update(data, user.id)
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('id', () => String) id: string,
    @GqlUser() user: User
  ) {
    this.categoryService.delete(id, user.id)

    return true
  }

  @FieldResolver(() => UserModel)
  async user(@Root() category: CategoryModel) {
    return this.userService.getById(category.userId)
  }
}
