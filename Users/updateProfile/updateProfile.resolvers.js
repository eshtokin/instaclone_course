import { hash } from 'bcrypt'
import client from '../../client'
import { protectedResolver } from '../users.utils'
// import fs from 'fs'

export default {
  Mutation: {
    updateProfile: protectedResolver(
      async (
        _,
        { firstName, lastName, userName, email, password, bio, avatar },
        { loggedInUser },
      ) => {
        console.log({
          avatar
        })
        // action for save uploaded file
        // const {filename, createReadStream} = await avatar;
        // const readStream = createReadStream()
        // const writeStream = fs.createReadStream(process.cwd() + "/uploads" + filename)
        // writeStream.pipe(readStream)

        const hashingPassword = password ? await hash(password, 10) : null

        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            firstName,
            lastName,
            userName,
            email,
            bio,
            ...(hashingPassword && { password: hashingPassword }),
          },
        })

        if (updatedUser) {
          return {
            ok: true,
            user: updatedUser,
          }
        }

        return {
          ok: false,
          error: 'Cannot update user',
        }
      },
    ),
  },
}
