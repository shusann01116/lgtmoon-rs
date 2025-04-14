import { serverEnv } from '@/config/server-env'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

const sql = neon(serverEnv.POSTGRES_URL)
export const db = drizzle({ client: sql })
