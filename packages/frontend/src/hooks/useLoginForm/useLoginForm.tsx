'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, PropsWithChildren, useContext, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { LoginFormContext } from './types'
import { loginSchema } from '@/schemas'
import { LoginFormModel } from '@/models'

const FormContext = createContext<LoginFormContext>({} as LoginFormContext)

function LoginFormProvider({ children }: PropsWithChildren) {
  const form = useForm<LoginFormModel>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginSchema),
  })

  const context = useMemo(
    () => ({
      form,
    }),
    [form, form.formState],
  )

  return <FormContext.Provider value={context}>{children}</FormContext.Provider>
}

function useLoginForm() {
  const context = useContext(FormContext)
  return context
}

export { LoginFormProvider, useLoginForm }
