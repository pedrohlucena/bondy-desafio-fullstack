export default interface CookieToSet {
  name: string
  value: string
  options: {
    httpOnly: boolean
    maxAge: number
    sameSite: boolean
  }
}
