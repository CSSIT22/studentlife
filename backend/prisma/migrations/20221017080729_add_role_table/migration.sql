-- CreateTable
CREATE TABLE "Role" (
    "roleId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "club" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "expire_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("roleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_userId_key" ON "Role"("userId");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_profile"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;
