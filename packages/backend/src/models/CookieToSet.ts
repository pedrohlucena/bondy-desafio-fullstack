import { CookieOptions } from 'src/models'

export default interface CookieToSet {
  name: string
  value: string
  options: CookieOptions
}
