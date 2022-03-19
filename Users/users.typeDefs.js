import { gql } from 'apollo-server-express'

export default gql`
  scalar Upload
  type User {
    id: String!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }
`
