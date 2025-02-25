import { FileInputButton } from "@/components/ui/fileinputbutton";
import { PlusIcon } from "lucide-react";
import type { ChangeEvent } from "react";

interface ImageUploadButtonProps {
	onAddImage: (file: File) => Promise<void>;
}

export const ImageUploadButton = ({ onAddImage }: ImageUploadButtonProps) => {
	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file) return;
		void onAddImage(file);
	};

	return (
		<FileInputButton
			className="ml-auto"
			icon={<PlusIcon />}
			accept="image/*"
			onClick={handleChange}
			variant="outline"
		/>
	);
};
