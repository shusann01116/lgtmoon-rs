import type { NextConfig } from "next";
import { clientEnv } from "@/config/env";

const nextConfig: NextConfig = {
	basePath: clientEnv.NEXT_PUBLIC_BASE_PATH,
	images: {
		remotePatterns: [new URL("https://*.googleusercontent.com/**")],
	},
};

export default nextConfig;
