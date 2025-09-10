import { AppProvider } from "@/app/provider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJP = Noto_Sans_JP({
	variable: "--font-noto-sans-jp",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "LGTMoon",
	description: "ファイルを選択したらLGTMを描いてくれるやつ made in Rust",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className={`${notoSansJP.variable} antialiased`}>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
