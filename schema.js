import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { getUserFromToken } from './Users/users.utils'

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`)
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`)

export const typeDefs = mergeTypeDefs(loadedTypes)
export const resolvers = mergeResolvers(loadedResolvers)

export const context = async ({ req }) => {
  return {
    loggedUser: await getUserFromToken(req.headers.token),
  }
}