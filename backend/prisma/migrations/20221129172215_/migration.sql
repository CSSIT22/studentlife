-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AddForeignKey
ALTER TABLE "Chat_Nickname" ADD CONSTRAINT "Chat_Nickname_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Nickname" ADD CONSTRAINT "Chat_Nickname_anotherUserId_fkey" FOREIGN KEY ("anotherUserId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Nickname" ADD CONSTRAINT "Chat_Nickname_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Chat_Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;
