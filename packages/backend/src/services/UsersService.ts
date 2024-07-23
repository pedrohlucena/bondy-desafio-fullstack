import { MongoDbRepo, UserRepo } from 'src/repository'
import { IUser } from 'src/models'
import bcrypt from 'bcrypt'

export class UsersService {
  private userRepository: MongoDbRepo<IUser>

  constructor() {
    this.userRepository = new UserRepo()
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.get({ email })

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      throw new Error('Invalid credentials')
    }

    return user
  }
}
