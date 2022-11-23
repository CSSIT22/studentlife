/*
  Warnings:

  - Added the required column `address` to the `Detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth` to the `Detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hobby` to the `Detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Detail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Detail" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "birth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hobby" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "sex" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
