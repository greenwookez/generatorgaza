import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "catalog_categories" ADD COLUMN "order" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "catalog_items" ADD COLUMN "order" numeric DEFAULT 0 NOT NULL;
  CREATE INDEX "catalog_categories_order_idx" ON "catalog_categories" USING btree ("order");
  CREATE INDEX "catalog_items_order_idx" ON "catalog_items" USING btree ("order");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "catalog_categories_order_idx";
  DROP INDEX "catalog_items_order_idx";
  ALTER TABLE "catalog_categories" DROP COLUMN "order";
  ALTER TABLE "catalog_items" DROP COLUMN "order";`)
}
