import path from "node:path";
import { clientEnv } from "@/config/env";
import { serverEnv } from "@/config/server-env";
import "server-only";

export const getImageKey = (userId: string, imageId: string) => {
	return path.join(serverEnv.IMAGE_BASE_PATH, userId, imageId);
};

export const getImageUri = (userId: string, imageId: string) => {
	const url = new URL(`https://${clientEnv.NEXT_PUBLIC_IMAGE_HOST}`);
	url.pathname = getImageKey(userId, imageId);
	return url.toString();
};
