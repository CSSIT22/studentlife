/*
  Warnings:

  - The primary key for the `Community_Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `communityId` on the `Community_Role` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Community_Role` table. All the data in the column will be lost.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `club` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `expire_date` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roleId]` on the table `Community_User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roleId` to the `Community_User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expired` to the `Role` table without a default value. This is not possible if the table is not empty.
  - The required column `roleId` was added to the `Role` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `roleName` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role_Type" AS ENUM ('ANNOUCEMENT_ANNOUNCER', 'SCHEDULE_CREATER');

-- CreateEnum
CREATE TYPE "CRole_Type" AS ENUM ('ADMIN', 'CO_ADMIN', 'MEMBER');

-- DropForeignKey
ALTER TABLE "Community_Role" DROP CONSTRAINT "Community_Role_communityId_fkey";

-- DropForeignKey
ALTER TABLE "Community_Role" DROP CONSTRAINT "Community_Role_roleId_fkey";

-- DropForeignKey
ALTER TABLE "Community_Role" DROP CONSTRAINT "Community_Role_userId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_userId_fkey";

-- AlterTable
ALTER TABLE "Community_Role" DROP CONSTRAINT "Community_Role_pkey",
DROP COLUMN "communityId",
DROP COLUMN "userId",
ADD COLUMN     "roleName" "CRole_Type" NOT NULL DEFAULT 'MEMBER',
ADD CONSTRAINT "Community_Role_pkey" PRIMARY KEY ("roleId");

-- AlterTable
ALTER TABLE "Community_User" ADD COLUMN     "roleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "club",
DROP COLUMN "expire_date",
DROP COLUMN "rank",
DROP COLUMN "userId",
ADD COLUMN     "expired" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "roleId" TEXT NOT NULL,
ADD COLUMN     "roleName" "Role_Type" NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("roleId");

-- CreateTable
CREATE TABLE "User_To_Role" (
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "User_To_Role_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Community_User_roleId_key" ON "Community_User"("roleId");

-- AddForeignKey
ALTER TABLE "User_To_Role" ADD CONSTRAINT "User_To_Role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_To_Role" ADD CONSTRAINT "User_To_Role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_User" ADD CONSTRAINT "Community_User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Community_Role"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;
