"use client";

import { FileInputButton } from "@/components/ui/fileinputbutton";
import { LGTMImage } from "@/features/lgtmoon/LGTMImage";
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
import { useOnPaste } from "@/hooks/useUploadFromClipBoard";
import type { IDBPDatabase } from "idb";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";

export function ImageForm() {
	const drawLgtmoon = useLgtmoon();
	const [images, setImages] = useState<LGTMoonImage[] | null>(null);

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

	useOnPaste(async (e: ClipboardEvent) => {
		const files = e.clipboardData?.files;
		if (!files) return;
		for (const file of files) {
			void handleAddImage(file);
		}
	});

	const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file) return;
		if (images?.some((image) => image.name === file.name)) {
			toast.error("Image already exists");
			return;
		}
		void handleAddImage(file);
	};

	const onDelete = async (id: string) => {
		if (!db) return;
		await deleteImage(db, id);
		setImages(images?.filter((image) => image.id !== id) ?? []);
	};

	return (
		<div className="flex flex-col gap-4">
			<section className="flex items-center gap-4 text-lg font-extrabold font-sans">
				<Link href="/">
					<h1>LGTMoon-rs</h1>
				</Link>
				<FileInputButton
					className="ml-auto"
					icon={<PlusIcon />}
					accept="image/*"
					onClick={onChange}
					variant="outline"
				/>
			</section>
			{images && images.length < 1 ? (
				<p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					画像を追加して LGTM ライブラリを作ろう ☺️
				</p>
			) : (
				<section className="columns-3xs space-y-4">
					{images?.map((image) => {
						return (
							<LGTMImage key={image.id} image={image} onDelete={onDelete} />
						);
					})}
				</section>
			)}
		</div>
	);
}
