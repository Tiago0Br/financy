import { useMutation, useQuery } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { LogOutIcon, MailIcon, UserIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UPDATE_USER } from '@/lib/graphql/mutations/user'
import { GET_USER } from '@/lib/graphql/queries/user'
import { useAuthStore } from '@/store/auth'
import { getInitials } from '@/utils/get-initials'
import { type UserSchema, userSchema } from '@/utils/schemas'
import type { User } from '@/utils/types'

export const Route = createFileRoute('/_protected/user/')({
  component: UserPage
})

function UserPage() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const setUser = useAuthStore((state) => state.setUser)
  const navigate = useNavigate()

  const { data, loading: isLoadingUser } = useQuery<{ getUser: User }>(GET_USER)
  const [updateUser, { loading: isUpdatingUser }] = useMutation(UPDATE_USER)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? ''
    }
  })

  useEffect(() => {
    if (data?.getUser) {
      reset({
        name: data.getUser.name,
        email: data.getUser.email
      })
      setUser(data.getUser)
    }
  }, [data, reset, setUser])

  const nameValue = watch('name')

  function handleLogout() {
    logout()
    navigate({ to: '/login' })
    toast.success('Logout efetuado com sucesso!')
  }

  async function onSubmit(formData: UserSchema) {
    try {
      await updateUser({
        variables: {
          data: {
            name: formData.name
          }
        }
      })

      if (user) {
        setUser({
          ...user,
          name: formData.name
        })
      }

      toast.success('Perfil atualizado com sucesso!')
    } catch (_error) {
      toast.error('Erro ao atualizar perfil. Tente novamente.')
    }
  }

  const initials = getInitials(user?.name)

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
              disabled={isLoadingUser || isUpdatingUser}
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
            <Button type="submit" isLoading={isUpdatingUser}>
              Salvar alterações
            </Button>

            <Button
              type="button"
              variant="outline"
              icon={LogOutIcon}
              onClick={handleLogout}
              disabled={isUpdatingUser}
            >
              Sair da conta
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
