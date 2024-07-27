import { CookieToSet } from 'src/models'

export interface Context {
  headers: { Cookie: string }
  setCookies: CookieToSet[]
}

export default Context
