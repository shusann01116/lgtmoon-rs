import { UserInfo } from '@/app/_components/user-info'
import { ImageForm } from '@/features/images/components/image-form'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const Home = () => {
	return (
		<div className="sm:8 flex min-h-svh flex-col gap-4 p-4 lg:gap-10">
			<header className="mx-auto flex w-full max-w-(--breakpoint-xl) items-center gap-4 font-extrabold font-sans text-lg">
				<Link href="/">
					<h1 className="scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl">
						LGTMoon-rs
					</h1>
				</Link>
				<div className="ml-auto">
					<UserInfo />
				</div>
			</header>
			<main className="container mx-auto max-w-(--breakpoint-xl) flex-1">
				<ImageForm />
			</main>
			<footer className="text-center text-muted-foreground text-sm">
				<p>© 2025 shusann01116</p>
				<p>
					<Link
						className="hover:underline"
						href="https://github.com/shusann01116/LGTMoon-rs"
						target="_blank"
					>
						GitHub
						<ExternalLink className="inline-block size-4 pb-1 pl-1" />
					</Link>
				</p>
			</footer>
		</div>
	)
}
