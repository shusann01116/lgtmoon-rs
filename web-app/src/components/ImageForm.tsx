"use client";

import { ImageCover } from "@/components/ImageCover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLgtmoon } from "@/hooks/useLgtmoon";
import { cn } from "@/utils/cn";
import { type ChangeEvent, useRef, useState } from "react";

export function ImageForm() {
	const imgRef = useRef<HTMLImageElement>(null);
	const drawLgtmoon = useLgtmoon(imgRef);
	const [show, setShow] = useState(false);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		try {
			drawLgtmoon(e);
			setShow(true);
		} catch (error) {
			console.error(error);
		}
	};

	const onClickCopy = async () => {
		if (!imgRef.current) return;

		const buff = await fetch(imgRef.current.src).then((res) =>
			res.arrayBuffer(),
		);
		await navigator.clipboard.write([
			new ClipboardItem({
				"image/png": new Blob([buff], { type: "image/png" }),
			}),
		]);
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
			<ImageCover onClickCopy={onClickCopy}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					ref={imgRef}
					className={cn("rounded-sm w-full", show ? "block" : "hidden")}
					alt="LGTMoon"
				/>
			</ImageCover>
		</div>
	);
}
