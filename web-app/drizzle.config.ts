import { defineConfig } from 'drizzle-kit'

// biome-ignore lint/style/noDefaultExport: it's ok for the config file
export default defineConfig({
	schema: './src/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.POSTGRES_URL ?? '',
	},
})
