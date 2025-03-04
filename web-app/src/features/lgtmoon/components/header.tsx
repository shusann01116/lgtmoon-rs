import { ImageUploadButton } from '@/features/lgtmoon/components/image-upload-button'
import Link from 'next/link'

interface HeaderProps {
	onAddImage: (file: File) => void
}

export const Header = ({ onAddImage }: HeaderProps) => {
	return (
		<section className="flex items-center gap-4 font-extrabold font-sans text-lg">
			<Link href="/">
				<h1>LGTMoon-rs</h1>
			</Link>
			<ImageUploadButton onAddImage={onAddImage} />
		</section>
	)
}
