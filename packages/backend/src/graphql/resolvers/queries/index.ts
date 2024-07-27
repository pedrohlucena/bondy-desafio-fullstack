import { UserArgs } from 'src/graphql/args'
import { userQuery } from './userQuery'
import { GraphQLResolveInfo } from 'graphql'
import { Context } from 'src/models'

export default {
  user: (
    parent: any,
    args: UserArgs,
    context: Context,
    info: GraphQLResolveInfo
  ) => userQuery(parent, args, context, info),
}
