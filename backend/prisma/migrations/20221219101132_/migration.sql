/*
  Warnings:

  - Added the required column `link` to the `ShortLink_Save` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ShortLink_Save` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ShortLink_Save" DROP CONSTRAINT "ShortLink_Save_slId_fkey";

-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "ShortLink_Save" ADD COLUMN     "expired" TIMESTAMP(0) NOT NULL DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0),
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AddForeignKey
ALTER TABLE "ShortLink_Save" ADD CONSTRAINT "ShortLink_Save_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
