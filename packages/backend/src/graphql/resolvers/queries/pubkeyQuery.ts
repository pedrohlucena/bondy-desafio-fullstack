import { AuthService } from 'src/services'
import { Context } from 'src/models'
import { auth, errorResponse } from 'src/utils'

export const pubkeyQuery = async (_parent, _args, context: Context, _info) => {
  try {
    const service = new AuthService()

    const response = service.getPubkey()

    return response
  } catch (error) {
    errorResponse(error)
  }
}
