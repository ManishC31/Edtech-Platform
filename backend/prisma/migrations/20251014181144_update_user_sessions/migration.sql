/*
  Warnings:

  - You are about to drop the column `device_info` on the `user_sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_sessions" DROP COLUMN "device_info",
ADD COLUMN     "browser_name" TEXT,
ADD COLUMN     "browser_version" TEXT,
ADD COLUMN     "operating_system" TEXT;
