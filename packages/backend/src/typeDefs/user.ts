import gql from 'graphql-tag'

export default gql`
  type User {
    _id: String!
    name: String!
    email: String!
    company: String
  }
`
