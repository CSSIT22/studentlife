-- CreateTable
CREATE TABLE "Friend" (
    "userId" TEXT NOT NULL,
    "anotherUserId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("userId","anotherUserId")
);

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_anotherUserId_fkey" FOREIGN KEY ("anotherUserId") REFERENCES "User_profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
