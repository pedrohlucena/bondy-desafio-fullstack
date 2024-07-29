import gql from 'graphql-tag'

export default gql`
  type PubkeyPayload {
    public_key: String!
  }
`
