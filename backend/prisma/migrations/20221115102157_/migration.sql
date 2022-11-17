/*
  Warnings:

  - Changed the type of `location` on the `Analytic_Request` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `location` on the `Analytic_View` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "User_Profile" DROP CONSTRAINT "User_Profile_majorId_fkey";

-- AlterTable
ALTER TABLE "Activity_Poll" ALTER COLUMN "pollAppointAt" SET DATA TYPE TIMESTAMP(0);

-- AlterTable
ALTER TABLE "Analytic_Request" DROP COLUMN "location",
ADD COLUMN     "location" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Analytic_View" DROP COLUMN "location",
ADD COLUMN     "location" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User_Profile" ALTER COLUMN "majorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User_Profile" ADD CONSTRAINT "User_Profile_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("majorId") ON DELETE SET NULL ON UPDATE CASCADE;
