import { z } from "zod"

const envSchema = z.object({
  PORT: z.string().min(1),
  SERVER_ADDRESS: z.string().min(1),
  CLIENT_ID: z.string(),
  CLIENT_SECRET: z.string(),
  REDIRECT_URI: z.string(),
  JWT_SECRET_KEY: z.string(),
  MONGO_DB_URL: z.string().min(1),
})

const env = envSchema.parse(process.env)

export default env