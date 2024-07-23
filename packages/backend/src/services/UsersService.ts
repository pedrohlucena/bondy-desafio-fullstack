import { MongoDbRepo, UserRepo } from 'src/repository'
import { IUser } from 'src/models'
import bcrypt from 'bcrypt'
import { env } from 'src/env'
import jwt from 'jsonwebtoken'

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

    const access_token = jwt.sign(
      { userId: user._id },
      env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15m',
      }
    )

    const refresh_token = jwt.sign(
      { userId: user._id },
      env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    )

    return {
      access_token,
      refresh_token,
      user,
    }
  }
}
