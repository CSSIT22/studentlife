-- DropForeignKey
ALTER TABLE "Activity_Poll" DROP CONSTRAINT "Activity_Poll_roomId_fkey";

-- AlterTable
ALTER TABLE "Activity_Poll" ALTER COLUMN "roomId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AddForeignKey
ALTER TABLE "Activity_Poll" ADD CONSTRAINT "Activity_Poll_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Chat_Room"("roomId") ON DELETE SET NULL ON UPDATE CASCADE;
