import { UsersService } from 'src/services'
import { UserArgs } from 'src/graphql/args'
import { Context } from 'src/models'
import { auth, errorResponse } from 'src/utils'

export const userQuery = async (
  _parent,
  args: UserArgs,
  context: Context,
  _info
) => {
  try {
    auth(context)

    const service = new UsersService(context)
    const response = await service.getUserById(args.id)

    return response
  } catch (error) {
    errorResponse(error)
  }
}
