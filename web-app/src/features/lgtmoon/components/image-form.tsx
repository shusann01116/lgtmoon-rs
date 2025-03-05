'use client'

import { FileInputButton } from '@/components/ui/file-input'
import { EmptyState } from '@/features/lgtmoon/components/empty-state'
import { ImageGallery } from '@/features/lgtmoon/components/image-gallery'
import { useImageStorage } from '@/features/lgtmoon/hooks/use-image-storage'
import { useOnPaste } from '@/hooks/use-pload-from-clipboard'
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
			<FileInputButton
				className="mb-4"
				accept="image/*"
				onClick={onAddImage}
				variant="default"
			>
				<PlusIcon className="size-4" />
				Add New Image ✨
			</FileInputButton>
			{images && images.length === 0 ? (
				<EmptyState />
			) : (
				<ImageGallery images={images || []} onDelete={handleDeleteImage} />
			)}
		</>
	)
}
