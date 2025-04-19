import { deleteImage as deleteR2Image } from '@/actions/delete-image'
import { listImages as listR2Images } from '@/actions/list-images'
import { uploadImage } from '@/actions/upload-image'
import {
	type LgtMoonDb,
	addImage,
	deleteImage,
	getAllImages,
	useLgtMoonDb,
} from '@/features/images/api/storage'
import { processImage } from '@/features/images/utils/image'
import { useLgtmoon } from '@/hooks/use-lgtmoon'
import type { LgtMoonImage, LocalImage, R2Image } from '@/types/lgtm-image'
import axios from 'axios'
import type { IDBPDatabase } from 'idb'
import type { Session } from 'next-auth'
import { useState } from 'react'
import { toast } from 'sonner'

async function getR2Images(userId: string): Promise<R2Image[]> {
	const r2Images = await listR2Images({ userId })
	if (r2Images.success) {
		return r2Images.images ?? []
	}
	return []
}

export const useImageStorage = ({
	session,
}: {
	session: Session | null
}) => {
	const [images, setImages] = useState<LgtMoonImage[] | null>(null)
	const drawLgtmoon = useLgtmoon()

	const onDbReady = async (db: IDBPDatabase<LgtMoonDb>) => {
		const userId = session?.user?.id

		const r2Images = userId ? await getR2Images(userId) : []
		const images = await getAllImages(db)
		setImages(
			[...images, ...r2Images].sort(
				(a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
			) ?? [],
		)
	}

	const db = useLgtMoonDb({
		onReady: onDbReady,
	})

	const handleAddImage = async (file: File) => {
		if (!db) {
			toast.error('Database not initialized')
			return
		}

		try {
			const canvas = new OffscreenCanvas(1, 1) // Initial size will be updated
			const blob = await processImage(file, canvas)
			const drawedBuffer = await drawLgtmoon(
				await blob.arrayBuffer(),
				file.type,
			)

			const item: LocalImage = {
				storage: 'local',
				id: crypto.randomUUID(),
				name: file.name,
				buffer: drawedBuffer,
				type: file.type,
				createdAt: new Date(),
			}

			await addImage(db, item)
			setImages([item, ...(images ?? [])])
		} catch (error) {
			if (error instanceof Error) {
				toast.error('Failed to add image', {
					description: error.message,
				})
			}
			throw error
		}
	}

	const handleDeleteImage = async (id: string) => {
		if (!db) {
			return
		}
		await deleteImage(db, id)

		if (session) {
			const result = await deleteR2Image({ imageId: id })
			if (!result.success && result.error !== 'IMAGE_NOT_FOUND') {
				toast.error(result.error)
				return
			}
		}

		setImages(images?.filter((image) => image.id !== id) ?? [])
	}

	const handleUploadImage = async (image: LocalImage) => {
		if (!session) {
			toast.error('Please sign in to upload images')
			return
		}
		const result = await uploadImage({ imageId: image.id })
		if (!result.success) {
			toast.error(result.error)
			return
		}
		const putResult = await axios.put(result.uploadUrl, image.buffer, {
			headers: {
				'Content-Type': image.type,
			},
		})
		if (putResult.status !== 200) {
			toast.error('Failed to upload image')
			return
		}

		if (db) {
			await deleteImage(db, image.id)
		}
		setImages((prev) => {
			if (!prev) {
				return null
			}
			return prev.map((i) => {
				if (i.id !== image.id) {
					return i
				}
				return result.image
			})
		})
	}

	return {
		images,
		handleAddImage,
		handleDeleteImage,
		handleUploadImage,
	}
}
