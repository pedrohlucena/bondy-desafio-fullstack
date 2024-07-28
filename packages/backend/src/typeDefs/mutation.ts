import gql from 'graphql-tag'
import authTypeDefs from 'src/typeDefs/authPayload'
import refreshTokenTypeDefs from 'src/typeDefs/refreshTokenPayload'

export default gql`
  ${authTypeDefs}
  ${refreshTokenTypeDefs}

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    logout: Boolean!
    refreshToken(refreshToken: String): RefreshTokenPayload!
  }
`
