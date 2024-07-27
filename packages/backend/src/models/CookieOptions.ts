type CookieOptions = Partial<{
  httpOnly: boolean
  maxAge: number
  expires: Date
  sameSite: boolean
}>

export default CookieOptions
