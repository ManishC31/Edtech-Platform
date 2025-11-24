/*
  Warnings:

  - You are about to drop the column `moduleId` on the `video` table. All the data in the column will be lost.
  - Added the required column `module_id` to the `video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."video" DROP CONSTRAINT "video_moduleId_fkey";

-- AlterTable
ALTER TABLE "video" DROP COLUMN "moduleId",
ADD COLUMN     "module_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "video" ADD CONSTRAINT "video_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
