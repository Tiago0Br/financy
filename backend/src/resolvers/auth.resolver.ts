import { Arg, Mutation, Resolver } from 'type-graphql'
import { LoginInput, RegisterInput } from '@/dtos/input/auth.input.js'
import { LoginOutput, RegisterOutput } from '@/dtos/output/auth.output.js'
import { AuthService } from '@/services/auth.service.js'

@Resolver()
export class AuthResolver {
  private readonly authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  @Mutation(() => LoginOutput)
  async login(@Arg('data', () => LoginInput) data: LoginInput) {
    return this.authService.login(data)
  }

  @Mutation(() => RegisterOutput)
  async register(@Arg('data', () => RegisterInput) data: RegisterInput) {
    return this.authService.register(data)
  }
}
