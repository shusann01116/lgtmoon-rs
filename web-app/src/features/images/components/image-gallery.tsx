import { LgtmImage } from '@/features/images/components/lgtm-image'
import type { LgtMoonImage, LocalImage } from '@/types/lgtm-image'

interface ImageGalleryProps {
	images: LgtMoonImage[]
	onUpload: (image: LocalImage) => Promise<void>
	onDelete: (id: string) => Promise<void>
}

export const ImageGallery = ({
	images,
	onUpload,
	onDelete,
}: ImageGalleryProps) => {
	return (
		<section className="-mb-4 columns-3xs gap-4 *:mb-4">
			{images.map((image) => (
				<LgtmImage
					key={image.id}
					image={image}
					onUpload={onUpload}
					onDelete={onDelete}
				/>
			))}
		</section>
	)
}
