import { Form } from '@/models'

export interface LoginFormModel {
  email: string
  password: string
}

export interface LoginForm extends Form<LoginFormModel> {}
