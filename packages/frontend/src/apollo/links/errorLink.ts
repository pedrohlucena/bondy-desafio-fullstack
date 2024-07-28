import { ERRORS } from '@/models'
import { onError } from '@apollo/client/link/error'

const errorLink = onError(({ graphQLErrors }) => {
  if (!graphQLErrors) {
    return
  }

  for (const error of graphQLErrors) {
    if (error.extensions?.code === ERRORS.UNAUTHORIZED) {
      window.location.href = '/login'
    }
  }
})

export default errorLink
