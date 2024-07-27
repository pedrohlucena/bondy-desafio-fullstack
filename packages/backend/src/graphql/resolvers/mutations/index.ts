import { GraphQLResolveInfo } from 'graphql'
import { loginMutation } from './loginMutation'
import { logoutMutation } from './logoutMutation'
import { LoginArgs } from 'src/graphql/args'

export default {
  login: (
    parent: any,
    args: LoginArgs,
    context: any,
    info: GraphQLResolveInfo
  ) => loginMutation(parent, args, context, info),
  logout: (parent: any, args: any, context: any, info: GraphQLResolveInfo) =>
    logoutMutation(parent, args, context, info),
}
