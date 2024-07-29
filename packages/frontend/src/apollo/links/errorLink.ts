import { ERRORS, RefreshTokenResponse } from '@/models'
import {
  FetchResult,
  GraphQLRequest,
  Observable,
  Operation,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { REFRESH_TOKEN_MUTATION } from '@/apollo/mutations'
import client from '@/apollo/client'

function setBearerToken(operation: Operation, accessToken?: string) {
  const operationHeaders = operation.getContext().headers

  const authorization = accessToken ? `Bearer ${accessToken}` : ''

  operation.setContext({
    headers: {
      ...operationHeaders,
      authorization,
    },
  })
}

const refreshToken = async () => {
  const { data } = await client.mutate<RefreshTokenResponse>({
    mutation: REFRESH_TOKEN_MUTATION,
  })

  const accessToken = data?.refreshToken.access_token

  return accessToken
}

function isRefreshRequest(operation: GraphQLRequest) {
  return operation.operationName === 'RefreshToken'
}

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (!graphQLErrors) return

  for (const err of graphQLErrors) {
    const refreshTokenRequest = isRefreshRequest(operation)

    const code = err.extensions?.code

    if (code === ERRORS.UNAUTHORIZED && refreshTokenRequest) {
      window.location.href = '/login'
      return
    }

    if (code === ERRORS.UNAUTHORIZED && !refreshTokenRequest) {
      const observable = new Observable<FetchResult>((observer) => {
        ;(async () => {
          try {
            const accessToken = await refreshToken()

            setBearerToken(operation, accessToken)

            const subscriber = {
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            }

            forward(operation).subscribe(subscriber)
          } catch (err) {
            observer.error(err)
          }
        })()
      })

      return observable
    }
  }
})

export default errorLink
