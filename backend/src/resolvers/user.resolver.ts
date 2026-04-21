import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { UpdateUserInput } from '@/dtos/input/user.input.js'
import type { User } from '@/generated/prisma/client.js'
import { GqlUser } from '@/graphql/decorators/user.decorator.js'
import { IsAuth } from '@/middlewares/auth.middleware.js'
import { UserModel } from '@/models/user.model.js'
import { UserService } from '@/services/user.service.js'

@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {
  private readonly userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Arg('data', () => UpdateUserInput) data: UpdateUserInput,
    @GqlUser() user: User
  ) {
    return this.userService.update(data, user.id)
  }
}
