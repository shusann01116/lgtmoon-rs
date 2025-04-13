import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { SignIn } from '@/components/ui/sign-in'
import { auth, signOut } from '@/lib/auth'
import Image from 'next/image'

export const UserInfo = async () => {
	const session = await auth()

	if (!session) {
		return <SignIn />
	}

	return (
		<Popover>
			<PopoverTrigger
				type="button"
				title="User Info"
				className="cursor-pointer align-middle"
			>
				<Image
					src={session?.user?.image ?? ''}
					alt="user"
					width={40}
					height={40}
					className="rounded-full"
				/>
			</PopoverTrigger>
			<PopoverContent align="end">
				<div className="flex flex-col gap-2">
					<h1 className="font-bold text-lg">User Info</h1>
					<p className="font-light text-sm">{session?.user?.email}</p>
					<Button
						onClick={async () => {
							'use server'
							await signOut()
						}}
						variant="secondary"
						className="cursor-pointer"
					>
						Sign out
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}
