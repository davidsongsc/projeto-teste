/*
  Warnings:

  - You are about to drop the column `created_at` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `document` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_document_key";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "document",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "profileId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
