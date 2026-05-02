import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth'

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ location }) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated

    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      })
    }
  },
  component: () => <Outlet />
})
