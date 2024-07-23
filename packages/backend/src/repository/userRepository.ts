import { MongoDbRepo } from 'src/repository'
import { IUser, User } from 'src/models'

export class UserRepo extends MongoDbRepo<IUser> {
  constructor() {
    super(User)
  }
}
