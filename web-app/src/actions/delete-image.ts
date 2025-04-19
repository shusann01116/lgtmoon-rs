'use server'

import { serverEnv } from '@/config/server-env'
import { auth } from '@/lib/auth'
import { S3 } from '@/lib/aws'
import { db } from '@/lib/drizzle'
import { images } from '@/schema/image'
import { getImageKey } from '@/utils/server'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { count, eq } from 'drizzle-orm'

export type DeleteImageError = 'UNAUTHORIZED' | 'IMAGE_NOT_FOUND'
export type DeleteImageResult =
	| {
			success: true
	  }
	| {
			success: false
			error: DeleteImageError
	  }

export async function deleteImage({
	imageId,
}: { imageId: string }): Promise<DeleteImageResult> {
	const session = await auth()
	if (!session) {
		return { success: false, error: 'UNAUTHORIZED' }
	}

	const userId = session.user?.id
	if (!userId) {
		return { success: false, error: 'UNAUTHORIZED' }
	}

	const [{ count: imageCount }] = await db
		.select({ count: count() })
		.from(images)
		.where(eq(images.id, imageId))
		.limit(1)
	if (imageCount === 0) {
		return { success: false, error: 'IMAGE_NOT_FOUND' }
	}

	await S3.send(
		new DeleteObjectCommand({
			Bucket: serverEnv.R2_BUCKET_NAME,
			Key: getImageKey(userId, imageId),
		}),
	)
	await db
		.update(images)
		.set({ deletedAt: new Date() })
		.where(eq(images.id, imageId))

	return { success: true }
}
