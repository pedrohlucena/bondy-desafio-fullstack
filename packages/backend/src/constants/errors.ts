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
}

export default ERRORS
