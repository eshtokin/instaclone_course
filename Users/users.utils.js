import jwt from 'jsonwebtoken'
import client from '../client'

export const getUserFromToken = async (token) => {
  try {
    if (!token) return null

    const { id } = await jwt.verify(token, process.env.SECRET_KEY)

    if (!id) return null

    const user = await client.user.findUnique({ where: { id } })

    if (!user) return null

    return user
  } catch (e) {
    console.log('Error when get user from token')
  }
}

export function protectedResolver(resolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: 'Please log in to perfom this action',
      }
    }

    return resolver(root, args, context, info)
  }
}
