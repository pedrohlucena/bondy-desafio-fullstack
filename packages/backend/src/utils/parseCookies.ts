import { ParsedCookies } from 'src/models'

export default function parseCookies(cookiesStr: string) {
  const cookiesObj: ParsedCookies = {}

  const cookies = cookiesStr.split('; ')

  for (const cookie of cookies) {
    const [key, value] = cookie.split('=')
    cookiesObj[key] = value
  }

  return cookiesObj
}
