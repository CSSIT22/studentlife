-- DropForeignKey
ALTER TABLE "SReview_Review" DROP CONSTRAINT "SReview_Review_resId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Review" DROP CONSTRAINT "SReview_Review_shopId_fkey";

-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "SReview_Review" ALTER COLUMN "resId" DROP NOT NULL,
ALTER COLUMN "resId" DROP DEFAULT,
ALTER COLUMN "shopId" DROP NOT NULL,
ALTER COLUMN "shopId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AddForeignKey
ALTER TABLE "SReview_Review" ADD CONSTRAINT "SReview_Review_resId_fkey" FOREIGN KEY ("resId") REFERENCES "Restaurant"("resId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Review" ADD CONSTRAINT "SReview_Review_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "SReview_Shop"("shopId") ON DELETE SET NULL ON UPDATE CASCADE;
