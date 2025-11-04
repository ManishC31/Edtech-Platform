/*
  Warnings:

  - Added the required column `currency` to the `course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selling_price` to the `course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "course" ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "selling_price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "language" SET DEFAULT 'en',
ALTER COLUMN "total_time_mins" SET DEFAULT 0,
ALTER COLUMN "discount" SET DEFAULT 0.0,
ALTER COLUMN "discount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "module" ALTER COLUMN "total_lectures" SET DEFAULT 0,
ALTER COLUMN "total_mins" SET DEFAULT 0,
ALTER COLUMN "total_videos" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "video" ALTER COLUMN "resource_url" DROP NOT NULL;
