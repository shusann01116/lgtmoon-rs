"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LGTMImage } from "@/features/lgtmoon/LGTMImage";
import {
	type LGTMoonImage,
	addImage,
	getAllImages,
	useLGTMoonDB,
} from "@/features/lgtmoon/api/storage";
import { useLgtmoon } from "@/hooks/useLgtmoon";
import { type ChangeEvent, useEffect, useState } from "react";

export function ImageForm() {
	const drawLgtmoon = useLgtmoon();
	const [images, setImages] = useState<LGTMoonImage[]>([]);
	const db = useLGTMoonDB();

	useEffect(() => {
		const fetchImages = async () => {
			await new Promise((resolve) => setTimeout(resolve, 100));
			if (!db.current) return;
			const images = await getAllImages(db.current);
			setImages(images.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) ?? []);
		};
		fetchImages();
	}, [db]);

	const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			const blob = await drawLgtmoon(file);
			if (!db.current) return;
			const item = {
				id: file.name,
				name: file.name,
				buffer: await blob.arrayBuffer(),
				type: file.type,
				createdAt: new Date(),
			};
			await addImage(db.current, item);
			setImages([item, ...images]);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<section className="flex flex-col gap-2">
				<Label htmlFor="image-input">LGTMoon</Label>
				<Input
					id="image-input"
					type="file"
					accept="image/*"
					aria-label="Image file selector"
					onChange={onChange}
				/>
			</section>
			<section className="columns-2 gap-4 space-y-4 sm:columns-3">
				{images.map((image) => {
					return <LGTMImage key={image.id} image={image} />;
				})}
			</section>
		</div>
	);
}
