/*
  Warnings:

  - You are about to drop the column `userId` on the `Detail` table. All the data in the column will be lost.
  - The primary key for the `Faculty` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `faculty` on the `Faculty` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Faculty` table. All the data in the column will be lost.
  - The primary key for the `Major` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `major` on the `Major` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Major` table. All the data in the column will be lost.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roleId` on the `Role` table. All the data in the column will be lost.
  - The primary key for the `User_profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Detail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User_profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facultyId` to the `Faculty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facultyName` to the `Faculty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facultyId` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `majorId` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `majorName` to the `Major` table without a default value. This is not possible if the table is not empty.
  - The required column `userId` was added to the `User_profile` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Detail" DROP CONSTRAINT "Detail_userId_fkey";

-- DropForeignKey
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_userId_fkey";

-- DropForeignKey
ALTER TABLE "Major" DROP CONSTRAINT "Major_userId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_userId_fkey";

-- DropIndex
DROP INDEX "Detail_userId_key";

-- DropIndex
DROP INDEX "Role_userId_key";

-- AlterTable
ALTER TABLE "Detail" DROP COLUMN "userId",
ADD COLUMN     "id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_pkey",
DROP COLUMN "faculty",
DROP COLUMN "userId",
ADD COLUMN     "facultyId" TEXT NOT NULL,
ADD COLUMN     "facultyName" TEXT NOT NULL,
ADD CONSTRAINT "Faculty_pkey" PRIMARY KEY ("facultyId");

-- AlterTable
ALTER TABLE "Major" DROP CONSTRAINT "Major_pkey",
DROP COLUMN "major",
DROP COLUMN "userId",
ADD COLUMN     "facultyId" TEXT NOT NULL,
ADD COLUMN     "majorId" TEXT NOT NULL,
ADD COLUMN     "majorName" TEXT NOT NULL,
ADD CONSTRAINT "Major_pkey" PRIMARY KEY ("majorId");

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "roleId",
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "User_profile" DROP CONSTRAINT "User_profile_pkey",
ADD COLUMN     "image" BYTEA,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "User_profile_pkey" PRIMARY KEY ("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Detail_id_key" ON "Detail"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_profile_email_key" ON "User_profile"("email");

-- AddForeignKey
ALTER TABLE "User_profile" ADD CONSTRAINT "student_major" FOREIGN KEY ("userId") REFERENCES "Major"("majorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_profile" ADD CONSTRAINT "student_faculty" FOREIGN KEY ("userId") REFERENCES "Faculty"("facultyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_id_fkey" FOREIGN KEY ("id") REFERENCES "User_profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Major" ADD CONSTRAINT "Major_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("facultyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
