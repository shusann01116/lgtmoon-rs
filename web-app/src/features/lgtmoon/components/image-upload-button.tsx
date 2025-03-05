import { FileInputButton } from '@/components/ui/file-input'
import { PlusIcon } from 'lucide-react'
import type { ChangeEvent } from 'react'

interface ImageUploadButtonProps {
	onAddImage: (file: File) => void
}

export const ImageUploadButton = ({ onAddImage }: ImageUploadButtonProps) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		e.target.value = ''
		if (!file) {
			return
		}
		onAddImage(file)
	}

	return (
		<FileInputButton accept="image/*" onClick={handleChange} variant="default">
			<PlusIcon className="size-4" />
			Add Image
		</FileInputButton>
	)
}
