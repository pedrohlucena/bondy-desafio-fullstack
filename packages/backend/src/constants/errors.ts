import { GraphQLError } from 'graphql'

const ERRORS = {
  UNAUTHORIZED: new GraphQLError(
    'You are not allowed to access this resource',
    {
      extensions: {
        code: '001',
        http: { status: 401 },
      },
    }
  ),
}

export default ERRORS
