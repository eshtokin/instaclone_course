import bcrypt from "bcrypt"
import client from "../../client"

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password },
    ) => {
      try {
        // check email and username for duplicate
        const existingUser = await client.user.findFirst({
          where: { OR: [{ userName }, { email }] },
        })

        if (existingUser !== null)
          throw Error('This username or email already taken!')

        // hash the password
        const hashingPassword = await bcrypt.hash(password)

        // save and return the user
        return client.user.create({
          data: {
            firstName,
            lastName,
            userName,
            email,
            password: hashingPassword,
          },
        })
      } catch (error) {
        return error
      }
    },
  },
}