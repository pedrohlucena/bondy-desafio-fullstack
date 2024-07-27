import gql from 'graphql-tag'
import authTypeDefs from 'src/typeDefs/authPayload'

export default gql`
  ${authTypeDefs}

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    logout: Boolean!
  }
`
