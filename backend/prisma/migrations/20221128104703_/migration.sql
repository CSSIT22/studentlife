-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "SReview_Restaurant_Review" ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "likeReceived" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "SReview_Shop_Review" ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "likeReceived" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);
