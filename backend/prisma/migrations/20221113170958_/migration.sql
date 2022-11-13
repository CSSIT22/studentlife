/*
  Warnings:

  - The primary key for the `Action_to_XP` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Announcement_Delete` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `delId` on the `Announcement_Delete` table. All the data in the column will be lost.
  - The primary key for the `Announcement_Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `statusId` on the `Announcement_Post` table. All the data in the column will be lost.
  - You are about to drop the column `user_ProfileUserId` on the `Chat_Room` table. All the data in the column will be lost.
  - You are about to drop the column `cUserId` on the `Chat_User` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Follow` table. All the data in the column will be lost.
  - The primary key for the `Post_Body` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bodyId` on the `Post_Body` table. All the data in the column will be lost.
  - You are about to drop the column `qDesc` on the `Question_Answer` table. All the data in the column will be lost.
  - You are about to drop the column `qTitle` on the `Question_Answer` table. All the data in the column will be lost.
  - The primary key for the `Sn_Access` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accessId` on the `Sn_Access` table. All the data in the column will be lost.
  - The primary key for the `Sn_Fav` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `favId` on the `Sn_Fav` table. All the data in the column will be lost.
  - The primary key for the `Sn_In_Library` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `inLibId` on the `Sn_In_Library` table. All the data in the column will be lost.
  - The primary key for the `Sn_Recent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `recentId` on the `Sn_Recent` table. All the data in the column will be lost.
  - The primary key for the `Task_Track` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `trackingId` on the `Task_Track` table. All the data in the column will be lost.
  - You are about to drop the column `payTypeId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `payTypeId` on the `Transaction_Paytype` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `User_Blocked` table. All the data in the column will be lost.
  - You are about to drop the column `limit` on the `User_Report` table. All the data in the column will be lost.
  - You are about to drop the `Description` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Following_Rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wordReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wordReportDetail` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[eventId]` on the table `Assignment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - The required column `actionId` was added to the `Action_to_XP` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `authorizedView` to the `Analytic_Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodHours` to the `Analytic_Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reportTime` to the `Analytic_Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unAuthorizedView` to the `Analytic_Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Analytic_Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Chat_User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emote` to the `Emote_Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emoteName` to the `Emote_Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desc` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `accessType` on the `File_Access` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `score` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `point` to the `Kmutt_Point` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Question_Answer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Access_Type" AS ENUM ('EVERYONE', 'COMMUNITY', 'MAJOR', 'DIRECT');

-- CreateEnum
CREATE TYPE "History_Type" AS ENUM ('UPLOAD', 'DOWNLOAD');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Message_Type" ADD VALUE 'RESTAURANT';
ALTER TYPE "Message_Type" ADD VALUE 'TRANSACTION';

-- DropForeignKey
ALTER TABLE "Chat_Room" DROP CONSTRAINT "Chat_Room_user_ProfileUserId_fkey";

-- DropForeignKey
ALTER TABLE "Chat_User" DROP CONSTRAINT "Chat_User_cUserId_fkey";

-- DropForeignKey
ALTER TABLE "Description" DROP CONSTRAINT "Description_descId_fkey";

-- DropForeignKey
ALTER TABLE "Following_Rating" DROP CONSTRAINT "Following_Rating_userId_fkey";

-- DropForeignKey
ALTER TABLE "Login_Detail" DROP CONSTRAINT "Login_Detail_loginId_fkey";

-- DropForeignKey
ALTER TABLE "Login_Info" DROP CONSTRAINT "Login_Info_userId_token_fkey";

-- DropForeignKey
ALTER TABLE "Logout_Detail" DROP CONSTRAINT "Logout_Detail_logoutId_fkey";

-- DropForeignKey
ALTER TABLE "Logout_Info" DROP CONSTRAINT "Logout_Info_userId_token_fkey";

-- DropForeignKey
ALTER TABLE "User_To_Room" DROP CONSTRAINT "User_To_Room_userId_fkey";

-- DropForeignKey
ALTER TABLE "wordReport" DROP CONSTRAINT "wordReport_userId_fkey";

-- DropForeignKey
ALTER TABLE "wordReport" DROP CONSTRAINT "wordReport_wordReportId_fkey";

-- DropForeignKey
ALTER TABLE "wordReportDetail" DROP CONSTRAINT "wordReportDetail_roomId_fkey";

-- DropForeignKey
ALTER TABLE "wordReportDetail" DROP CONSTRAINT "wordReportDetail_wordReportDetailId_fkey";

-- DropIndex
DROP INDEX "Announcement_Post_postId_key";

-- DropIndex
DROP INDEX "Card_Queue_userId_key";

-- DropIndex
DROP INDEX "Chat_User_cUserId_key";

-- DropIndex
DROP INDEX "Post_Body_postId_key";

-- DropIndex
DROP INDEX "Task_Track_userId_key";

-- DropIndex
DROP INDEX "Transaction_Error_errId_key";

-- AlterTable
ALTER TABLE "Action_to_XP" DROP CONSTRAINT "Action_to_XP_pkey",
ADD COLUMN     "actionId" TEXT NOT NULL,
ADD CONSTRAINT "Action_to_XP_pkey" PRIMARY KEY ("actionId");

-- AlterTable
ALTER TABLE "Analytic_Report" ADD COLUMN     "authorizedView" INTEGER NOT NULL,
ADD COLUMN     "periodHours" INTEGER NOT NULL,
ADD COLUMN     "reportTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "unAuthorizedView" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Announcement_Delete" DROP CONSTRAINT "Announcement_Delete_pkey",
DROP COLUMN "delId",
ADD CONSTRAINT "Announcement_Delete_pkey" PRIMARY KEY ("postId");

-- AlterTable
ALTER TABLE "Announcement_Post" DROP CONSTRAINT "Announcement_Post_pkey",
DROP COLUMN "statusId",
ADD CONSTRAINT "Announcement_Post_pkey" PRIMARY KEY ("postId");

-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "eventId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Card_Queue" ADD CONSTRAINT "Card_Queue_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "Chat_Room" DROP COLUMN "user_ProfileUserId";

-- AlterTable
ALTER TABLE "Chat_User" DROP COLUMN "cUserId",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "Chat_User_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "eventId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Emote_Collection" ADD COLUMN     "emote" TEXT NOT NULL,
ADD COLUMN     "emoteName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "desc" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "File_Access" DROP COLUMN "accessType",
ADD COLUMN     "accessType" "Access_Type" NOT NULL;

-- AlterTable
ALTER TABLE "Follow" DROP COLUMN "status",
ADD COLUMN     "score" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Kmutt_Point" ADD COLUMN     "point" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post_Body" DROP CONSTRAINT "Post_Body_pkey",
DROP COLUMN "bodyId",
ADD CONSTRAINT "Post_Body_pkey" PRIMARY KEY ("postId");

-- AlterTable
ALTER TABLE "Question_Answer" DROP COLUMN "qDesc",
DROP COLUMN "qTitle",
ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sn_Access" DROP CONSTRAINT "Sn_Access_pkey",
DROP COLUMN "accessId",
ADD CONSTRAINT "Sn_Access_pkey" PRIMARY KEY ("snId", "userId");

-- AlterTable
ALTER TABLE "Sn_Fav" DROP CONSTRAINT "Sn_Fav_pkey",
DROP COLUMN "favId",
ADD CONSTRAINT "Sn_Fav_pkey" PRIMARY KEY ("snId", "userId");

-- AlterTable
ALTER TABLE "Sn_In_Library" DROP CONSTRAINT "Sn_In_Library_pkey",
DROP COLUMN "inLibId",
ADD CONSTRAINT "Sn_In_Library_pkey" PRIMARY KEY ("libId");

-- AlterTable
ALTER TABLE "Sn_Recent" DROP CONSTRAINT "Sn_Recent_pkey",
DROP COLUMN "recentId",
ADD CONSTRAINT "Sn_Recent_pkey" PRIMARY KEY ("snId", "userId");

-- AlterTable
ALTER TABLE "Task_Track" DROP CONSTRAINT "Task_Track_pkey",
DROP COLUMN "trackingId",
ADD CONSTRAINT "Task_Track_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "payTypeId";

-- AlterTable
ALTER TABLE "Transaction_Paytype" DROP COLUMN "payTypeId";

-- AlterTable
ALTER TABLE "User_Blocked" DROP COLUMN "status",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User_Report" DROP COLUMN "limit";

-- DropTable
DROP TABLE "Description";

-- DropTable
DROP TABLE "Following_Rating";

-- DropTable
DROP TABLE "wordReport";

-- DropTable
DROP TABLE "wordReportDetail";

-- CreateTable
CREATE TABLE "File_History" (
    "fileId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "historyType" "History_Type" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_History_pkey" PRIMARY KEY ("fileId","userId")
);

-- CreateTable
CREATE TABLE "Word_Report" (
    "wordReportId" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Word_Report_pkey" PRIMARY KEY ("wordReportId")
);

-- CreateTable
CREATE TABLE "Word_Report_Detail" (
    "wordReportDetailId" INTEGER NOT NULL,
    "roomId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "reportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Word_Report_Detail_pkey" PRIMARY KEY ("wordReportDetailId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_eventId_key" ON "Assignment"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_eventId_key" ON "Course"("eventId");

-- AddForeignKey
ALTER TABLE "Repost" ADD CONSTRAINT "Repost_newPostId_fkey" FOREIGN KEY ("newPostId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement_Delete" ADD CONSTRAINT "Announcement_Delete_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Announcement"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_User" ADD CONSTRAINT "Chat_User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_To_Room" ADD CONSTRAINT "User_To_Room_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Chat_User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Chat_User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Quote" ADD CONSTRAINT "Chat_Quote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Chat_User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card_Queue" ADD CONSTRAINT "Card_Queue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_communityOwnerId_fkey" FOREIGN KEY ("communityOwnerId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File_Info" ADD CONSTRAINT "File_Info_fileSender_fkey" FOREIGN KEY ("fileSender") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File_History" ADD CONSTRAINT "File_History_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File_Info"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File_History" ADD CONSTRAINT "File_History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Back" ADD CONSTRAINT "User_Back_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Login_Info" ADD CONSTRAINT "Login_Info_userId_token_fkey" FOREIGN KEY ("userId", "token") REFERENCES "User_Back"("userId", "token") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Login_Detail" ADD CONSTRAINT "Login_Detail_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "Login_Info"("loginId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logout_Info" ADD CONSTRAINT "Logout_Info_userId_token_fkey" FOREIGN KEY ("userId", "token") REFERENCES "User_Back"("userId", "token") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logout_Detail" ADD CONSTRAINT "Logout_Detail_logoutId_fkey" FOREIGN KEY ("logoutId") REFERENCES "Logout_Info"("logoutId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word_Report" ADD CONSTRAINT "Word_Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word_Report" ADD CONSTRAINT "Word_Report_wordReportId_fkey" FOREIGN KEY ("wordReportId") REFERENCES "Filtered_Word"("wordReportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word_Report_Detail" ADD CONSTRAINT "Word_Report_Detail_wordReportDetailId_fkey" FOREIGN KEY ("wordReportDetailId") REFERENCES "Word_Report"("wordReportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word_Report_Detail" ADD CONSTRAINT "Word_Report_Detail_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Chat_Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Coupon" ADD CONSTRAINT "Shop_Coupon_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Shop_Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytic_Report" ADD CONSTRAINT "Analytic_Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
