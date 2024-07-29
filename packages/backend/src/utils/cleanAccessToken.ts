export default function cleanAccessToken(accessToken: string) {
  return accessToken.replace('Bearer ', '')
}
