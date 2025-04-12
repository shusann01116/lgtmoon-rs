import { env } from '@/config/env'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	basePath: env.NEXT_PUBLIC_BASE_PATH,
	images: {
		remotePatterns: [new URL('https://*.googleusercontent.com/**')],
	},
}

export default nextConfig
