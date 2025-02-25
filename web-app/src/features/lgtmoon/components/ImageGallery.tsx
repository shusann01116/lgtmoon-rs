import { LGTMImage } from "@/features/lgtmoon/LGTMImage";
import type { LGTMoonImage } from "@/features/lgtmoon/api/storage";

interface ImageGalleryProps {
	images: LGTMoonImage[];
	onDelete: (id: string) => Promise<void>;
}

export const ImageGallery = ({ images, onDelete }: ImageGalleryProps) => {
	return (
		<section className="columns-3xs space-y-4">
			{images.map((image) => (
				<LGTMImage key={image.id} image={image} onDelete={onDelete} />
			))}
		</section>
	);
};
