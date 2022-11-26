/*
  Warnings:

  - You are about to drop the column `isRead` on the `Noti_Object` table. All the data in the column will be lost.
  - Added the required column `isRead` to the `User_Noti_Object` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "Noti_Object" DROP COLUMN "isRead";

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_Noti_Object" ADD COLUMN     "isRead" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);
