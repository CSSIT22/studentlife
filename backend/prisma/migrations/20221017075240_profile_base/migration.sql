-- CreateTable
CREATE TABLE "User_profile" (
    "studentId" TEXT NOT NULL,
    "fName" TEXT NOT NULL,
    "lName" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_profile_pkey" PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "Detail" (
    "id" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Major" (
    "userId" TEXT NOT NULL,
    "major" TEXT NOT NULL,

    CONSTRAINT "Major_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "userId" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Detail_userId_key" ON "Detail"("userId");

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_profile"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Major" ADD CONSTRAINT "Major_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_profile"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_profile"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;
