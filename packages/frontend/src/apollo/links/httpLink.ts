import { env } from '@/configs'
import { createHttpLink } from '@apollo/client'

const uri = env.NEXT_PUBLIC_API_BASE_URL + '/local/desafio'

const httpLink = createHttpLink({
  uri,
  credentials: 'include',
})

export default httpLink
