import jwt from 'jsonwebtoken'
import { env } from 'src/configs'
import { ERRORS } from 'src/constants'
import { Context } from 'src/models'

export default function auth(context: Context) {
  try {
    const accessToken = context.headers['authorization']

    jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET)
  } catch (error) {
    throw ERRORS.UNAUTHORIZED
  }
}
