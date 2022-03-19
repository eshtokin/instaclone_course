require('dotenv').config()
import http from 'http'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { typeDefs, resolvers, context } from './schema'


;(async function startApolloServer(typeDefs, resolvers, context) {
  const PORT = process.env.PORT
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()
  server.applyMiddleware({ app })

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve))
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})(typeDefs, resolvers, context)
