'use client'

import { FileInputButton } from '@/components/ui/file-input'
import { EmptyState } from '@/features/images/components/empty-state'
import { ImageGallery } from '@/features/images/components/image-gallery'
import { useImageStorage } from '@/features/images/hooks/use-image-storage'
import { useOnPaste } from '@/hooks/use-upload-from-clipboard'
import { PlusIcon } from 'lucide-react'
import type { ChangeEvent } from 'react'
import { toast } from 'sonner'

export function ImageForm() {
	const { images, handleAddImage, handleDeleteImage } = useImageStorage()

	useOnPaste((e: ClipboardEvent) => {
		const files = e.clipboardData?.files
		if (!files) {
			return
		}
		for (const file of files) {
			handleAddImage(file)
		}
	})

	const onAddImage = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (images?.some((image) => image.name === file?.name)) {
			toast.error('Image already exists')
			return
		}

		e.target.value = ''
		if (!file) {
			return
		}
		handleAddImage(file)
	}

	return (
		<>
			<section className="mb-4 flex pointer-coarse:hidden items-center gap-2">
				<FileInputButton
					accept="image/*"
					onClick={onAddImage}
					variant="default"
				>
					<PlusIcon className="size-4" />
					Add New Image ✨
				</FileInputButton>
				<p className="text-sm/tight">or</p>
				<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-[10px] text-muted-foreground opacity-100">
					<span className="text-xs">⌘</span>V
				</kbd>
			</section>
			{images && images.length === 0 ? (
				<EmptyState />
			) : (
				<ImageGallery images={images || []} onDelete={handleDeleteImage} />
			)}
			<section className="fixed end-4 bottom-4 pointer-fine:hidden shadow-xl">
				<FileInputButton
					accept="image/*"
					onClick={onAddImage}
					variant="default"
					size="icon"
					className="size-12"
				>
					<PlusIcon className="size-8" />
				</FileInputButton>
			</section>
		</>
	)
}
