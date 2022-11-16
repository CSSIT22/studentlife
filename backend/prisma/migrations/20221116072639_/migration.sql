/*
  Warnings:

  - You are about to alter the column `chatColor` on the `Chat_Room` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(7)`.
  - You are about to alter the column `reason` on the `Comment_Report` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(1000)`.
  - You are about to alter the column `last4` on the `Credit_Card` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(4)`.
  - You are about to alter the column `point` on the `Kmutt_Point` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(8,2)`.
  - You are about to alter the column `pointsReceived` on the `Kmutt_Point_History` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(8,2)`.
  - You are about to alter the column `pointsSpent` on the `Kmutt_Point_History` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(8,2)`.
  - You are about to alter the column `text` on the `Post_Body` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(1000)`.
  - You are about to alter the column `comment` on the `Post_Comment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(100)`.
  - You are about to alter the column `reason` on the `Post_Report` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(1000)`.
  - You are about to alter the column `latitude` on the `Restaurant_Detail` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - You are about to alter the column `longitude` on the `Restaurant_Detail` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - You are about to alter the column `aveRating` on the `SReview_Shop` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(3,2)`.
  - You are about to alter the column `discount` on the `Shop_Coupon` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(9,2)`.
  - You are about to alter the column `minimumSpend` on the `Shop_Coupon` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(9,2)`.
  - You are about to alter the column `totalPrice` on the `Shop_Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(9,2)`.
  - You are about to alter the column `totalDeliveryFees` on the `Shop_Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(9,2)`.
  - You are about to alter the column `productPrice` on the `Shop_Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(9,2)`.
  - You are about to alter the column `deliveryFees` on the `Shop_Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(9,2)`.
  - You are about to alter the column `tagName` on the `Tag` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(25)`.
  - You are about to alter the column `percentage` on the `Task_Track` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(5,2)`.
  - You are about to alter the column `subTotalPrice` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(9,2)`.
  - You are about to alter the column `totalPrice` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(9,2)`.
  - You are about to alter the column `studentId` on the `User_Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(11)`.
  - Changed the type of `latitude` on the `SReview_Shop` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `longitude` on the `SReview_Shop` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Chat_Room" ALTER COLUMN "chatColor" SET DATA TYPE CHAR(7);

-- AlterTable
ALTER TABLE "Comment_Report" ALTER COLUMN "reason" SET DATA TYPE CHAR(1000);

-- AlterTable
ALTER TABLE "Credit_Card" ALTER COLUMN "last4" SET DATA TYPE CHAR(4),
ALTER COLUMN "cardExpired" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Kmutt_Point" ALTER COLUMN "point" SET DATA TYPE DECIMAL(8,2);

-- AlterTable
ALTER TABLE "Kmutt_Point_History" ALTER COLUMN "pointsReceived" SET DEFAULT 0,
ALTER COLUMN "pointsReceived" SET DATA TYPE DECIMAL(8,2),
ALTER COLUMN "pointsSpent" SET DEFAULT 0,
ALTER COLUMN "pointsSpent" SET DATA TYPE DECIMAL(8,2);

-- AlterTable
ALTER TABLE "Post_Body" ALTER COLUMN "text" SET DATA TYPE CHAR(1000);

-- AlterTable
ALTER TABLE "Post_Comment" ALTER COLUMN "comment" SET DATA TYPE CHAR(100);

-- AlterTable
ALTER TABLE "Post_Report" ALTER COLUMN "reason" SET DATA TYPE CHAR(1000);

-- AlterTable
ALTER TABLE "Restaurant_Detail" ALTER COLUMN "latitude" SET DATA TYPE REAL,
ALTER COLUMN "longitude" SET DATA TYPE REAL;

-- AlterTable
ALTER TABLE "SReview_Shop" DROP COLUMN "latitude",
ADD COLUMN     "latitude" REAL NOT NULL,
DROP COLUMN "longitude",
ADD COLUMN     "longitude" REAL NOT NULL,
ALTER COLUMN "aveRating" SET DATA TYPE DECIMAL(3,2);

-- AlterTable
ALTER TABLE "Shop_Coupon" ALTER COLUMN "discount" SET DATA TYPE DECIMAL(9,2),
ALTER COLUMN "minimumSpend" SET DATA TYPE DECIMAL(9,2);

-- AlterTable
ALTER TABLE "Shop_Order" ALTER COLUMN "totalPrice" SET DATA TYPE DECIMAL(9,2),
ALTER COLUMN "totalDeliveryFees" SET DATA TYPE DECIMAL(9,2);

-- AlterTable
ALTER TABLE "Shop_Product" ALTER COLUMN "productPrice" SET DATA TYPE DECIMAL(9,2),
ALTER COLUMN "deliveryFees" SET DATA TYPE DECIMAL(9,2);

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "tagName" SET DATA TYPE CHAR(25);

-- AlterTable
ALTER TABLE "Task_Track" ALTER COLUMN "percentage" SET DATA TYPE DECIMAL(5,2);

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "subTotalPrice" SET DATA TYPE DECIMAL(9,2),
ALTER COLUMN "totalPrice" SET DATA TYPE DECIMAL(9,2);

-- AlterTable
ALTER TABLE "User_Profile" ALTER COLUMN "studentId" SET DATA TYPE CHAR(11);
