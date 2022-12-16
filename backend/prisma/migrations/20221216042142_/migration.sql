/*
  Warnings:

  - A unique constraint covering the columns `[word,userId]` on the table `Word_Report` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Word_Report" DROP CONSTRAINT "Word_Report_wordReportId_fkey";

-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
CREATE SEQUENCE "filtered_word_wordreportid_seq";
ALTER TABLE "Filtered_Word" ALTER COLUMN "wordReportId" SET DEFAULT nextval('filtered_word_wordreportid_seq');
ALTER SEQUENCE "filtered_word_wordreportid_seq" OWNED BY "Filtered_Word"."wordReportId";

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- CreateIndex
CREATE UNIQUE INDEX "Word_Report_word_userId_key" ON "Word_Report"("word", "userId");
