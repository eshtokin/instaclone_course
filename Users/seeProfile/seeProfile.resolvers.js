import client from '../../client'

export default {
  Query: {
    seeProfile: async (_, { userName }) => {
      return client.user.findUnique({ where: { userName } })
    },
  },
}