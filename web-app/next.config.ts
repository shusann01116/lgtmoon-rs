import { env } from '@/config/env'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	basePath: env.NEXT_PUBLIC_BASE_PATH,
}

export default nextConfig
