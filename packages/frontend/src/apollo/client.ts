import { env } from '@/configs'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'

if (env.NEXT_PUBLIC_NODE_ENV === 'local') {
  loadDevMessages()
  loadErrorMessages()
}

const uri = env.NEXT_PUBLIC_API_BASE_URL + '/local/desafio'

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
})

export default client
