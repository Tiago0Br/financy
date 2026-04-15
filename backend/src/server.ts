import 'reflect-metadata'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import express from 'express'
import { buildSchema } from 'type-graphql'
import { ExampleResolver } from './resolvers/example.resolver.js'

const app = express()

const schema = await buildSchema({
  resolvers: [ExampleResolver],
  validate: false,
  emitSchemaFile: './schema.graphql'
})

const server = new ApolloServer({
  schema
})

await server.start()

app.use('/graphql', express.json(), expressMiddleware(server))

app.listen(4000, () => {
  console.log('Servidor iniciado na porta 4000')
})
