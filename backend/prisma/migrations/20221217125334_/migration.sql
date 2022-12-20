/*
  Warnings:

  - You are about to drop the `Image_Container` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image_Container" DROP CONSTRAINT "Image_Container_postId_fkey";

-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- DropTable
DROP TABLE "Image_Container";

-- CreateTable
CREATE TABLE "File_Container" (
    "fileId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "fileAddress" TEXT NOT NULL,

    CONSTRAINT "File_Container_pkey" PRIMARY KEY ("fileId")
);

-- AddForeignKey
ALTER TABLE "File_Container" ADD CONSTRAINT "File_Container_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Student_Post"("postId") ON DELETE CASCADE ON UPDATE CASCADE;
