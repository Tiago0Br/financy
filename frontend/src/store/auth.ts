import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apolloClient } from '@/lib/graphql/apollo'
import { LOGIN } from '@/lib/graphql/mutations/login'

interface User {
  id: string
  name: string
  email: string
  createdAt?: string
  updatedAt?: string
}

interface LoginInput {
  email: string
  password: string
}

type LoginMutationData = {
  login: {
    token: string
    refreshToken: string
    user: User
  }
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (data: LoginInput) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (loginData: LoginInput) => {
        try {
          const { data } = await apolloClient.mutate<
            LoginMutationData,
            { data: LoginInput }
          >({
            mutation: LOGIN,
            variables: {
              data: {
                email: loginData.email,
                password: loginData.password
              }
            }
          })

          if (data?.login) {
            const { user, token } = data.login
            set({
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
              },
              token,
              isAuthenticated: true
            })
            return true
          }
          return false
        } catch (error) {
          console.log('Erro ao fazer o login')
          throw error
        }
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        })
        apolloClient.clearStore()
      }
    }),
    {
      name: '@financy:auth-storage'
    }
  )
)
