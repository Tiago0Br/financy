import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth'

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated

    if (isAuthenticated) {
      throw redirect({
        to: '/'
      })
    }
  },
  component: () => <Outlet />
})
