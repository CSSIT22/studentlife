/*
  Warnings:

  - The values [ANNOUCEMENT_ANNOUNCER] on the enum `Role_Type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_Type_new" AS ENUM ('ANNOUNCEMENT_APPROVER', 'ANNOUNCEMENT_ANNOUNCER', 'SCHEDULE_CREATER');
ALTER TABLE "Role" ALTER COLUMN "roleName" TYPE "Role_Type_new" USING ("roleName"::text::"Role_Type_new");
ALTER TYPE "Role_Type" RENAME TO "Role_Type_old";
ALTER TYPE "Role_Type_new" RENAME TO "Role_Type";
DROP TYPE "Role_Type_old";
COMMIT;