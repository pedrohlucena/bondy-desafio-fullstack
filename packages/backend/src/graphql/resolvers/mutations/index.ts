import { GraphQLResolveInfo } from 'graphql'
import { loginMutation } from './loginMutation'
import { LoginArgs } from 'src/graphql/args'

export default {
  login: (
    parent: any,
    args: LoginArgs,
    context: any,
    info: GraphQLResolveInfo
  ) => loginMutation(parent, args, context, info),
}
