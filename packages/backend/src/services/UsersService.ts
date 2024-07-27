import { MongoDbRepo, UserRepo } from 'src/repository'
import { Context, IUser } from 'src/models'
import { parseCookies } from 'src/utils'
import { env } from 'src/configs'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { COOKIES } from 'src/constants'

export default class UsersService {
  private userRepository: MongoDbRepo<IUser>
  private context: Context

  constructor(context: Context) {
    this.userRepository = new UserRepo()
    this.context = context
  }

  private async getUserIdFromRefreshToken(refreshToken: string) {
    const payload = jwt.verify(
      refreshToken,
      env.REFRESH_TOKEN_SECRET
    ) as JwtPayload

    const userId = payload.userId as string

    return userId
  }

  private async getUserIdFromCookies() {
    const cookies = parseCookies(this.context.headers.Cookie)

    const userId = await this.getUserIdFromRefreshToken(
      cookies[COOKIES.REFRESH_TOKEN]
    )

    return userId
  }

  async getUserById(id?: string) {
    const userId = id || (await this.getUserIdFromCookies())

    const user = await this.userRepository.getById(userId)

    return user
  }
}
