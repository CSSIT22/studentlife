/*
  Warnings:

  - You are about to drop the column `placeId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `Event_Place` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `place` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_placeId_fkey";

-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "placeId",
ADD COLUMN     "place" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- DropTable
DROP TABLE "Event_Place";
