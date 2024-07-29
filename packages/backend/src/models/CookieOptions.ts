type CookieOptions = Partial<{
  httpOnly: boolean
  secure: boolean
  sameSite: boolean | 'lax' | 'none' | 'strict'
  domain: string
  maxAge: number
  expires: Date
}>

export default CookieOptions
