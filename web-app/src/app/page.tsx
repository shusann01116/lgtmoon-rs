import { ImageForm } from "@/features/lgtmoon/ImageForm";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col min-h-svh pb-4">
			<main className="w-full max-w-screen-xl py-4 px-4 mx-auto flex-1">
				<ImageForm />
			</main>
			<footer className="text-center text-sm text-muted-foreground">
				<p>© 2025 shusann01116</p>
				<p>
					<Link
						className="hover:underline"
						href="https://github.com/shusann01116/LGTMoon-rs"
						target="_blank"
					>
						GitHub
						<ExternalLink className="size-4 inline-block pb-1 pl-1" />
					</Link>
				</p>
			</footer>
		</div>
	);
}
