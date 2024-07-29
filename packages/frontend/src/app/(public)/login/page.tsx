'use client'

import { Container, Typography } from '@mui/material'
import { ApolloError, useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '@/apollo/mutations'
import { TextField, Button } from '@/components'
import { useRouter } from 'next/navigation'
import { useLoginForm } from '@/hooks'
import { setAuthorizationHeader } from '@/common/utils'
import { ApolloNetworkError, ERRORS, LoginResponse } from '@/models'

export default function Login() {
  const { form, errors } = useLoginForm()

  const { email, password } = form.watch()

  const router = useRouter()

  const [login, { loading }] = useMutation(LOGIN_MUTATION)

  const emailField = form.control.register('email')
  const passwordField = form.control.register('password')

  const handleSuccessfulLogin = (data: LoginResponse) => {
    const accessToken = data.login.access_token
    setAuthorizationHeader(accessToken)
    router.push('/')
  }

  const handleUnsuccessfulLogin = (error: ApolloError) => {
    const errors = error.networkError as unknown as ApolloNetworkError

    for (const error of errors.result.errors) {
      if (error.extensions?.code === ERRORS.INVALID_CREDENTIAL) {
        form.setError('email', {})
        form.setError('password', { message: 'Usuário ou senha inválidos' })
      }
    }
  }

  const handleLogin = async () => {
    const email = form.getValues('email')
    const password = form.getValues('password')

    try {
      const { data } = await login({
        variables: { email, password },
      })

      handleSuccessfulLogin(data)
    } catch (error) {
      handleUnsuccessfulLogin(error as ApolloError)
    }
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
        {loading ? 'Carregando...' : 'Login'}
      </Button>
    </Container>
  )
}
