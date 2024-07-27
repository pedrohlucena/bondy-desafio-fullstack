import { gql } from '@apollo/client'

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      user {
        _id
        name
        email
        company
      }
    }
  }
`

export default LOGIN_MUTATION
