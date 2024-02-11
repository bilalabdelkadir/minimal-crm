/*
  Warnings:

  - You are about to drop the `id_segments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "id_segments" DROP CONSTRAINT "id_segments_workspace_id_fkey";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "contactId" TEXT;

-- DropTable
DROP TABLE "id_segments";

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
