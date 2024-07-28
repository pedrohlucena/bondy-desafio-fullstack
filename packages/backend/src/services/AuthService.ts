import { MongoDbRepo, UserRepo } from 'src/repository'
import { Context, IUser } from 'src/models'
import bcrypt from 'bcrypt'
import { env } from 'src/configs'
import jwt from 'jsonwebtoken'
import { COOKIES, ERRORS } from 'src/constants'

export default class AuthService {
  private userRepository: MongoDbRepo<IUser>
  private context: Context

  constructor(context: Context) {
    this.userRepository = new UserRepo()
    this.context = context
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.get({ email })

    await this.validateCredentials(user, password)

    const [accessToken, refreshToken] = this.generateTokens(user._id)

    this.setRefreshTokenCookie(refreshToken)

    return {
      access_token: accessToken,
      user,
    }
  }

  async logout() {
    this.context.setCookies.push({
      name: COOKIES.REFRESH_TOKEN,
      value: '',
      options: {
        httpOnly: true,
        expires: new Date(0),
        sameSite: true,
      },
    })
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

  private async validateCredentials(user: IUser, password: string) {
    if (!user) {
      throw ERRORS.INCORRECT_CREDENTIAL
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      throw ERRORS.INCORRECT_CREDENTIAL
    }
  }
}
