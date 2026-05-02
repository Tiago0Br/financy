import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { LockIcon, MailIcon, UserRoundPlusIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod/v3'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LinkButton } from '@/components/ui/link-button'
import { useAuthStore } from '@/store/auth'

type LoginSearch = {
  redirect?: string
}

export const Route = createFileRoute('/_auth/login/')({
  validateSearch: (search: Record<string, unknown>): LoginSearch => {
    return {
      redirect: search.redirect as string | undefined
    }
  },
  component: LoginPage
})

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'E-mail inválido' })
    .nonempty({ message: 'O nome deve ser informado' }),
  password: z.string().nonempty('A senha deve ser informada')
})

type LoginSchema = z.infer<typeof loginSchema>

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()
  const { redirect } = Route.useSearch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const emailValue = watch('email')
  const passwordValue = watch('password')

  async function onSubmit({ email, password }: LoginSchema) {
    try {
      setIsLoading(true)
      const isLogged = await login({
        email,
        password
      })

      if (isLogged) {
        toast.success('Login efetuado com sucesso!')
        navigate({ to: redirect || '/' })
      } else {
        toast.error('Erro ao tentar fazer login')
      }
    } catch (error) {
      toast.error('Credenciais inválidas!')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-12 px-2 md:px-0 flex flex-col items-center gap-8">
      <img src="/logo.svg" alt="Logo Financy" draggable="false" />

      <div className="w-full max-w-md bg-white p-8 rounded-lg border border-gray-200 space-y-8">
        <div className="flex flex-col gap-1 items-center">
          <h1 className="text-xl text-gray-800 font-semibold">Fazer login</h1>
          <span className="text-base text-gray-600">
            Entre na sua conta para continuar
          </span>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="E-mail"
              icon={MailIcon}
              id="email"
              error={errors.email?.message}
              disabled={isLoading}
              isFilled={!!emailValue}
              placeholder="mail@exemplo.com"
              {...register('email')}
            />

            <Input
              label="Senha"
              icon={LockIcon}
              id="password"
              type="password"
              error={errors.password?.message}
              disabled={isLoading}
              isFilled={!!passwordValue}
              placeholder="Digite sua senha"
              {...register('password')}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="recovery-password"
                  name="recovery-password"
                />
                <label
                  htmlFor="recovery-password"
                  className="text-sm text-gray-700"
                >
                  Lembrar-me
                </label>
              </div>
              <span className="text-brand-base text-sm">Recuperar senha</span>
            </div>
          </div>

          <Button type="submit" isLoading={isLoading}>
            Entrar
          </Button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-0 w-10 border-t border-gray-300" />
            <span className="text-sm text-gray-500">ou</span>
            <div className="flex-1 h-0 w-10 border-t border-gray-300" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">
              Ainda não tem uma conta?
            </span>

            <LinkButton to="/register" icon={UserRoundPlusIcon}>
              Criar conta
            </LinkButton>
          </div>
        </form>
      </div>
    </div>
  )
}
