import { AuthService } from 'src/services'
import { Context } from 'src/models'

export const logoutMutation = async (
  _parent,
  _args,
  context: Context,
  _info
) => {
  const service = new AuthService(context)

  await service.logout()

  return true
}
