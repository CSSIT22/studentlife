/*
  Warnings:

  - You are about to drop the column `joined` on the `Chat_Group` table. All the data in the column will be lost.
  - You are about to drop the column `lefted` on the `Chat_Group` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `Chat_Room` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `User_To_Room` table. All the data in the column will be lost.
  - You are about to drop the `Chat_User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chat_Quote" DROP CONSTRAINT "Chat_Quote_userId_fkey";

-- DropForeignKey
ALTER TABLE "Chat_User" DROP CONSTRAINT "Chat_User_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "User_To_Room" DROP CONSTRAINT "User_To_Room_userId_fkey";

-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "Chat_Group" DROP COLUMN "joined",
DROP COLUMN "lefted";

-- AlterTable
ALTER TABLE "Chat_Room" DROP COLUMN "deleted";

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_To_Room" DROP COLUMN "nickname",
ADD COLUMN     "joined" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lefted" TIMESTAMP(0) NOT NULL DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- DropTable
DROP TABLE "Chat_User";

-- CreateTable
CREATE TABLE "Chat_Individual" (
    "roomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "anotherUserId" TEXT NOT NULL,

    CONSTRAINT "Chat_Individual_pkey" PRIMARY KEY ("userId","anotherUserId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chat_Individual_roomId_key" ON "Chat_Individual"("roomId");

-- AddForeignKey
ALTER TABLE "User_To_Room" ADD CONSTRAINT "User_To_Room_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Individual" ADD CONSTRAINT "Chat_Individual_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Chat_Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Individual" ADD CONSTRAINT "Chat_Individual_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Individual" ADD CONSTRAINT "Chat_Individual_anotherUserId_fkey" FOREIGN KEY ("anotherUserId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User_Profile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Quote" ADD CONSTRAINT "Chat_Quote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
