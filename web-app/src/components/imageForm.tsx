"use client";

import { useRef } from "react";
import { useLgtmoon } from "@/hooks/useLgtmoon";

export function ImageForm() {
	const imgRef = useRef<HTMLImageElement>(null);
	const onChange = useLgtmoon(imgRef);

	return (
		<div className="flex flex-col">
			<input
				type="file"
				accept="image/*"
				className="mb-4"
				aria-label="Image file selector"
				onChange={onChange}
			/>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img ref={imgRef} className="max-w-md" alt="Selected image preview" />
		</div>
	);
}
