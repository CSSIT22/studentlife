/*
  Warnings:

  - You are about to drop the column `roomName` on the `Chat_Room` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Shop_Order" DROP CONSTRAINT "Shop_Order_couponCode_fkey";

-- DropIndex
DROP INDEX "User_Coupon_couponCode_key";

-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "Chat_Room" DROP COLUMN "roomName";

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- CreateTable
CREATE TABLE "Chat_Group" (
    "roomId" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,

    CONSTRAINT "Chat_Group_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "SReview_Review_File" (
    "reviewId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,

    CONSTRAINT "SReview_Review_File_pkey" PRIMARY KEY ("reviewId","fileId")
);

-- AddForeignKey
ALTER TABLE "Chat_Group" ADD CONSTRAINT "Chat_Group_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Chat_Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Order" ADD CONSTRAINT "Shop_Order_userId_couponCode_fkey" FOREIGN KEY ("userId", "couponCode") REFERENCES "User_Coupon"("userId", "couponCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Review_File" ADD CONSTRAINT "SReview_Review_File_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "SReview_Review"("reviewId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Review_File" ADD CONSTRAINT "SReview_Review_File_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File_Info"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;
