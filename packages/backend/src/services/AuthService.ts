import { MongoDbRepo, UserRepo } from 'src/repository'
import { Context, IUser } from 'src/models'
import bcrypt from 'bcrypt'
import { env } from 'src/configs'
import jwt from 'jsonwebtoken'
import { COOKIES } from 'src/constants'

export default class AuthService {
  private userRepository: MongoDbRepo<IUser>
  private context: Context

  constructor(context: Context) {
    this.userRepository = new UserRepo()
    this.context = context
  }

  private generateTokens(userId: string) {
    const accessToken = jwt.sign({ userId }, env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    })

    const refreshToken = jwt.sign({ userId }, env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    })

    return [accessToken, refreshToken]
  }

  private setRefreshTokenCookie(refreshToken: string) {
    this.context.setCookies.push({
      name: COOKIES.REFRESH_TOKEN,
      value: refreshToken,
      options: {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60,
        sameSite: true,
      },
    })
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.get({ email })

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      throw new Error('Invalid credentials')
    }

    const [accessToken, refreshToken] = this.generateTokens(user._id)

    this.setRefreshTokenCookie(refreshToken)

    return {
      access_token: accessToken,
      user,
    }
  }
}
