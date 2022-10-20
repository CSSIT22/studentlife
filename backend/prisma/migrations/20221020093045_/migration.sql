/*
  Warnings:

  - Added the required column `student_major` to the `User_profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User_profile" DROP CONSTRAINT "student_major";

-- AlterTable
ALTER TABLE "User_profile" ADD COLUMN     "student_major" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Follow" (
    "userId" TEXT NOT NULL,
    "anotherUserId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("userId","anotherUserId")
);

-- AddForeignKey
ALTER TABLE "User_profile" ADD CONSTRAINT "User_profile_student_major_fkey" FOREIGN KEY ("student_major") REFERENCES "Major"("majorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_anotherUserId_fkey" FOREIGN KEY ("anotherUserId") REFERENCES "User_profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
