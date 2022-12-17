/*
  Warnings:

  - You are about to drop the column `tagId` on the `Question_Default_Tag` table. All the data in the column will be lost.
  - The primary key for the `Question_Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "Question_Default_Tag" DROP COLUMN "tagId";

-- AlterTable
ALTER TABLE "Question_Tag" DROP CONSTRAINT "Question_Tag_pkey",
ADD CONSTRAINT "Question_Tag_pkey" PRIMARY KEY ("tagKey", "qId");

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);
