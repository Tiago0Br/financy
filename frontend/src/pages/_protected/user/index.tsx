import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { LogOutIcon, MailIcon, UserIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod/v3'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/store/auth'

export const Route = createFileRoute('/_protected/user/')({
  component: UserPage
})

const userSchema = z.object({
  name: z.string().nonempty('O nome deve ser informado'),
  email: z.string().email('E-mail inválido')
})

type UserSchema = z.infer<typeof userSchema>

function UserPage() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? ''
    }
  })

  const nameValue = watch('name')

  function handleLogout() {
    logout()
    navigate({ to: '/login' })
    toast.success('Logout efetuado com sucesso!')
  }

  async function onSubmit(data: UserSchema) {
    console.log('Update user data:', data)
    toast.info(
      'A funcionalidade de salvar alterações será implementada em breve.'
    )
  }

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '??'

  return (
    <div className="pt-12 px-2 md:px-0 flex flex-col items-center gap-8">
      <div className="w-full max-w-md bg-white p-8 rounded-lg border border-gray-200 space-y-8">
        <div className="flex flex-col items-center gap-4">
          <div className="size-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-800 text-2xl font-semibold">
            {initials}
          </div>

          <div className="flex flex-col items-center gap-1">
            <h1 className="text-xl text-gray-800 font-semibold">
              {user?.name}
            </h1>
            <span className="text-base text-gray-500">{user?.email}</span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Nome completo"
              icon={UserIcon}
              id="name"
              error={errors.name?.message}
              isFilled={!!nameValue}
              placeholder="Seu nome"
              {...register('name')}
            />

            <Input
              label="E-mail"
              icon={MailIcon}
              id="email"
              disabled
              hint="O e-mail não pode ser alterado"
              error={errors.email?.message}
              isFilled={true}
              {...register('email')}
            />
          </div>

          <div className="space-y-3">
            <Button type="submit">Salvar alterações</Button>

            <Button
              type="button"
              variant="outline"
              icon={LogOutIcon}
              onClick={handleLogout}
            >
              Sair da conta
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
