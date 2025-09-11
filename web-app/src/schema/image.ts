import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "@/schema/authjs";

export const images = pgTable("image", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text("userId")
		.notNull()
		.references(() => users.id),
	createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
	deletedAt: timestamp("deletedAt", { mode: "date" }),
});
