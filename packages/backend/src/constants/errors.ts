import { GraphQLError } from 'graphql'

const ERRORS = {
  INTERNAL_SERVER_ERROR: new GraphQLError('Internal server error', {
    extensions: {
      code: '001',
      http: { status: 500 },
    },
  }),
  UNAUTHORIZED: new GraphQLError(
    'You are not allowed to access this resource',
    {
      extensions: {
        code: '002',
        http: { status: 401 },
      },
    }
  ),
  USER_NOT_FOUND: new GraphQLError('User not found', {
    extensions: {
      code: '003',
      http: { status: 500 },
    },
  }),
}

export default ERRORS
