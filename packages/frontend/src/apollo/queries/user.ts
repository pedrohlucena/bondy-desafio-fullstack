import { gql } from '@apollo/client'

export const USER_QUERY = gql`
  query User($id: String) {
    user(id: $id) {
      name
      email
      company
    }
  }
`
