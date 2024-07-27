import gql from 'graphql-tag'

export default gql`
  type Query {
    user(id: String): User
  }
`
