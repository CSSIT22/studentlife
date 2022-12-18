-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- CreateTable
CREATE TABLE "ShortLink_Save" (
    "slId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "ShortLink_Save_pkey" PRIMARY KEY ("slId")
);

-- AddForeignKey
ALTER TABLE "ShortLink_Save" ADD CONSTRAINT "ShortLink_Save_slId_fkey" FOREIGN KEY ("slId") REFERENCES "ShortLink"("slId") ON DELETE RESTRICT ON UPDATE CASCADE;
