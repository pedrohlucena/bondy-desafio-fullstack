import { env } from '@/configs'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'
import link from '@/apollo/links'

if (env.NEXT_PUBLIC_NODE_ENV === 'local') {
  loadDevMessages()
  loadErrorMessages()
}

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client
