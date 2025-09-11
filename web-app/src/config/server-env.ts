import { z } from "zod";
import "server-only";

const createServerEnv = () => {
	const EnvSchema = z.object({
		POSTGRES_URL: z.string(),
		R2_ACCESS_KEY_ID: z.string(),
		R2_SECRET_ACCESS_KEY: z.string(),
		R2_BUCKET_NAME: z.string(),
		CLOUDFLARE_ACCOUNT_ID: z.string(),
		IMAGE_BASE_PATH: z.string().optional().default(""),
	});

	const envVars = {
		POSTGRES_URL: process.env.POSTGRES_URL,
		R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
		R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
		R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
		CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
		IMAGE_BASE_PATH: process.env.IMAGE_BASE_PATH,
	};

	const parsedEnv = EnvSchema.safeParse(envVars);

	if (!parsedEnv.success) {
		throw new Error(`Invalid env provided. The following variables are missing or invalid:
    ${Object.entries(parsedEnv.error.flatten().fieldErrors)
			.map(([field, errors]) => `${field}: ${errors}`)
			.join("\n")}`);
	}

	return parsedEnv.data;
};

export const serverEnv = createServerEnv();
