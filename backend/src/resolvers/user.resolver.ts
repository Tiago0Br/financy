import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { UpdateUserInput } from '@/dtos/input/user.input.js'
import type { User } from '@/generated/prisma/client.js'
import { GqlUser } from '@/graphql/decorators/user.decorator.js'
import { IsAuth } from '@/middlewares/auth.middleware.js'
import { UserModel } from '@/models/user.model.js'
import { UpdateUserUseCase } from '@/use-cases/users/update-user.js'

@Service()
@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {
  @Inject(() => UpdateUserUseCase)
  private readonly updateUserUseCase!: UpdateUserUseCase

  @Mutation(() => UserModel)
  async updateUser(
    @Arg('data', () => UpdateUserInput) data: UpdateUserInput,
    @GqlUser() user: User
  ) {
    return this.updateUserUseCase.execute(data, user.id)
  }

  @Query(() => UserModel)
  async getUser(@GqlUser() user: User) {
    return user
  }
}
