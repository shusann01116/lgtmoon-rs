'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { ImageCover } from '@/features/images/components/image-cover'
import type { HandleUploadImageResult } from '@/features/images/hooks/use-image-storage'
import { download } from '@/lib/download'
import type { LgtMoonImage, LocalImage } from '@/types/lgtm-image'
import { cn } from '@/utils/cn'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

export function LgtmImage({
	image,
	onUpload: onUploadProp,
	onDelete,
}: {
	image: LgtMoonImage
	onUpload: (image: LocalImage) => Promise<HandleUploadImageResult>
	onDelete: (id: string) => Promise<void>
}) {
	const imgRef = useRef<HTMLImageElement>(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [isUploaded, setIsUploaded] = useState(image.storage === 'r2')

	useEffect(() => {
		if (!imgRef.current) {
			return
		}
		imgRef.current.src =
			image.storage === 'r2'
				? image.url
				: URL.createObjectURL(new Blob([image.buffer], { type: image.type }))
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
		download(new Blob([buff], { type: 'image/png' }), `${image.id}.png`)
	}

	const onUpload = async () => {
		if (image.storage !== 'local') {
			return
		}
		const result = await onUploadProp(image)
		if (result.success) {
			setIsUploaded(true)
		} else {
			toast.error(result.error)
		}
	}

	const onClickCopyMdLink = () => {
		if (!imgRef.current) {
			return
		}
		navigator.clipboard.writeText(`![LGTMoon](${imgRef.current.src})`)
	}

	return (
		<>
			{!isLoaded && (
				<Skeleton className="aspect-video w-full break-inside-avoid-column rounded-xl" />
			)}
			<ImageCover
				className="shadow-accent shadow-xs drop-shadow-xs transition-all hover:drop-shadow-2xl"
				onUpload={isUploaded ? undefined : onUpload}
				onClickCopyMdLink={isUploaded ? onClickCopyMdLink : undefined}
				onClickCopy={onClickCopy}
				onClickDownload={onClickDownload}
				onDelete={() => onDelete(image.id)}
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
		</>
	)
}
