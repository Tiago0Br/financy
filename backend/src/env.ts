import z from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  TOKEN_EXPIRES_IN: z.string().default('30m'),
  REFREASH_TOKEN_EXPIRES_IN: z.string().default('1d'),
  FRONTEND_URL: z.url()
})

export const env = envSchema.parse(process.env)
