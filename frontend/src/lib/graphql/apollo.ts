import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'
import { env } from '@/env'
import { useAuthStore } from '@/store/auth'

const httpLink = new HttpLink({
  uri: env.VITE_API_URL
})

const authLink = new SetContextLink((prevContext) => {
  const token = useAuthStore.getState().token
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache()
})
