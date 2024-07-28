import { AuthService } from 'src/services'
import { LoginArgs } from 'src/graphql/args'
import { Context } from 'src/models'
import { ERRORS } from 'src/constants'

export const loginMutation = async (
  _parent,
  args: LoginArgs,
  context: Context,
  _info
) => {
  try {
    const { email, password } = args

    const service = new AuthService(context)

    const response = await service.login(email, password)

    return response
  } catch (error) {
    throw ERRORS.INTERNAL_SERVER_ERROR
  }
}
