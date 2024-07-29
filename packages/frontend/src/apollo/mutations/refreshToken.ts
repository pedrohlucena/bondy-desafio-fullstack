import { gql } from '@apollo/client'

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken {
    refreshToken {
      access_token
    }
  }
`

export default REFRESH_TOKEN_MUTATION
