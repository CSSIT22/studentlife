-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Block_Friend" (
    "userId" TEXT NOT NULL,
    "anotherUserId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Block_Friend_pkey" PRIMARY KEY ("userId","anotherUserId")
);

-- CreateTable
CREATE TABLE "EXP" (
    "userId" TEXT NOT NULL,
    "currentXP" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "EXP_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Action_to_XP" (
    "userId" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "actionXp" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Action_to_XP_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Block_Friend" ADD CONSTRAINT "Block_Friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block_Friend" ADD CONSTRAINT "Block_Friend_anotherUserId_fkey" FOREIGN KEY ("anotherUserId") REFERENCES "User_profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EXP" ADD CONSTRAINT "EXP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action_to_XP" ADD CONSTRAINT "Action_to_XP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "EXP"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
