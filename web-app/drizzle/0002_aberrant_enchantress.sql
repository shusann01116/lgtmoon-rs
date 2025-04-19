CREATE TABLE "quota" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"imagesInMonth" integer DEFAULT 10 NOT NULL,
	"bytesPerImage" integer DEFAULT 10485760 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "quota" ADD CONSTRAINT "quota_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;