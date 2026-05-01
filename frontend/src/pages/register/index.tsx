import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { LockIcon, LogInIcon, MailIcon, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod/v3'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LinkButton } from '@/components/ui/link-button'
import { useAuthStore } from '@/store/auth'

export const Route = createFileRoute('/register/')({
  component: RegisterPage
})

const registerSchema = z.object({
  name: z.string().nonempty({ message: 'O nome deve ser informado' }),
  email: z
    .string()
    .email({ message: 'E-mail inválido' })
    .nonempty({ message: 'O e-mail deve ser informado' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
})

type RegisterSchema = z.infer<typeof registerSchema>

function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const registerUser = useAuthStore((state) => state.register)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const nameValue = watch('name')
  const emailValue = watch('email')
  const passwordValue = watch('password')

  async function onSubmit({ name, email, password }: RegisterSchema) {
    try {
      setIsLoading(true)
      const isRegistered = await registerUser({
        name,
        email,
        password
      })

      if (isRegistered) {
        toast.success('Conta criada com sucesso!')
      } else {
        toast.error('Erro ao tentar criar conta')
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao criar sua conta.')
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
          <h1 className="text-xl text-gray-800 font-semibold">Criar conta</h1>
          <span className="text-base text-gray-600">
            Preencha os dados para começar
          </span>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Nome completo"
              icon={UserIcon}
              id="name"
              error={errors.name?.message}
              disabled={isLoading}
              isFilled={!!nameValue}
              placeholder="Seu nome completo"
              {...register('name')}
            />

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
              hint="A senha deve ter no mínimo 8 caracteres"
              {...register('password')}
            />
          </div>

          <Button type="submit" isLoading={isLoading}>
            Cadastrar
          </Button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-0 w-10 border-t border-gray-300" />
            <span className="text-sm text-gray-500">ou</span>
            <div className="flex-1 h-0 w-10 border-t border-gray-300" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">Já tem uma conta?</span>

            <LinkButton to="/login" icon={LogInIcon}>
              Fazer login
            </LinkButton>
          </div>
        </form>
      </div>
    </div>
  )
}
