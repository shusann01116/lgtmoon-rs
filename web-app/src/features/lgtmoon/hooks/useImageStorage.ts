import {
	type LGTMoonDB,
	type LGTMoonImage,
	addImage,
	deleteImage,
	getAllImages,
	useLGTMoonDB,
} from "@/features/lgtmoon/api/storage";
import { processImage } from "@/features/lgtmoon/utils/image";
import { useLgtmoon } from "@/hooks/useLgtmoon";
import type { IDBPDatabase } from "idb";
import { useState } from "react";
import { toast } from "sonner";

export const useImageStorage = () => {
	const [images, setImages] = useState<LGTMoonImage[] | null>(null);
	const drawLgtmoon = useLgtmoon();

	const onDBReady = async (db: IDBPDatabase<LGTMoonDB>) => {
		const images = await getAllImages(db);
		setImages(
			images.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) ??
				[],
		);
	};

	const db = useLGTMoonDB({
		onReady: onDBReady,
	});

	const handleAddImage = async (file: File) => {
		if (!db) {
			toast.error("Database not initialized");
			return;
		}

		try {
			const canvas = new OffscreenCanvas(1, 1); // Initial size will be updated
			const blob = await processImage(file, canvas);
			const drawedBuffer = await drawLgtmoon(
				await blob.arrayBuffer(),
				file.type,
			);

			const item: LGTMoonImage = {
				id: crypto.randomUUID(),
				name: file.name,
				buffer: drawedBuffer,
				type: file.type,
				createdAt: new Date(),
			};

			await addImage(db, item);
			setImages([item, ...(images ?? [])]);
		} catch (error) {
			if (error instanceof Error) {
				toast.error("Failed to add image", {
					description: error.message,
				});
			}
			throw error;
		}
	};

	const handleDeleteImage = async (id: string) => {
		if (!db) return;
		await deleteImage(db, id);
		setImages(images?.filter((image) => image.id !== id) ?? []);
	};

	return {
		images,
		handleAddImage,
		handleDeleteImage,
	};
};
