import dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'
import { z } from 'zod'

dotenv.config({ path: '.env.local' })

const initEnv = () => {
	const envSchema = z.object({
		// biome-ignore lint/style/useNamingConvention: aaaaaaaaaaaaa
		POSTGRES_URL: z.string(),
	})
	const env = envSchema.parse(process.env)
	return env
}
const env = initEnv()

// biome-ignore lint/style/noDefaultExport: it's ok for the config file
export default defineConfig({
	schema: './src/schema/*',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.POSTGRES_URL,
	},
})
