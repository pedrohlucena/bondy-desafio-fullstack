import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.string(),
  MONGODB_CONNECTION_STR: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  APP_DOMAIN: z.string(),
  PUBLIC_KEY: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    '❌ Invalid environment variables',
    parsedEnv.error.flatten().fieldErrors
  )

  throw new Error('Invalid environment variables.')
}

export const env = parsedEnv.data
