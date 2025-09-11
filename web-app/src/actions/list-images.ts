"use server";

import { and, desc, eq, isNull } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/drizzle";
import { images } from "@/schema/image";
import type { R2Image } from "@/types/lgtm-image";
import { getImageUri } from "@/utils/server";

export type ListImageResult = {
	success: true;
	images: R2Image[];
};

const IMAGES_PER_PAGE = 30;

export async function listImages({
	userId,
	page = 1,
}: {
	userId: string;
	page?: number;
}) {
	const session = await auth();
	if (!session) {
		return { success: false, error: "UNAUTHORIZED" };
	}

	const queryResults = await db
		.select({
			id: images.id,
			createdAt: images.createdAt,
		})
		.from(images)
		.where(and(eq(images.userId, userId), isNull(images.deletedAt)))
		.orderBy(desc(images.createdAt))
		.limit(IMAGES_PER_PAGE)
		.offset((page - 1) * IMAGES_PER_PAGE);

	const imageResults: R2Image[] = queryResults.map((i) => {
		return {
			storage: "r2",
			id: i.id,
			url: getImageUri(userId, i.id),
			createdAt: i.createdAt,
		};
	});

	return { success: true, images: imageResults };
}
