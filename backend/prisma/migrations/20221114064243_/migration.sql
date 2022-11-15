/*
  Warnings:

  - The primary key for the `Login_Detail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `token` on the `Login_Info` table. All the data in the column will be lost.
  - The primary key for the `Logout_Detail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `token` on the `Logout_Info` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[detailId]` on the table `Login_Info` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[detailId]` on the table `Logout_Info` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[loginId]` on the table `User_Back` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[logoutId]` on the table `User_Back` will be added. If there are existing duplicate values, this will fail.
  - The required column `detailId` was added to the `Login_Detail` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `detailId` to the `Login_Info` table without a default value. This is not possible if the table is not empty.
  - The required column `detailId` was added to the `Logout_Detail` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `detailId` to the `Logout_Info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loginId` to the `User_Back` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logoutId` to the `User_Back` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Login_Detail" DROP CONSTRAINT "Login_Detail_loginId_fkey";

-- DropForeignKey
ALTER TABLE "Login_Info" DROP CONSTRAINT "Login_Info_userId_token_fkey";

-- DropForeignKey
ALTER TABLE "Logout_Detail" DROP CONSTRAINT "Logout_Detail_logoutId_fkey";

-- DropForeignKey
ALTER TABLE "Logout_Info" DROP CONSTRAINT "Logout_Info_userId_token_fkey";

-- AlterTable
ALTER TABLE "Login_Detail" DROP CONSTRAINT "Login_Detail_pkey",
ADD COLUMN     "detailId" TEXT NOT NULL,
ADD CONSTRAINT "Login_Detail_pkey" PRIMARY KEY ("detailId");

-- AlterTable
ALTER TABLE "Login_Info" DROP COLUMN "token",
ADD COLUMN     "detailId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Logout_Detail" DROP CONSTRAINT "Logout_Detail_pkey",
ADD COLUMN     "detailId" TEXT NOT NULL,
ADD CONSTRAINT "Logout_Detail_pkey" PRIMARY KEY ("detailId");

-- AlterTable
ALTER TABLE "Logout_Info" DROP COLUMN "token",
ADD COLUMN     "detailId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User_Back" ADD COLUMN     "loginId" TEXT NOT NULL,
ADD COLUMN     "logoutId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Login_Info_detailId_key" ON "Login_Info"("detailId");

-- CreateIndex
CREATE UNIQUE INDEX "Logout_Info_detailId_key" ON "Logout_Info"("detailId");

-- CreateIndex
CREATE UNIQUE INDEX "User_Back_loginId_key" ON "User_Back"("loginId");

-- CreateIndex
CREATE UNIQUE INDEX "User_Back_logoutId_key" ON "User_Back"("logoutId");

-- AddForeignKey
ALTER TABLE "Login_Info" ADD CONSTRAINT "Login_Info_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "User_Back"("loginId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Login_Detail" ADD CONSTRAINT "Login_Detail_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Login_Info"("detailId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logout_Info" ADD CONSTRAINT "Logout_Info_logoutId_fkey" FOREIGN KEY ("logoutId") REFERENCES "User_Back"("logoutId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logout_Detail" ADD CONSTRAINT "Logout_Detail_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Logout_Info"("detailId") ON DELETE CASCADE ON UPDATE CASCADE;
