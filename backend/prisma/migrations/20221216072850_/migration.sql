-- DropForeignKey
ALTER TABLE "Sn_File" DROP CONSTRAINT "Sn_File_snId_fkey";

-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "Restaurant_Detail" ALTER COLUMN "phoneNo" SET DEFAULT '-',
ALTER COLUMN "website" SET DEFAULT '';

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AddForeignKey
ALTER TABLE "Sn_File" ADD CONSTRAINT "Sn_File_snId_fkey" FOREIGN KEY ("snId") REFERENCES "Sn_Head"("snId") ON DELETE CASCADE ON UPDATE CASCADE;
