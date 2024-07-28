import { AuthService } from 'src/services'
import { RefreshTokenArgs } from 'src/graphql/args'
import { errorResponse } from 'src/utils'
import { Context } from 'src/models'

export const refreshTokenMutation = async (
  _parent,
  args: RefreshTokenArgs,
  context: Context,
  _info
) => {
  try {
    const service = new AuthService(context)

    const response = await service.refreshToken(args.refreshToken)

    return response
  } catch (error) {
    errorResponse(error)
  }
}
