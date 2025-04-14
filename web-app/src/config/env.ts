import { z } from 'zod'

const wasmRelativePath = '/pkg/lgtmoon_wasm_bg.wasm'

const createEnv = () => {
	const EnvSchema = z.object({
		NEXT_PUBLIC_BASE_PATH: z.string().optional(),
		NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().default('G-W4PVVMT3PM'),
		NEXT_PUBLIC_LGTM_WASM_PATH: z.string().default(wasmRelativePath),
		POSTGRES_URL: z.string().default(''),
	})

	const envVars = {
		NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
		NEXT_PUBLIC_GOOGLE_ANALYTICS_ID:
			process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
		NEXT_PUBLIC_LGTM_WASM_PATH: process.env.NEXT_PUBLIC_LGTM_WASM_PATH,
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

export const env = createEnv()
