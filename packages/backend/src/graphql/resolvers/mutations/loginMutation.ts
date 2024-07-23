import { UsersService } from 'src/services'
import { LoginArgs } from 'src/graphql/args'

export const loginMutation = async (
  _parent,
  args: LoginArgs,
  _context,
  _info
) => {
  const { email, password } = args

  const service = new UsersService()

  const response = await service.login(email, password)

  return response
}
