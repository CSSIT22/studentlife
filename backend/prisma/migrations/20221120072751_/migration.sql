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

-- AlterTable
ALTER TABLE "Sn_Head" ALTER COLUMN "created" SET DATA TYPE DATE;
