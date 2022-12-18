/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Shop_Contact` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Shop_Order_couponCode_key";

-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "Shop_Contact" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- CreateIndex
CREATE UNIQUE INDEX "Shop_Contact_userId_key" ON "Shop_Contact"("userId");

-- AddForeignKey
ALTER TABLE "Shop_Contact" ADD CONSTRAINT "Shop_Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
