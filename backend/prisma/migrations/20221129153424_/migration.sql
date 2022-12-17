/*
  Warnings:

  - You are about to drop the column `descId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `Chat_Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chat_Individual` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SReview_Restaurant_Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SReview_Restaurant_Review_Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SReview_Shop_Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SReview_Shop_Review_Like` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rating` to the `SReview_Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `SReview_Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SReview_Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chat_Group" DROP CONSTRAINT "Chat_Group_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Chat_Individual" DROP CONSTRAINT "Chat_Individual_anotherUserId_fkey";

-- DropForeignKey
ALTER TABLE "Chat_Individual" DROP CONSTRAINT "Chat_Individual_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Chat_Individual" DROP CONSTRAINT "Chat_Individual_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Restaurant_Review" DROP CONSTRAINT "SReview_Restaurant_Review_resId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Restaurant_Review" DROP CONSTRAINT "SReview_Restaurant_Review_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Restaurant_Review" DROP CONSTRAINT "SReview_Restaurant_Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Restaurant_Review_Like" DROP CONSTRAINT "SReview_Restaurant_Review_Like_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Restaurant_Review_Like" DROP CONSTRAINT "SReview_Restaurant_Review_Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Shop_Review" DROP CONSTRAINT "SReview_Shop_Review_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Shop_Review" DROP CONSTRAINT "SReview_Shop_Review_shopId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Shop_Review" DROP CONSTRAINT "SReview_Shop_Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Shop_Review_Like" DROP CONSTRAINT "SReview_Shop_Review_Like_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Shop_Review_Like" DROP CONSTRAINT "SReview_Shop_Review_Like_userId_fkey";

-- DropIndex
DROP INDEX "Event_descId_key";

-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "descId";

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "SReview_Review" ADD COLUMN     "likeReceived" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "resId" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "reviewedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "shopId" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- DropTable
DROP TABLE "Chat_Group";

-- DropTable
DROP TABLE "Chat_Individual";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "SReview_Restaurant_Review";

-- DropTable
DROP TABLE "SReview_Restaurant_Review_Like";

-- DropTable
DROP TABLE "SReview_Shop_Review";

-- DropTable
DROP TABLE "SReview_Shop_Review_Like";

-- CreateTable
CREATE TABLE "Chat_Nickname" (
    "userId" TEXT NOT NULL,
    "anotherUserId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,

    CONSTRAINT "Chat_Nickname_pkey" PRIMARY KEY ("userId","anotherUserId","roomId")
);

-- CreateTable
CREATE TABLE "SReview_Review_Like" (
    "reviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SReview_Review_Like_pkey" PRIMARY KEY ("reviewId","userId")
);

-- AddForeignKey
ALTER TABLE "SReview_Review" ADD CONSTRAINT "SReview_Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Review" ADD CONSTRAINT "SReview_Review_resId_fkey" FOREIGN KEY ("resId") REFERENCES "Restaurant"("resId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Review" ADD CONSTRAINT "SReview_Review_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "SReview_Shop"("shopId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Review_Like" ADD CONSTRAINT "SReview_Review_Like_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "SReview_Review"("reviewId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Review_Like" ADD CONSTRAINT "SReview_Review_Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
