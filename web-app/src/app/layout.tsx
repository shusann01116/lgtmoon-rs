import { AppProvider } from '@/app/provider'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'LGTMoon',
	description: 'ファイルを選択したらLGTMを描いてくれるやつ made in Rust',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="ja">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	)
}
