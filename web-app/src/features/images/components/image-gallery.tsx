import { LgtmImage } from '@/features/images/components/lgtm-image'
import type { LgtMoonImage } from '@/types/lgtm-image'

interface ImageGalleryProps {
	images: LgtMoonImage[]
	onDelete: (id: string) => Promise<void>
}

export const ImageGallery = ({ images, onDelete }: ImageGalleryProps) => {
	return (
		<section className="-mb-4 columns-3xs gap-4 *:mb-4">
			{images.map((image) => (
				<LgtmImage key={image.id} image={image} onDelete={onDelete} />
			))}
		</section>
	)
}
