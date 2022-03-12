import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import client from '../../client'

export default {
  Mutation: {
    login: async (_, { userName, password }) => {
      // Find user with userName
      const user = await client.user.findUnique({ where: { userName } })
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        }
      }
      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        return {
          ok: false,
          error: 'Credentions are incorrect',
        }
      }
      // Send issue or token
      const dataForToken = {
        id: user.id,
        userName: user.userName,
      }
      const token = await jwt.sign(dataForToken, process.env.SECRET_KEY)
      return {
        ok: true,
        token,
      }
    },

  },
}