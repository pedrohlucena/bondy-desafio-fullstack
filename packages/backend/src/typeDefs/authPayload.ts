import gql from 'graphql-tag'
import userTypeDefs from 'src/typeDefs/user'

export default gql`
  ${userTypeDefs}

  type AuthPayload {
    user: User!
  }
`
