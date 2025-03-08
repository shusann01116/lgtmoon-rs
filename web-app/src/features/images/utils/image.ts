export async function processImage(
	file: File,
	canvas: OffscreenCanvas,
): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.onload = async () => {
			canvas.width = img.width
			canvas.height = img.height

			const ctx = canvas.getContext('2d')
			if (!ctx) {
				reject(new Error('Failed to get canvas context'))
				return
			}

			ctx.drawImage(img, 0, 0)
			const blob = await canvas.convertToBlob({ type: file.type })
			if (!blob) {
				reject(new Error('Failed to convert canvas to blob'))
				return
			}

			resolve(blob)
		}

		img.onerror = () => reject(new Error('Failed to load image'))
		img.src = URL.createObjectURL(file)
	})
}
