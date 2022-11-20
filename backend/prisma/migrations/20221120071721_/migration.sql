/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `Activity_Poll` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomId` to the `Activity_Poll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity_Poll" ADD COLUMN     "roomId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "Chat_Group" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "Chat_Room" ALTER COLUMN "deleted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- CreateIndex
CREATE UNIQUE INDEX "Activity_Poll_roomId_key" ON "Activity_Poll"("roomId");

-- AddForeignKey
ALTER TABLE "Activity_Poll" ADD CONSTRAINT "Activity_Poll_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Chat_Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;
