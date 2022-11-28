/*
  Warnings:

  - You are about to drop the column `payMethodId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `E_Banking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction_Paymethod` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Credit_Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Credit_Card" DROP CONSTRAINT "Credit_Card_crId_fkey";

-- DropForeignKey
ALTER TABLE "E_Banking" DROP CONSTRAINT "E_Banking_ebId_fkey";

-- DropForeignKey
ALTER TABLE "QR" DROP CONSTRAINT "QR_qrId_fkey";

-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "Credit_Card" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "payMethodId";

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- DropTable
DROP TABLE "E_Banking";

-- DropTable
DROP TABLE "Transaction_Paymethod";

-- AddForeignKey
ALTER TABLE "Credit_Card" ADD CONSTRAINT "Credit_Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
