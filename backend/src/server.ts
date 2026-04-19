import 'reflect-metadata'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import express from 'express'
import { buildSchema } from 'type-graphql'
import { env } from './env.js'
import { buildContext } from './graphql/context/index.js'
import { AuthResolver } from './resolvers/auth.resolver.js'
import { CategoryResolver } from './resolvers/category.resolver.js'
import { TransactionResolver } from './resolvers/transaction.resolver.js'

const app = express()

const schema = await buildSchema({
  resolvers: [AuthResolver, CategoryResolver, TransactionResolver],
  validate: false,
  emitSchemaFile: './schema.graphql'
})

const server = new ApolloServer({
  schema
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
