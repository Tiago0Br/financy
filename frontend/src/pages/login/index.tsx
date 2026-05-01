import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link } from '@tanstack/react-router'
import { LockIcon, MailIcon, UserRoundPlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod/v3'
import { useAuthStore } from '@/store/auth'

export const Route = createFileRoute('/login/')({
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
  const login = useAuthStore((state) => state.login)

  const { register, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit({ email, password }: LoginSchema) {
    try {
      const isLogged = await login({
        email,
        password
      })

      if (isLogged) {
        toast.success('Login efetuado com sucesso!')
      } else {
        toast.error('Erro ao tentar fazer login')
      }
    } catch (error) {
      toast.error('Credenciais inválidas!')
      console.error(error)
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
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm text-gray-700">
                E-mail
              </label>
              <div className="p-2.5 flex items-center gap-2 rounded-lg border border-gray-300">
                <MailIcon className="size-4 text-gray-400" />
                <input
                  {...register('email')}
                  id="email"
                  placeholder="mail@exemplo.com"
                  className="flex-1 placeholder:text-gray-400 outline-none text-gray-800"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm text-gray-700">
                Senha
              </label>
              <div className="p-2.5 flex items-center gap-2 rounded-lg border border-gray-300">
                <LockIcon className="size-4 text-gray-400" />
                <input
                  {...register('password')}
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  className="flex-1 placeholder:text-gray-400 outline-none text-gray-800"
                />
              </div>
            </div>
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

          <button
            type="submit"
            className="w-full py-2 bg-brand-base text-white rounded-md cursor-pointer"
          >
            Entrar
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-0 w-10 border-t border-gray-300" />
            <span className="text-sm text-gray-500">ou</span>
            <div className="flex-1 h-0 w-10 border-t border-gray-300" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">
              Ainda não tem uma conta?
            </span>

            <Link
              to="/register"
              className="w-full rounded-md border border-gray-300 cursor-pointer py-2 flex justify-center items-center gap-2 text-gray-700"
            >
              <UserRoundPlusIcon className="size-4.5" />
              Criar conta
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
