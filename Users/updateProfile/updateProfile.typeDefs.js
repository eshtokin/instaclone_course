import { gql } from 'apollo-server-express'

export default gql`
  type updateProfileResults {
    ok: Boolean!
    user: User,
    error: String
  }
  type Mutation {
    updateProfile(
      firstName: String
      lastName: String
      userName: String
      email: String
      password: String
      bio: String
      avatar: Upload
    ): updateProfileResults!
  }
`
