import { Arg, Mutation, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'
import {
  LoginInput,
  RefreshTokenInput,
  RegisterInput
} from '@/dtos/input/auth.input.js'
import { LoginOutput, RegisterOutput } from '@/dtos/output/auth.output.js'
import { LoginUseCase } from '@/use-cases/auth/login.js'
import { RefreshTokenUseCase } from '@/use-cases/auth/refresh-token.js'
import { RegisterUseCase } from '@/use-cases/auth/register.js'

@Service()
@Resolver()
export class AuthResolver {
  @Inject(() => LoginUseCase)
  private readonly loginUseCase!: LoginUseCase

  @Inject(() => RegisterUseCase)
  private readonly registerUseCase!: RegisterUseCase

  @Inject(() => RefreshTokenUseCase)
  private readonly refreshTokenUseCase!: RefreshTokenUseCase

  @Mutation(() => LoginOutput)
  async login(@Arg('data', () => LoginInput) data: LoginInput) {
    return this.loginUseCase.execute(data)
  }

  @Mutation(() => RegisterOutput)
  async register(@Arg('data', () => RegisterInput) data: RegisterInput) {
    return this.registerUseCase.execute(data)
  }

  @Mutation(() => LoginOutput)
  async refreshToken(
    @Arg('data', () => RefreshTokenInput) data: RefreshTokenInput
  ) {
    return this.refreshTokenUseCase.execute(data)
  }
}
