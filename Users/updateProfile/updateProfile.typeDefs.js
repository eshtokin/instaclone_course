import { gql } from 'apollo-server'

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
    ): updateProfileResults!
  }
`
