'use client'

import { useState } from 'react'
import { Container, Typography } from '@mui/material'
import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '@/apollo/mutations'
import { TextField, Button } from '@/components'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const [login] = useMutation(LOGIN_MUTATION)

  const handleLogin = async () => {
    try {
      await login({ variables: { email, password } })
      router.push('/welcome')
    } catch (err) {}
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <TextField
        type="email"
        label="E-mail"
        value={email}
        onChange={handleEmailChange}
      />

      <TextField
        type="password"
        label="Senha"
        value={password}
        onChange={handlePasswordChange}
      />

      <Button onClick={handleLogin}>Login</Button>
    </Container>
  )
}
