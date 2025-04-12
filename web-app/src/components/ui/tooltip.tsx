'use client'

import {
	Arrow,
	Content,
	Portal,
	Provider,
	Root,
	Trigger,
} from '@radix-ui/react-tooltip'
import type * as React from 'react'

import { cn } from '@/utils/cn'

function TooltipProvider({
	delayDuration = 0,
	...props
}: React.ComponentProps<typeof Provider>) {
	return (
		<Provider
			data-slot="tooltip-provider"
			delayDuration={delayDuration}
			{...props}
		/>
	)
}

function Tooltip({ ...props }: React.ComponentProps<typeof Root>) {
	return (
		<TooltipProvider>
			<Root data-slot="tooltip" {...props} />
		</TooltipProvider>
	)
}

function TooltipTrigger({ ...props }: React.ComponentProps<typeof Trigger>) {
	return <Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
	className,
	sideOffset = 0,
	children,
	...props
}: React.ComponentProps<typeof Content>) {
	return (
		<Portal>
			<Content
				data-slot="tooltip-content"
				sideOffset={sideOffset}
				className={cn(
					'fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in text-balance rounded-md bg-primary px-3 py-1.5 text-primary-foreground text-xs data-[state=closed]:animate-out',
					className,
				)}
				{...props}
			>
				{children}
				<Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-primary fill-primary" />
			</Content>
		</Portal>
	)
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
