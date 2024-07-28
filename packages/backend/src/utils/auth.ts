import { env } from 'src/configs'
import { ERRORS } from 'src/constants'
import { Context } from 'src/models'
import { jwtVerify } from 'src/utils'

export default function auth(context: Context) {
  try {
    const accessToken = context.headers['authorization']

    jwtVerify(accessToken, env.ACCESS_TOKEN_SECRET)
  } catch (error) {
    throw ERRORS.UNAUTHORIZED
  }
}
