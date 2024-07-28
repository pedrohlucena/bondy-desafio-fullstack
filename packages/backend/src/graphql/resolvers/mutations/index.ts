import { GraphQLResolveInfo } from 'graphql'
import { loginMutation } from './loginMutation'
import { logoutMutation } from './logoutMutation'
import { refreshTokenMutation } from './refreshToken'
import { LoginArgs, RefreshTokenArgs } from 'src/graphql/args'
import { Context } from 'src/models'

export default {
  login: (
    parent: any,
    args: LoginArgs,
    context: Context,
    info: GraphQLResolveInfo
  ) => loginMutation(parent, args, context, info),
  logout: (
    parent: any,
    args: any,
    context: Context,
    info: GraphQLResolveInfo
  ) => logoutMutation(parent, args, context, info),
  refreshToken: (
    parent: any,
    args: RefreshTokenArgs,
    context: Context,
    info: GraphQLResolveInfo
  ) => refreshTokenMutation(parent, args, context, info),
}
