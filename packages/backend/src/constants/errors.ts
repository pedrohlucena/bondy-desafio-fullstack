import { GraphQLError } from 'graphql'
import HTTP_STATUS_CODE from './httpStatusCode'

const ERRORS = {
  INTERNAL_SERVER_ERROR: new GraphQLError('Internal server error', {
    extensions: {
      code: '001',
      http: { status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR },
    },
  }),
  UNAUTHORIZED: new GraphQLError(
    'You are not allowed to access this resource',
    {
      extensions: {
        code: '002',
        http: { status: HTTP_STATUS_CODE.UNAUTHORIZED },
      },
    }
  ),
  USER_NOT_FOUND: new GraphQLError('User not found', {
    extensions: {
      code: '003',
      http: { status: HTTP_STATUS_CODE.NOT_FOUND },
    },
  }),
  INCORRECT_CREDENTIAL: new GraphQLError('Incorrect email or password', {
    extensions: {
      code: '004',
      http: { status: HTTP_STATUS_CODE.BAD_REQUEST },
    },
  }),
}

export default ERRORS
