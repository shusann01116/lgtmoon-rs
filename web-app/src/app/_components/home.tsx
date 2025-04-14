import { UserInfo } from '@/app/_components/user-info'
import { Skeleton } from '@/components/ui/skeleton'
import { ImageForm } from '@/features/images/components/image-form'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

export const Home = () => {
	return (
		<div className="sm:8 flex min-h-svh flex-col gap-4 p-4 lg:gap-10">
			<header className="mx-auto flex w-full max-w-(--breakpoint-xl) items-center gap-4 font-extrabold font-sans text-lg">
				<Link href="/">
					<h1 className="scroll-m-20 font-extrabold text-2xl tracking-tight sm:text-4xl lg:text-5xl">
						LGTMoon-rs
					</h1>
				</Link>
				<div className="ml-auto">
					<Suspense
						fallback={<Skeleton className="size-[40px] rounded-full" />}
					>
						<UserInfo />
					</Suspense>
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
