'use server'

import { serverEnv } from '@/config/server-env'
import { auth } from '@/lib/auth'
import { S3 } from '@/lib/aws'
import { db } from '@/lib/drizzle'
import { images } from '@/schema/image'
import { quota } from '@/schema/quota'
import { thisMonth } from '@/utils/date'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { and, count, eq, gte } from 'drizzle-orm'

export type UploadImageResult =
	| {
			success: true
			url: string
	  }
	| {
			success: false
			error: 'UNAUTHORIZED'
	  }
	| {
			success: false
			error: 'QUOTA_EXCEEDED'
	  }
	| {
			success: false
			error: 'IMAGE_ALREADY_EXISTS'
	  }

/**
 * Get user quota
 * If user quota is not found, create it
 * @param userId
 * @returns user quota
 */
const getUserQuota = async (userId: string) => {
	const [userQuota] = await db
		.select()
		.from(quota)
		.where(eq(quota.userId, userId))

	if (!userQuota) {
		const [newUserQuota] = await db
			.insert(quota)
			.values({
				userId,
			})
			.returning()
		return newUserQuota
	}

	return userQuota
}

export async function uploadImage({
	imageId,
}: { imageId: string }): Promise<UploadImageResult> {
	const session = await auth()
	if (!session) {
		return { success: false, error: 'UNAUTHORIZED' }
	}

	const userId = session.user?.id
	if (!userId) {
		return { success: false, error: 'UNAUTHORIZED' }
	}

	const userQuota = await getUserQuota(userId)

	const [{ count: imagesUploadedInMonth }] = await db
		.select({ count: count() })
		.from(images)
		.where(and(eq(images.userId, userId), gte(images.createdAt, thisMonth())))
	if (userQuota.imagesInMonth < imagesUploadedInMonth) {
		return { success: false, error: 'QUOTA_EXCEEDED' }
	}

	const [{ count: imageCount }] = await db
		.select({ count: count() })
		.from(images)
		.where(eq(images.id, imageId))
		.limit(1)
	if (imageCount > 0) {
		return { success: false, error: 'IMAGE_ALREADY_EXISTS' }
	}

	const [image] = await db
		.insert(images)
		.values({
			id: imageId,
			userId: userId,
		})
		.returning()

	const url = await getSignedUrl(
		S3,
		new PutObjectCommand({
			Bucket: serverEnv.R2_BUCKET_NAME,
			Key: `images/${userId}/${image.id}.png`,
		}),
		{ expiresIn: 60 * 60 * 24 },
	)

	return { success: true, url }
}
