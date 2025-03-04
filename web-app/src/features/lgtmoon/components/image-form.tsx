'use client'

import { EmptyState } from '@/features/lgtmoon/components/empty-state'
import { Header } from '@/features/lgtmoon/components/header'
import { ImageGallery } from '@/features/lgtmoon/components/image-gallery'
import { useImageStorage } from '@/features/lgtmoon/hooks/use-image-storage'
import { useOnPaste } from '@/hooks/use-pload-from-clipboard'
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

	const onAddImage = (file: File) => {
		if (images?.some((image) => image.name === file.name)) {
			toast.error('Image already exists')
			return
		}
		handleAddImage(file)
	}

	return (
		<div className="flex flex-col gap-4">
			<Header onAddImage={onAddImage} />
			{images && images.length === 0 ? (
				<EmptyState />
			) : (
				<ImageGallery images={images || []} onDelete={handleDeleteImage} />
			)}
		</div>
	)
}
