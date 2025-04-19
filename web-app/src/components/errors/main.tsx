import { Button } from '@/components/ui/button'

export const MainErrorFallback = () => {
	return (
		<div
			className="flex h-screen w-screen flex-col items-center justify-center text-destructive-foreground"
			role="alert"
		>
			<h2 className="font-semibold text-lg text-secondary-foreground">
				Ooops, something went wrong :({' '}
			</h2>
			<Button
				className="mt-4 cursor-pointer"
				onClick={() => window.location.assign(window.location.origin)}
			>
				Refresh
			</Button>
		</div>
	)
}
