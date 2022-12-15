-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "folderId" DROP NOT NULL,
ALTER COLUMN "groupId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);
