import 'reflect-metadata'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import cors from 'cors'
import express from 'express'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'
import { env } from './env.js'
import { formatError } from './errors/format-error.js'
import { buildContext } from './graphql/context/index.js'
import { AuthResolver } from './resolvers/auth.resolver.js'
import { CategoryResolver } from './resolvers/category.resolver.js'
import { TransactionResolver } from './resolvers/transaction.resolver.js'
import { UserResolver } from './resolvers/user.resolver.js'

const app = express()

app.use(
  cors({
    origin: env.FRONTEND_URL
  })
)

const schema = await buildSchema({
  resolvers: [
    AuthResolver,
    UserResolver,
    CategoryResolver,
    TransactionResolver
  ],
  container: Container,
  validate: false,
  emitSchemaFile: './schema.graphql'
})

const server = new ApolloServer({
  schema,
  formatError
})

await server.start()

app.use(
  '/graphql',
  express.json(),
  expressMiddleware(server, {
    context: buildContext
  })
)

app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}/graphql`)
})
