import gql from 'graphql-tag'
import pubkeyTypeDefs from 'src/typeDefs/pubkeyPayload'

export default gql`
  ${pubkeyTypeDefs}

  type Query {
    user(id: String): User
    pubkey: PubkeyPayload!
  }
`
