import { ImageForm } from '@/features/lgtmoon/components/image-form'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
	return (
		<div className="flex min-h-svh flex-col pb-4">
			<main className="mx-auto w-full max-w-(--breakpoint-xl) flex-1 px-4 py-4">
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
