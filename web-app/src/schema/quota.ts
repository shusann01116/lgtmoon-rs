import { users } from '@/schema/authjs'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const quota = pgTable('quota', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('userId')
		.notNull()
		.references(() => users.id),
	createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
	updatedAt: timestamp('updatedAt', { mode: 'date' }).notNull().defaultNow(),
	imagesInMonth: integer('imagesInMonth').notNull().default(10),
	bytesPerImage: integer('bytesPerImage')
		.notNull()
		.default(1024 * 1024 * 10), // 10MB
})
