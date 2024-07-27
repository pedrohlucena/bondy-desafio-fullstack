'use client'

import { Container, Typography } from '@mui/material'
import { Button } from '@/components'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery } from '@apollo/client'
import { USER_QUERY } from '@/apollo/queries'
import client from '@/apollo/client'
import { LOGOUT_MUTATION } from '@/apollo/mutations'

export default function Home() {
  const router = useRouter()

  const { data, loading } = useQuery(USER_QUERY, { client })

  const [logout] = useMutation(LOGOUT_MUTATION)

  const user = data?.user

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <Container maxWidth="sm">
      {!loading && (
        <>
          <Typography variant="h4" gutterBottom>
            Bem-vindo(a), {user.name}!
          </Typography>

          <Typography variant="h6">Empresa: {user.company}</Typography>

          <Typography variant="h6">E-mail: {user.email}</Typography>

          <Button theme="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}

      {loading && (
        <Typography variant="h4" gutterBottom>
          Carregando...
        </Typography>
      )}
    </Container>
  )
}
