/*
  Warnings:

  - A unique constraint covering the columns `[moduleName,role_id]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "permissions_moduleName_workspace_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "permissions_moduleName_role_id_key" ON "permissions"("moduleName", "role_id");
