'use client'

import { Container, Typography } from '@mui/material'
import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '@/apollo/mutations'
import { TextField, Button } from '@/components'
import { useRouter } from 'next/navigation'
import { useLoginForm } from '@/hooks'

export default function Login() {
  const { form } = useLoginForm()

  const router = useRouter()

  const [login] = useMutation(LOGIN_MUTATION)

  const email = form.control.register('email')
  const password = form.control.register('password')

  const handleLogin = async () => {
    const email = form.getValues('email')
    const password = form.getValues('password')

    try {
      await login({ variables: { email, password } })
      router.push('/')
    } catch (err) {}
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <TextField type="email" label="E-mail" inputRef={email.ref} {...email} />

      <TextField
        type="password"
        label="Senha"
        inputRef={password.ref}
        {...password}
      />

      <Button onClick={handleLogin}>Login</Button>
    </Container>
  )
}
