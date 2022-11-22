/*
  Warnings:

  - The values [USER_PROFILE,AIRDROP] on the enum `Module` will be removed. If these variants are still used in the database, this will fail.
  - The values [CHAT,DATING,QnA,COMMUNITY,USER_PROFILE,ANNOUNCEMENT,AIRDROP,TRANSACTION,SHOP_REVIEW,SCHEDULE,TODO_LIST] on the enum `Template` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Module_new" AS ENUM ('ANNOUNCEMENT', 'CHAT', 'COMMUNITY', 'DATING', 'QnA', 'SCHEDULE', 'SHOP_REVIEW', 'TODO_LIST', 'TRANSACTION');
ALTER TABLE "Noti_Object" ALTER COLUMN "module" TYPE "Module_new" USING ("module"::text::"Module_new");
ALTER TYPE "Module" RENAME TO "Module_old";
ALTER TYPE "Module_new" RENAME TO "Module";
DROP TYPE "Module_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Template_new" AS ENUM ('ANNOUNCEMENT_APPROVED', 'ANNOUNCEMENT_NEW', 'ANNOUNCEMENT_WAIT_FOR_APPROVE', 'CHAT_MESSAGE', 'COMMUNITY_INVITE', 'COMMUNITY_POST', 'DATING_ACCEPTED', 'DATING_INTERESTED', 'DATING_MATCH', 'DATING_MATCH_FRIEND', 'QnA_ANSWER', 'QnA_ANSWER_ANONYMOUS', 'SCHEDULE_EVENT', 'SHOP_REVIEW_COMMENT', 'TODO_LIST_TASK', 'TRANSACTION_SUCCESS', 'TRANSACTION_TRANSFER');
ALTER TABLE "Noti_Object" ALTER COLUMN "template" TYPE "Template_new" USING ("template"::text::"Template_new");
ALTER TYPE "Template" RENAME TO "Template_old";
ALTER TYPE "Template_new" RENAME TO "Template";
DROP TYPE "Template_old";
COMMIT;

-- AlterTable
ALTER TABLE "Analytic_User_Report" ALTER COLUMN "end" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "Chat_Group" ALTER COLUMN "lefted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "Chat_Room" ALTER COLUMN "deleted" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "QR" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);

-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expired" SET DEFAULT make_timestamp(3000, 1, 1, 0, 0, 0);
