import { AuthService } from 'src/services'
import { Context } from 'src/models'
import { ERRORS } from 'src/constants'

export const logoutMutation = async (
  _parent,
  _args,
  context: Context,
  _info
) => {
  try {
    const service = new AuthService(context)

    await service.logout()

    return true
  } catch (error) {
    throw ERRORS.INTERNAL_SERVER_ERROR
  }
}
