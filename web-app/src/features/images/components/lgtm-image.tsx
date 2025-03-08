'use client'

import { Skeleton } from '@/components/ui/skeleton'
import type { LgtMoonImage } from '@/features/images/api/storage'
import { ImageCover } from '@/features/images/components/image-cover'
import { download } from '@/lib/download'
import { cn } from '@/utils/cn'
import { getFileExtension, getFileName } from '@/utils/file'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

export function LgtmImage({
	image,
	onDelete,
}: {
	image: LgtMoonImage
	onDelete: (id: string) => void
}) {
	const imgRef = useRef<HTMLImageElement>(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [isDeleted, setIsDeleted] = useState(false)

	useEffect(() => {
		if (!imgRef.current) {
			return
		}
		imgRef.current.src = URL.createObjectURL(
			new Blob([image.buffer], { type: image.type }),
		)
		imgRef.current.onload = () => {
			setIsLoaded(true)
		}
	}, [image])

	const onClickCopy = () => {
		if (!imgRef.current) {
			return
		}

		try {
			const item = new ClipboardItem({
				// biome-ignore lint/suspicious/noAsyncPromiseExecutor: Safari では ClipboardItem は同期コンテキストのみで動作するため、Promise を無理やり中で解消する必要がある
				'image/png': new Promise(async (resolve) => {
					if (!imgRef.current) {
						return
					}
					const buff = await fetch(imgRef.current.src).then((res) =>
						res.arrayBuffer(),
					)
					resolve(new Blob([buff], { type: 'image/png' }))
				}),
			})
			navigator.clipboard.write([item])
		} catch (error) {
			toast.error('Failed to copy to clipboard', {
				description: error instanceof Error ? error.message : 'Unknown error',
			})
		}
	}

	const onClickDownload = async () => {
		if (!imgRef.current) {
			return
		}

		const buff = await fetch(imgRef.current.src).then((res) =>
			res.arrayBuffer(),
		)
		download(
			new Blob([buff], { type: 'image/png' }),
			`${getFileName(image.name)}-lgtm.${getFileExtension(image.name)}`,
		)
	}

	const onClickDelete = () => {
		setIsDeleted(true)
		onDelete(image.id)
	}

	return (
		<>
			{!isLoaded && (
				<Skeleton className="aspect-video w-full break-inside-avoid-column rounded-xl" />
			)}
			{!isDeleted && (
				<ImageCover
					className="shadow-accent shadow-xs drop-shadow-xs transition-all hover:drop-shadow-2xl"
					onClickCopy={onClickCopy}
					onClickDownload={onClickDownload}
					onDelete={onClickDelete}
				>
					<img
						ref={imgRef}
						className={cn(
							'block w-full rounded-sm',
							isLoaded ? 'block' : 'hidden',
						)}
						alt="LGTMoon"
					/>
				</ImageCover>
			)}
		</>
	)
}
