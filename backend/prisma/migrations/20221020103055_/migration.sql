-- CreateTable
CREATE TABLE "Report" (
    "userId" TEXT NOT NULL,
    "anotherUserId" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("userId","anotherUserId")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_anotherUserId_fkey" FOREIGN KEY ("anotherUserId") REFERENCES "User_profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
