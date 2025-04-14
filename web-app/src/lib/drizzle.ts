import { env } from '@/config/env'
import { drizzle } from 'drizzle-orm/postgres-js'

import postgres from 'postgres'

const pool = postgres(env.POSTGRES_URL, { max: 1 })

export const db = drizzle(pool)
