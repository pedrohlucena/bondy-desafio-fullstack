'use client'

import { Container, Typography } from '@mui/material'
import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '@/apollo/mutations'
import { TextField, Button } from '@/components'
import { useRouter } from 'next/navigation'
import { useLoginForm } from '@/hooks'
import { setAuthorizationHeader } from '@/common/utils'

export default function Login() {
  const { form, errors } = useLoginForm()

  const { email, password } = form.watch()

  const router = useRouter()

  const [login] = useMutation(LOGIN_MUTATION)

  const emailField = form.control.register('email')
  const passwordField = form.control.register('password')

  const handleLogin = async () => {
    const email = form.getValues('email')
    const password = form.getValues('password')

    try {
      const { data } = await login({ variables: { email, password } })

      const accessToken = data.login.access_token

      setAuthorizationHeader(accessToken)

      router.push('/')
    } catch (err) {}
  }

  const thereAreErrors = Object.keys(errors).length >= 1
  const disableLogin = thereAreErrors || email === '' || password === ''

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <TextField
        type="email"
        label="E-mail"
        inputRef={emailField.ref}
        error={!!errors.email}
        helperText={errors.email?.message}
        {...emailField}
      />

      <TextField
        type="password"
        label="Senha"
        inputRef={passwordField.ref}
        error={!!errors.password}
        helperText={errors.password?.message}
        {...passwordField}
      />

      <Button disabled={disableLogin} onClick={handleLogin}>
        Login
      </Button>
    </Container>
  )
}
