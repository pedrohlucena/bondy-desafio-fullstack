import { UserArgs } from 'src/graphql/args'
import { userQuery } from './userQuery'
import { GraphQLResolveInfo } from 'graphql'
import { Context } from 'src/models'
import { pubkeyQuery } from './pubkeyQuery'

export default {
  user: (
    parent: any,
    args: UserArgs,
    context: Context,
    info: GraphQLResolveInfo
  ) => userQuery(parent, args, context, info),
  pubkey: (
    parent: any,
    args: any,
    context: Context,
    info: GraphQLResolveInfo
  ) => pubkeyQuery(parent, args, context, info),
}
