import { GraphQLError } from 'graphql'
import { ERRORS } from 'src/constants'

export default function errorResponse(error: unknown) {
  if (error instanceof GraphQLError) {
    throw error
  }

  throw ERRORS.INTERNAL_SERVER_ERROR
}
