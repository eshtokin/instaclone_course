import { hash } from 'bcrypt'
import client from '../../client'

export default {
  Mutation: {
    updateProfile: async (
      _,
      { firstName, lastName, userName, email, password },
    ) => {
      const hashingPassword = password ? await hash(password, 10) : null

      const updatedUser = await client.user.update({
        where: { id: 3 },
        data: {
          firstName,
          lastName,
          userName,
          email,
          ...(hashingPassword && { password: hashingPassword }),
        },
      })

      if (updatedUser) {
        return {
          ok: true,
          user: updatedUser
        }
      }

      return {
        ok: false,
        error: 'Cannot update user',
      }
    },
  },
}
