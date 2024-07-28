import client from '@/apollo/client'
import { setContext } from '@apollo/client/link/context'

export default function setAuthorizationHeader(accessToken: string) {
  const bearerToken = `Bearer ${accessToken}`

  const authorization = accessToken ? bearerToken : ''

  const authLink = setContext((_, previousContext) => {
    return {
      headers: {
        ...previousContext.headers,
        Authorization: authorization,
      },
    }
  })

  client.setLink(authLink.concat(client.link))
}
