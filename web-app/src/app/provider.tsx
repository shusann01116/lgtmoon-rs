'use client'

import { MainErrorFallback } from '@/components/errors/main'
import { Toaster } from '@/components/ui/sonner'
import { env } from '@/config/env'
import { ThemeProvider } from '@/providers/theme-provider'
import { GoogleAnalytics } from '@next/third-parties/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ErrorBoundary } from 'react-error-boundary'

export function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<ErrorBoundary fallback={<MainErrorFallback />}>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
			<Toaster position="top-center" />
			<GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
			<SpeedInsights />
		</ErrorBoundary>
	)
}
