import { gql } from '@apollo/client'
import { userTypeDefs } from '@/apollo/typeDefs'

export const USER_QUERY = gql`
  ${userTypeDefs}

  query User($id: String) {
    user(id: $id): User
  }
`
