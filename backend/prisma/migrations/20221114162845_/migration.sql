/*
  Warnings:

  - The primary key for the `Login_Detail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `detailId` on the `Login_Detail` table. All the data in the column will be lost.
  - You are about to drop the column `detailId` on the `Login_Info` table. All the data in the column will be lost.
  - The primary key for the `Logout_Detail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `detailId` on the `Logout_Detail` table. All the data in the column will be lost.
  - You are about to drop the column `detailId` on the `Logout_Info` table. All the data in the column will be lost.
  - You are about to drop the column `loginId` on the `User_Back` table. All the data in the column will be lost.
  - You are about to drop the column `logoutId` on the `User_Back` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,token]` on the table `Login_Info` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,token]` on the table `Logout_Info` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `Login_Info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `Logout_Info` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Login_Detail" DROP CONSTRAINT "Login_Detail_detailId_fkey";

-- DropForeignKey
ALTER TABLE "Login_Info" DROP CONSTRAINT "Login_Info_loginId_fkey";

-- DropForeignKey
ALTER TABLE "Logout_Detail" DROP CONSTRAINT "Logout_Detail_detailId_fkey";

-- DropForeignKey
ALTER TABLE "Logout_Info" DROP CONSTRAINT "Logout_Info_logoutId_fkey";

-- DropIndex
DROP INDEX "Login_Info_detailId_key";

-- DropIndex
DROP INDEX "Logout_Info_detailId_key";

-- DropIndex
DROP INDEX "User_Back_loginId_key";

-- DropIndex
DROP INDEX "User_Back_logoutId_key";

-- AlterTable
ALTER TABLE "Login_Detail" DROP CONSTRAINT "Login_Detail_pkey",
DROP COLUMN "detailId",
ADD CONSTRAINT "Login_Detail_pkey" PRIMARY KEY ("loginId");

-- AlterTable
ALTER TABLE "Login_Info" DROP COLUMN "detailId",
ADD COLUMN     "token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Logout_Detail" DROP CONSTRAINT "Logout_Detail_pkey",
DROP COLUMN "detailId",
ADD CONSTRAINT "Logout_Detail_pkey" PRIMARY KEY ("logoutId");

-- AlterTable
ALTER TABLE "Logout_Info" DROP COLUMN "detailId",
ADD COLUMN     "token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User_Back" DROP COLUMN "loginId",
DROP COLUMN "logoutId";

-- CreateIndex
CREATE UNIQUE INDEX "Login_Info_userId_token_key" ON "Login_Info"("userId", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Logout_Info_userId_token_key" ON "Logout_Info"("userId", "token");

-- AddForeignKey
ALTER TABLE "Login_Info" ADD CONSTRAINT "Login_Info_userId_token_fkey" FOREIGN KEY ("userId", "token") REFERENCES "User_Back"("userId", "token") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Login_Detail" ADD CONSTRAINT "Login_Detail_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "Login_Info"("loginId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logout_Info" ADD CONSTRAINT "Logout_Info_userId_token_fkey" FOREIGN KEY ("userId", "token") REFERENCES "User_Back"("userId", "token") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logout_Detail" ADD CONSTRAINT "Logout_Detail_logoutId_fkey" FOREIGN KEY ("logoutId") REFERENCES "Logout_Info"("logoutId") ON DELETE CASCADE ON UPDATE CASCADE;
