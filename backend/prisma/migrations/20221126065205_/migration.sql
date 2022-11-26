/*
  Warnings:

  - Added the required column `zone` to the `Restaurant_Detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zone` to the `SReview_Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "Restaurant_Detail" ADD COLUMN     "zone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SReview_Shop" ADD COLUMN     "zone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);
