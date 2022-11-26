/*
  Warnings:

  - The primary key for the `Ban_Status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `banId` on the `Ban_Status` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "Ban_Status" DROP CONSTRAINT "Ban_Status_pkey",
DROP COLUMN "banId",
ADD CONSTRAINT "Ban_Status_pkey" PRIMARY KEY ("userId", "reason");

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);
