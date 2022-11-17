/*
  Warnings:

  - The primary key for the `Faculty` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Major` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `student_major` on the `User_Profile` table. All the data in the column will be lost.
  - Added the required column `majorId` to the `User_Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Major" DROP CONSTRAINT "Major_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Major_Access" DROP CONSTRAINT "Major_Access_majorId_fkey";

-- DropForeignKey
ALTER TABLE "ShortLink_Permission_Faculty" DROP CONSTRAINT "ShortLink_Permission_Faculty_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "ShortLink_Permission_Major" DROP CONSTRAINT "ShortLink_Permission_Major_majorId_fkey";

-- DropForeignKey
ALTER TABLE "User_Profile" DROP CONSTRAINT "User_Profile_student_major_fkey";

-- AlterTable
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_pkey",
ALTER COLUMN "facultyId" DROP DEFAULT,
ALTER COLUMN "facultyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Faculty_pkey" PRIMARY KEY ("facultyId");
DROP SEQUENCE "Faculty_facultyId_seq";

-- AlterTable
ALTER TABLE "Major" DROP CONSTRAINT "Major_pkey",
ALTER COLUMN "facultyId" SET DATA TYPE TEXT,
ALTER COLUMN "majorId" DROP DEFAULT,
ALTER COLUMN "majorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Major_pkey" PRIMARY KEY ("majorId");
DROP SEQUENCE "Major_majorId_seq";

-- AlterTable
ALTER TABLE "Major_Access" ALTER COLUMN "majorId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ShortLink_Permission_Faculty" ALTER COLUMN "facultyId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ShortLink_Permission_Major" ALTER COLUMN "majorId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User_Profile" DROP COLUMN "student_major",
ADD COLUMN     "majorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User_Profile" ADD CONSTRAINT "User_Profile_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("majorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Major" ADD CONSTRAINT "Major_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("facultyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Major_Access" ADD CONSTRAINT "Major_Access_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("majorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink_Permission_Major" ADD CONSTRAINT "ShortLink_Permission_Major_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("majorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink_Permission_Faculty" ADD CONSTRAINT "ShortLink_Permission_Faculty_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("facultyId") ON DELETE RESTRICT ON UPDATE CASCADE;
