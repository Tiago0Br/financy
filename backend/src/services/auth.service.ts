import type { LoginInput, RegisterInput } from '@/dtos/input/auth.input.js'
import type { User } from '@/generated/prisma/client.js'
import { prisma } from '@/lib/prisma.js'
import { comparePassword, hashPassword } from '@/utils/hash.js'
import { signJwt } from '@/utils/jwt.js'

export class AuthService {
  async login(data: LoginInput) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: data.email
      }
    })

    if (!existingUser) {
      throw new Error('User do not exists.')
    }

    const compare = await comparePassword(
      data.password,
      existingUser.password ?? ''
    )

    if (!compare) {
      throw new Error('Invalid Password!')
    }

    return this.generateToken(existingUser)
  }

  async register(data: RegisterInput) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: data.email
      }
    })

    if (existingUser) {
      throw new Error('User already exists.')
    }

    const passwordHash = await hashPassword(data.password)

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash
      }
    })

    return this.generateToken(user)
  }

  private generateToken(user: User) {
    const token = signJwt(
      {
        id: user.id,
        email: user.email
      },
      '1d'
    )

    const refreashToken = signJwt(
      {
        id: user.id,
        email: user.email
      },
      '1d'
    )

    return {
      token,
      refreashToken,
      user
    }
  }
}
