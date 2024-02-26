/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profile_picture` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `workspaces` table. All the data in the column will be lost.
  - You are about to drop the column `workspace_id` on the `workspaces` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `otps` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[otp,user_id]` on the table `otps` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sent_over` to the `otps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `workspaces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owned_by` to the `workspaces` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OtpSentTo" AS ENUM ('EMAIL', 'PHONE');

-- DropIndex
DROP INDEX "workspaces_workspace_id_key";

-- AlterTable
ALTER TABLE "otps" ADD COLUMN     "sent_over" "OtpSentTo" NOT NULL,
ADD COLUMN     "user_id" TEXT,
ADD COLUMN     "verified_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
DROP COLUMN "profile_picture",
ADD COLUMN     "default_workspace_id" TEXT,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "profile_picture_id" TEXT,
ALTER COLUMN "phone_number" DROP NOT NULL;

-- AlterTable
ALTER TABLE "workspaces" DROP COLUMN "logo",
DROP COLUMN "workspace_id",
ADD COLUMN     "country" TEXT,
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "logo_id" TEXT,
ADD COLUMN     "owned_by" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "otps_user_id_key" ON "otps"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "otps_otp_user_id_key" ON "otps"("otp", "user_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_profile_picture_id_fkey" FOREIGN KEY ("profile_picture_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_default_workspace_id_fkey" FOREIGN KEY ("default_workspace_id") REFERENCES "workspaces"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "otps" ADD CONSTRAINT "otps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_logo_id_fkey" FOREIGN KEY ("logo_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_owned_by_fkey" FOREIGN KEY ("owned_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
