/*
  Warnings:

  - A unique constraint covering the columns `[email,workspace_id]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone,workspace_id]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - Made the column `country` on table `addresses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "state" TEXT,
ADD COLUMN     "zip" TEXT,
ALTER COLUMN "country" SET NOT NULL;

-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "preferred_contact_method" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_workspace_id_key" ON "companies"("email", "workspace_id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_phone_workspace_id_key" ON "companies"("phone", "workspace_id");
