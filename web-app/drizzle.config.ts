import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
import { z } from "zod";

dotenv.config({ path: ".env.local" });

const initEnv = () => {
	const envSchema = z.object({
		POSTGRES_URL: z.string(),
	});
	const env = envSchema.parse(process.env);
	return env;
};
const env = initEnv();

export default defineConfig({
	schema: "./src/schema/*",
	dialect: "postgresql",
	dbCredentials: {
		url: env.POSTGRES_URL,
	},
});
