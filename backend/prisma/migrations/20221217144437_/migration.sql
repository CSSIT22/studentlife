/*
  Warnings:

  - The values [MENTION] on the enum `Noti_Type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Noti_Type_new" AS ENUM ('ALL', 'IGNORE');
ALTER TABLE "Noti_User" ALTER COLUMN "notiSettingApp" DROP DEFAULT;
ALTER TABLE "Noti_User" ALTER COLUMN "notiSettingEmail" DROP DEFAULT;
ALTER TABLE "Noti_User" ALTER COLUMN "notiSettingEmail" TYPE "Noti_Type_new" USING ("notiSettingEmail"::text::"Noti_Type_new");
ALTER TABLE "Noti_User" ALTER COLUMN "notiSettingApp" TYPE "Noti_Type_new" USING ("notiSettingApp"::text::"Noti_Type_new");
ALTER TYPE "Noti_Type" RENAME TO "Noti_Type_old";
ALTER TYPE "Noti_Type_new" RENAME TO "Noti_Type";
DROP TYPE "Noti_Type_old";
ALTER TABLE "Noti_User" ALTER COLUMN "notiSettingApp" SET DEFAULT 'ALL';
ALTER TABLE "Noti_User" ALTER COLUMN "notiSettingEmail" SET DEFAULT 'ALL';
COMMIT;

-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "User_To_Room" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);
