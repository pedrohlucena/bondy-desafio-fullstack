import { MongoDbRepo, UserRepo } from 'src/repository'
import { Context, IUser, UserIdPayload } from 'src/models'
import bcrypt from 'bcrypt'
import { env } from 'src/configs'
import jwt from 'jsonwebtoken'
import { COOKIES, ERRORS } from 'src/constants'
import { jwtVerify, parseCookies } from 'src/utils'

export default class AuthService {
  private userRepository: MongoDbRepo<IUser>
  private context?: Context

  constructor(context?: Context) {
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

  async refreshToken(refreshToken?: string) {
    const usedRefreshToken =
      refreshToken || (await this.getRefreshTokenFromCookies())

    const userId = this.verifyRefreshToken(usedRefreshToken)

    const access_token = this.generateAccessToken(userId)

    return {
      access_token,
    }
  }

  getPubkey() {
    return {
      public_key: env.PUBLIC_KEY,
    }
  }

  logout() {
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

  private async getRefreshTokenFromCookies() {
    const cookieString = this.context.headers.Cookie

    if (!cookieString) throw ERRORS.UNAUTHORIZED

    const cookies = parseCookies(cookieString)
    return cookies[COOKIES.REFRESH_TOKEN]
  }

  private verifyRefreshToken(refreshToken: string) {
    try {
      const payload = jwtVerify<UserIdPayload>(
        refreshToken,
        env.REFRESH_TOKEN_SECRET
      )

      return payload.userId
    } catch (err) {
      throw ERRORS.UNAUTHORIZED
    }
  }

  private generateTokens(userId: string) {
    const accessToken = this.generateAccessToken(userId)
    const refreshToken = this.generateRefreshToken(userId)
    return [accessToken, refreshToken]
  }

  private generateAccessToken(userId: string) {
    const accessToken = jwt.sign({ userId }, env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    })
    return accessToken
  }

  private generateRefreshToken(userId: string) {
    const refreshToken = jwt.sign({ userId }, env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    })
    return refreshToken
  }

  private setRefreshTokenCookie(refreshToken: string) {
    this.context.setCookies.push({
      name: COOKIES.REFRESH_TOKEN,
      value: refreshToken,
      options: {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        domain: env.APP_DOMAIN,
        maxAge: 30 * 24 * 60 * 60,
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
