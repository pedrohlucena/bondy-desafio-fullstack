import { AuthService } from 'src/services'
import { Context } from 'src/models'
import { errorResponse } from 'src/utils'

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
    errorResponse(error)
  }
}
