-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- CreateTable
CREATE TABLE "Sn_File" (
    "snId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,

    CONSTRAINT "Sn_File_pkey" PRIMARY KEY ("snId","fileId")
);

-- AddForeignKey
ALTER TABLE "Sn_File" ADD CONSTRAINT "Sn_File_snId_fkey" FOREIGN KEY ("snId") REFERENCES "Sn_Head"("snId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_File" ADD CONSTRAINT "Sn_File_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File_Info"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;
