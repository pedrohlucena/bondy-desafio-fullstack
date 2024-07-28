import { MongoDbRepo, UserRepo } from 'src/repository'
import { Context, IUser, UserIdPayload } from 'src/models'
import { jwtVerify, parseCookies } from 'src/utils'
import { env } from 'src/configs'
import { COOKIES, ERRORS } from 'src/constants'

export default class UsersService {
  private userRepository: MongoDbRepo<IUser>
  private context: Context

  constructor(context: Context) {
    this.userRepository = new UserRepo()
    this.context = context
  }

  private async getUserIdFromRefreshToken(refreshToken: string) {
    const payload = jwtVerify<UserIdPayload>(
      refreshToken,
      env.REFRESH_TOKEN_SECRET
    )
    return payload.userId
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

    if (!user) {
      throw ERRORS.USER_NOT_FOUND
    }

    return user
  }
}
