require('dotenv').config()
import { ApolloServer } from 'apollo-server'
import { typeDefs, resolvers } from './schema'
import { getUserFromToken } from './Users/users.utils'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUserFromToken(req.headers.token),
    }
  },
})

const PORT = process.env.PORT

server.listen(PORT).then(() => {
  console.log(`sercer is run on http://localhost:${PORT}/`)
})
