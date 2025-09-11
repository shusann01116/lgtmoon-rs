import { S3Client } from "@aws-sdk/client-s3";
import { serverEnv } from "@/config/server-env";

export const S3 = new S3Client({
	region: "auto",
	endpoint: `https://${serverEnv.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: serverEnv.R2_ACCESS_KEY_ID,
		secretAccessKey: serverEnv.R2_SECRET_ACCESS_KEY,
	},
});
