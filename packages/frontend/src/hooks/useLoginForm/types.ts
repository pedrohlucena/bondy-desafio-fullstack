import { LoginForm, LoginFormModel } from '@/models'
import { FieldErrors } from 'react-hook-form'

export type LoginFormContext = {
  form: LoginForm
  errors: FieldErrors<LoginFormModel>
}
