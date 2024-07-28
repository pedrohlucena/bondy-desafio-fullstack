import { CookieToSet } from 'src/models'

export interface Context {
  headers: { authorization: string; Cookie: string }
  setCookies: CookieToSet[]
}

export default Context
