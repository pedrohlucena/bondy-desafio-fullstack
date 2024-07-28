import jwt, { JwtPayload } from 'jsonwebtoken'

export default function jwtVerify<Payload extends JwtPayload = JwtPayload>(
  token: string,
  secret: string
) {
  const payload = jwt.verify(token, secret) as Payload
  return payload
}
