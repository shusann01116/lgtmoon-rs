import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { type ChangeEvent, type ReactNode, useRef } from 'react'

type FileInputButtonProps = {
	children: ReactNode
	className?: string
	accept: string
	onClick: (e: ChangeEvent<HTMLInputElement>) => void
	variant?: 'default' | 'outline' | 'ghost' | 'link'
}

export function FileInputButton({
	className,
	accept,
	onClick,
	variant,
	children,
}: FileInputButtonProps) {
	const inputRef = useRef<HTMLInputElement>(null)
	return (
		<>
			<input
				aria-label="Image file selector"
				ref={inputRef}
				type="file"
				accept={accept}
				className="hidden"
				onChange={onClick}
			/>
			<Button
				aria-hidden="true"
				variant={variant}
				onClick={() => inputRef.current?.click()}
				className={cn('cursor-pointer', className)}
			>
				{children}
			</Button>
		</>
	)
}
