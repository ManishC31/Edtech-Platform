/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `longDes` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `shortDes` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `totalTime` on the `course` table. All the data in the column will be lost.
  - Added the required column `imageurl` to the `course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longdes` to the `course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortdes` to the `course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totaltime` to the `course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "course" DROP COLUMN "imageUrl",
DROP COLUMN "longDes",
DROP COLUMN "shortDes",
DROP COLUMN "totalTime",
ADD COLUMN     "imageurl" TEXT NOT NULL,
ADD COLUMN     "longdes" TEXT NOT NULL,
ADD COLUMN     "shortdes" TEXT NOT NULL,
ADD COLUMN     "totaltime" INTEGER NOT NULL;
