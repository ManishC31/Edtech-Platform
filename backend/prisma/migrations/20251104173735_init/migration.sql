/*
  Warnings:

  - You are about to drop the column `module_id` on the `video` table. All the data in the column will be lost.
  - Added the required column `moduleId` to the `video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."video" DROP CONSTRAINT "video_module_id_fkey";

-- AlterTable
ALTER TABLE "video" DROP COLUMN "module_id",
ADD COLUMN     "moduleId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "video" ADD CONSTRAINT "video_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
