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
		try {
			const blob = await drawLgtmoon(file);
			if (!db) return;
			const item = {
				id: crypto.randomUUID(),
				name: file.name,
				buffer: await blob.arrayBuffer(),
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
			await handleAddImage(file);
		}
	});

	const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (images?.some((image) => image.name === file.name)) {
			toast.error("Image already exists");
			return;
		}
		await handleAddImage(file);
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
				<p className="text-sm text-center">
					画像を追加して LGTM ライブラリを作ろう ☺️
				</p>
			) : (
				<section className="columns-2 gap-4 space-y-4 sm:columns-3 lg:columns-5">
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
