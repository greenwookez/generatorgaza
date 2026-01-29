import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_sections" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "about_sections" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "about" ALTER COLUMN "landing_text" SET NOT NULL;
  ALTER TABLE "catalog_categories" ADD COLUMN "is_hidden" boolean DEFAULT false NOT NULL;
  ALTER TABLE "catalog_categories" ADD COLUMN "page_description" varchar;
  ALTER TABLE "catalog_items" ADD COLUMN "is_hidden" boolean DEFAULT false NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_sections" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "about_sections" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "about" ALTER COLUMN "landing_text" DROP NOT NULL;
  ALTER TABLE "catalog_categories" DROP COLUMN "is_hidden";
  ALTER TABLE "catalog_categories" DROP COLUMN "page_description";
  ALTER TABLE "catalog_items" DROP COLUMN "is_hidden";`)
}
