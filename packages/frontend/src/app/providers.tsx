'use client'

import client from '@/apollo/client'
import { LoginFormProvider } from '@/hooks'
import { ApolloProvider } from '@apollo/client'
import { PropsWithChildren } from 'react'

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <ApolloProvider client={client}>
        <LoginFormProvider>{children}</LoginFormProvider>
      </ApolloProvider>
    </>
  )
}
