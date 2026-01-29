import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "callbacks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"page_url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "callbacks_id" integer;
  CREATE INDEX "callbacks_page_url_idx" ON "callbacks" USING btree ("page_url");
  CREATE INDEX "callbacks_updated_at_idx" ON "callbacks" USING btree ("updated_at");
  CREATE INDEX "callbacks_created_at_idx" ON "callbacks" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_callbacks_fk" FOREIGN KEY ("callbacks_id") REFERENCES "public"."callbacks"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_callbacks_id_idx" ON "payload_locked_documents_rels" USING btree ("callbacks_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "callbacks" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "callbacks" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_callbacks_fk";
  
  DROP INDEX "payload_locked_documents_rels_callbacks_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "callbacks_id";`)
}
