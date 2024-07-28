import { ApolloLink } from '@apollo/client'
import httpLink from '@/apollo/links/httpLink'
import errorLink from '@/apollo/links/errorLink'

const link = ApolloLink.from([errorLink, httpLink])

export default link
