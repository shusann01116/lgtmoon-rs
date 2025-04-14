import { z } from 'zod'
import 'server-only'

const createServerEnv = () => {
	const EnvSchema = z.object({
		POSTGRES_URL: z.string(),
	})

	const envVars = {
		POSTGRES_URL: process.env.POSTGRES_URL,
	}

	const parsedEnv = EnvSchema.safeParse(envVars)

	if (!parsedEnv.success) {
		throw new Error(`Invalid env provided. The following variables are missing or invalid:
    ${Object.entries(parsedEnv.error.flatten().fieldErrors)
			.map(([field, errors]) => `${field}: ${errors}`)
			.join('\n')}`)
	}

	return parsedEnv.data
}

export const serverEnv = createServerEnv()
