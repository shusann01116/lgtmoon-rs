import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<h1 className="font-bold text-4xl">404 - Not Found</h1>
			<p className="text-lg">
				Sorry, the page you are looking for does not exist.
			</p>
			<Link href="/" className="mt-4">
				<Button className="cursor-pointer">Go to Home</Button>
			</Link>
		</div>
	);
}
