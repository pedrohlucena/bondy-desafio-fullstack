import gql from 'graphql-tag'

export default gql`
  type RefreshTokenPayload {
    access_token: String!
  }
`
