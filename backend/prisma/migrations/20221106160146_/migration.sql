/*
  Warnings:

  - You are about to drop the column `id` on the `Detail` table. All the data in the column will be lost.
  - The primary key for the `Faculty` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `facultyId` column on the `Faculty` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Major` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `majorId` column on the `Major` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Block_Friend` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Friend` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Detail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Detail` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `facultyId` on the `Major` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Room_Type" AS ENUM ('INDIVIDUAL', 'GROUP');

-- CreateEnum
CREATE TYPE "Message_Type" AS ENUM ('TEXT', 'QUOTE', 'STICKER');

-- CreateEnum
CREATE TYPE "Vote_Type" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- CreateEnum
CREATE TYPE "Payment_Type" AS ENUM ('SHOP', 'MESSAGE');

-- CreateEnum
CREATE TYPE "ShortLink_Permission_Type" AS ENUM ('USER', 'MAJOR', 'FACULTY', 'YEAR');

-- DropForeignKey
ALTER TABLE "Block_Friend" DROP CONSTRAINT "Block_Friend_anotherUserId_fkey";

-- DropForeignKey
ALTER TABLE "Block_Friend" DROP CONSTRAINT "Block_Friend_userId_fkey";

-- DropForeignKey
ALTER TABLE "Detail" DROP CONSTRAINT "Detail_id_fkey";

-- DropForeignKey
ALTER TABLE "EXP" DROP CONSTRAINT "EXP_userId_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_anotherUserId_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_userId_fkey";

-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_anotherUserId_fkey";

-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_userId_fkey";

-- DropForeignKey
ALTER TABLE "Major" DROP CONSTRAINT "Major_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_anotherUserId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_userId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_userId_fkey";

-- DropForeignKey
ALTER TABLE "User_profile" DROP CONSTRAINT "User_profile_student_major_fkey";

-- DropIndex
DROP INDEX "Detail_id_key";

-- AlterTable
ALTER TABLE "Detail" DROP COLUMN "id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_pkey",
DROP COLUMN "facultyId",
ADD COLUMN     "facultyId" SERIAL NOT NULL,
ADD CONSTRAINT "Faculty_pkey" PRIMARY KEY ("facultyId");

-- AlterTable
ALTER TABLE "Major" DROP CONSTRAINT "Major_pkey",
DROP COLUMN "facultyId",
ADD COLUMN     "facultyId" INTEGER NOT NULL,
DROP COLUMN "majorId",
ADD COLUMN     "majorId" SERIAL NOT NULL,
ADD CONSTRAINT "Major_pkey" PRIMARY KEY ("majorId");

-- DropTable
DROP TABLE "Block_Friend";

-- DropTable
DROP TABLE "Friend";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "User_profile";

-- CreateTable
CREATE TABLE "User_Profile" (
    "userId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "fName" TEXT NOT NULL,
    "lName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" BYTEA,
    "student_major" INTEGER NOT NULL,

    CONSTRAINT "User_Profile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "User_Report" (
    "userId" TEXT NOT NULL,
    "anotherUserId" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_Report_pkey" PRIMARY KEY ("userId","anotherUserId")
);

-- CreateTable
CREATE TABLE "User_Blocked" (
    "userId" TEXT NOT NULL,
    "anotherUserId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "User_Blocked_pkey" PRIMARY KEY ("userId","anotherUserId")
);

-- CreateTable
CREATE TABLE "Student_Post" (
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lastEdit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL,
    "seen" BOOLEAN NOT NULL,

    CONSTRAINT "Student_Post_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "Following_Rating" (
    "userId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Following_Rating_pkey" PRIMARY KEY ("userId","followingId")
);

-- CreateTable
CREATE TABLE "Post_Body" (
    "bodyId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Post_Body_pkey" PRIMARY KEY ("bodyId")
);

-- CreateTable
CREATE TABLE "Image_Container" (
    "imgId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "imageAddress" TEXT NOT NULL,

    CONSTRAINT "Image_Container_pkey" PRIMARY KEY ("imgId")
);

-- CreateTable
CREATE TABLE "Video_Container" (
    "vidId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "vidAddress" TEXT NOT NULL,

    CONSTRAINT "Video_Container_pkey" PRIMARY KEY ("vidId")
);

-- CreateTable
CREATE TABLE "Student_Reacted" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "emoteId" TEXT NOT NULL,

    CONSTRAINT "Student_Reacted_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateTable
CREATE TABLE "Emote_Collection" (
    "emoteId" TEXT NOT NULL,

    CONSTRAINT "Emote_Collection_pkey" PRIMARY KEY ("emoteId")
);

-- CreateTable
CREATE TABLE "Post_Comment" (
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "cmTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_Comment_pkey" PRIMARY KEY ("commentId")
);

-- CreateTable
CREATE TABLE "Repost" (
    "newPostId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "newUserId" TEXT NOT NULL,
    "newPostTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Repost_pkey" PRIMARY KEY ("newPostId")
);

-- CreateTable
CREATE TABLE "Post_Report" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "Post_Report_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateTable
CREATE TABLE "Comment_Report" (
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "Comment_Report_pkey" PRIMARY KEY ("userId","commentId")
);

-- CreateTable
CREATE TABLE "Hide_Post" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Hide_Post_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateTable
CREATE TABLE "Hide_Comment" (
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "Hide_Comment_pkey" PRIMARY KEY ("userId","commentId")
);

-- CreateTable
CREATE TABLE "User_Noti_Object" (
    "notiObjectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "User_Noti_Object_pkey" PRIMARY KEY ("notiObjectId","userId")
);

-- CreateTable
CREATE TABLE "Noti_Object" (
    "notiObjectId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isRead" BOOLEAN NOT NULL,
    "moduleId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Noti_Object_pkey" PRIMARY KEY ("notiObjectId")
);

-- CreateTable
CREATE TABLE "Template" (
    "templateId" TEXT NOT NULL,
    "template" TEXT NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("templateId")
);

-- CreateTable
CREATE TABLE "Value" (
    "valueId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "notiObjectId" TEXT NOT NULL,

    CONSTRAINT "Value_pkey" PRIMARY KEY ("valueId")
);

-- CreateTable
CREATE TABLE "Module" (
    "moduleId" TEXT NOT NULL,
    "moduleName" TEXT NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("moduleId")
);

-- CreateTable
CREATE TABLE "Noti_Type" (
    "notiTypeId" TEXT NOT NULL,
    "notiType" TEXT NOT NULL DEFAULT 'All',
    "notiTypeName" TEXT NOT NULL,
    "notiTypeDesc" TEXT NOT NULL,

    CONSTRAINT "Noti_Type_pkey" PRIMARY KEY ("notiTypeId")
);

-- CreateTable
CREATE TABLE "Noti_Setting_Email" (
    "userId" TEXT NOT NULL,
    "notiTypeId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Noti_Setting_App" (
    "userId" TEXT NOT NULL,
    "notiTypeId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Timetable" (
    "tableId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "Timetable_pkey" PRIMARY KEY ("tableId")
);

-- CreateTable
CREATE TABLE "Event" (
    "eventId" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "stTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "eventTypeId" TEXT NOT NULL,
    "descId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "Event_Place" (
    "placeId" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "room" TEXT NOT NULL,

    CONSTRAINT "Event_Place_pkey" PRIMARY KEY ("placeId")
);

-- CreateTable
CREATE TABLE "Description" (
    "descId" TEXT NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "Description_pkey" PRIMARY KEY ("descId")
);

-- CreateTable
CREATE TABLE "Event_Type" (
    "eventTypeId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,

    CONSTRAINT "Event_Type_pkey" PRIMARY KEY ("eventTypeId")
);

-- CreateTable
CREATE TABLE "Course" (
    "courseId" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "lecturer" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("courseId")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "assignmentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL DEFAULT '0',
    "assignmentName" TEXT NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("assignmentId")
);

-- CreateTable
CREATE TABLE "Task" (
    "taskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "taskName" TEXT NOT NULL,
    "taskDesc" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due" TIMESTAMP(3) NOT NULL,
    "taskType" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("taskId")
);

-- CreateTable
CREATE TABLE "Task_Folder" (
    "folderId" TEXT NOT NULL,
    "folderName" TEXT NOT NULL,

    CONSTRAINT "Task_Folder_pkey" PRIMARY KEY ("folderId")
);

-- CreateTable
CREATE TABLE "Task_Group" (
    "groupId" TEXT NOT NULL,
    "groupName" TEXT NOT NULL,

    CONSTRAINT "Task_Group_pkey" PRIMARY KEY ("groupId")
);

-- CreateTable
CREATE TABLE "User_To_Group" (
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "User_To_Group_pkey" PRIMARY KEY ("userId","groupId")
);

-- CreateTable
CREATE TABLE "Task_Track" (
    "trackingId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Task_Track_pkey" PRIMARY KEY ("trackingId")
);

-- CreateTable
CREATE TABLE "Task_Check" (
    "taskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isCheck" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Task_Check_pkey" PRIMARY KEY ("taskId","userId")
);

-- CreateTable
CREATE TABLE "Task_History" (
    "taskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_History_pkey" PRIMARY KEY ("taskId","userId")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "languageId" INTEGER NOT NULL,
    "annTopic" TEXT NOT NULL,
    "annDetail" TEXT NOT NULL,
    "filterId" INTEGER NOT NULL,
    "annCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "annExpired" TIMESTAMP(3) NOT NULL,
    "isApprove" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "Announcement_Filter" (
    "filterId" SERIAL NOT NULL,
    "filterType" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Announcement_Filter_pkey" PRIMARY KEY ("filterId")
);

-- CreateTable
CREATE TABLE "Announcement_Language" (
    "languageId" SERIAL NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "Announcement_Language_pkey" PRIMARY KEY ("languageId")
);

-- CreateTable
CREATE TABLE "Post_To_Language" (
    "postId" TEXT NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "Post_To_Language_pkey" PRIMARY KEY ("postId","languageId")
);

-- CreateTable
CREATE TABLE "Announcement_Post" (
    "statusId" SERIAL NOT NULL,
    "postId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Waiting for Approve',

    CONSTRAINT "Announcement_Post_pkey" PRIMARY KEY ("statusId")
);

-- CreateTable
CREATE TABLE "Announcement_Delete" (
    "delId" SERIAL NOT NULL,
    "postId" TEXT NOT NULL,
    "deleteAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Announcement_Delete_pkey" PRIMARY KEY ("delId")
);

-- CreateTable
CREATE TABLE "Announcement_Pin" (
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Announcement_Pin_pkey" PRIMARY KEY ("postId","userId")
);

-- CreateTable
CREATE TABLE "Announcement_Seen" (
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Announcement_Seen_pkey" PRIMARY KEY ("postId","userId")
);

-- CreateTable
CREATE TABLE "Announcement_Approve" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "approveTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Announcement_Approve_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateTable
CREATE TABLE "Chat_User" (
    "cUserId" TEXT NOT NULL,
    "username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Chat_Room" (
    "roomId" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,
    "chatColor" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" TIMESTAMP(3) NOT NULL,
    "roomType" "Room_Type" NOT NULL,
    "user_ProfileUserId" TEXT,

    CONSTRAINT "Chat_Room_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "User_To_Room" (
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,

    CONSTRAINT "User_To_Room_pkey" PRIMARY KEY ("userId","roomId")
);

-- CreateTable
CREATE TABLE "Chat_Group" (
    "roomId" TEXT NOT NULL,
    "joined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lefted" TIMESTAMP(3) NOT NULL,
    "groupImg" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Message" (
    "messageId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "messageType" "Message_Type" NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "Chat_Quote" (
    "quoteId" SERIAL NOT NULL,
    "roomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,

    CONSTRAINT "Chat_Quote_pkey" PRIMARY KEY ("quoteId")
);

-- CreateTable
CREATE TABLE "Chat_Sticker" (
    "stickerId" SERIAL NOT NULL,
    "stickerName" TEXT NOT NULL,
    "stickerLink" TEXT NOT NULL,

    CONSTRAINT "Chat_Sticker_pkey" PRIMARY KEY ("stickerId")
);

-- CreateTable
CREATE TABLE "Chat_Restaurant" (
    "rKey" SERIAL NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "restaurantName" TEXT NOT NULL,

    CONSTRAINT "Chat_Restaurant_pkey" PRIMARY KEY ("rKey")
);

-- CreateTable
CREATE TABLE "Chat_Transaction" (
    "tKey" SERIAL NOT NULL,
    "transId" TEXT NOT NULL,
    "payerId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "qrGen" TEXT NOT NULL,

    CONSTRAINT "Chat_Transaction_pkey" PRIMARY KEY ("tKey")
);

-- CreateTable
CREATE TABLE "Dating_Options" (
    "userId" TEXT NOT NULL,
    "ageMin" INTEGER NOT NULL,
    "ageMax" INTEGER NOT NULL,
    "genderPref" TEXT NOT NULL,
    "useAge" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Faculty_Pref" (
    "userId" TEXT NOT NULL,
    "facultyPref" TEXT NOT NULL,

    CONSTRAINT "Faculty_Pref_pkey" PRIMARY KEY ("userId","facultyPref")
);

-- CreateTable
CREATE TABLE "Card_Queue" (
    "userId" TEXT NOT NULL,
    "frontUserId" TEXT NOT NULL,
    "backUserId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User_Rating" (
    "userId" TEXT NOT NULL,
    "anotherUserId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "User_Rating_pkey" PRIMARY KEY ("userId","anotherUserId")
);

-- CreateTable
CREATE TABLE "Heart_History" (
    "userId" TEXT NOT NULL,
    "anotherUserId" TEXT NOT NULL,
    "heartedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSkipped" BOOLEAN NOT NULL,

    CONSTRAINT "Heart_History_pkey" PRIMARY KEY ("userId","anotherUserId")
);

-- CreateTable
CREATE TABLE "Interest" (
    "interestId" SERIAL NOT NULL,
    "interestName" TEXT NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("interestId")
);

-- CreateTable
CREATE TABLE "User_Interest" (
    "userId" TEXT NOT NULL,
    "interestId" INTEGER NOT NULL,

    CONSTRAINT "User_Interest_pkey" PRIMARY KEY ("userId","interestId")
);

-- CreateTable
CREATE TABLE "Dating_Enroll" (
    "userId" TEXT NOT NULL,
    "hasCompleteTutorial" BOOLEAN NOT NULL,
    "hasCompleteSetting" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Activity_Poll" (
    "pollId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pollName" TEXT NOT NULL,
    "pollPlace" TEXT NOT NULL,
    "pollAppointAt" TIMESTAMP(3) NOT NULL,
    "pollText" TEXT NOT NULL,
    "participantMin" INTEGER NOT NULL,
    "participantMax" INTEGER NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "pollcreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_Poll_pkey" PRIMARY KEY ("pollId")
);

-- CreateTable
CREATE TABLE "Poll_Applicant" (
    "userId" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,
    "isAccepted" BOOLEAN NOT NULL,
    "registerTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poll_Applicant_pkey" PRIMARY KEY ("userId","pollId")
);

-- CreateTable
CREATE TABLE "Poll_Interest" (
    "pollId" TEXT NOT NULL,
    "activityInterestId" INTEGER NOT NULL,

    CONSTRAINT "Poll_Interest_pkey" PRIMARY KEY ("pollId","activityInterestId")
);

-- CreateTable
CREATE TABLE "Community" (
    "communityId" TEXT NOT NULL,
    "communityName" TEXT NOT NULL,
    "communityOwnerId" TEXT NOT NULL,
    "communityDesc" TEXT NOT NULL,
    "communityPrivacy" BOOLEAN NOT NULL,
    "communityPhoto" BYTEA,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("communityId")
);

-- CreateTable
CREATE TABLE "Community_User" (
    "userId" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "joined" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Community_User_pkey" PRIMARY KEY ("userId","communityId")
);

-- CreateTable
CREATE TABLE "Community_Blacklist" (
    "userId" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "since" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Community_Blacklist_pkey" PRIMARY KEY ("userId","communityId")
);

-- CreateTable
CREATE TABLE "Community_Role" (
    "userId" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "Community_Role_pkey" PRIMARY KEY ("userId","communityId")
);

-- CreateTable
CREATE TABLE "Community_Tag" (
    "communityId" TEXT NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "Community_Tag_pkey" PRIMARY KEY ("communityId","tagId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "tagId" SERIAL NOT NULL,
    "tagName" TEXT NOT NULL,
    "tagDesc" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("tagId")
);

-- CreateTable
CREATE TABLE "Community_Post" (
    "postId" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "isPinned" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Community_File" (
    "fileId" TEXT NOT NULL,
    "communityId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "File_Info" (
    "fileId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileSender" TEXT NOT NULL,
    "sendType" TEXT NOT NULL,
    "fileDesc" TEXT NOT NULL,
    "fileExpired" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_Info_pkey" PRIMARY KEY ("fileId")
);

-- CreateTable
CREATE TABLE "User_Show_File" (
    "userId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,

    CONSTRAINT "User_Show_File_pkey" PRIMARY KEY ("userId","fileId")
);

-- CreateTable
CREATE TABLE "File_Comment" (
    "commentId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "commentText" TEXT NOT NULL,
    "commentedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_Comment_pkey" PRIMARY KEY ("commentId")
);

-- CreateTable
CREATE TABLE "Folder" (
    "folderId" TEXT NOT NULL,
    "folderName" TEXT NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("folderId")
);

-- CreateTable
CREATE TABLE "Sub_Folder" (
    "sFolderId" TEXT NOT NULL,
    "sFolderName" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,

    CONSTRAINT "Sub_Folder_pkey" PRIMARY KEY ("sFolderId")
);

-- CreateTable
CREATE TABLE "File_In_Folder" (
    "fileId" TEXT NOT NULL,
    "sFolderId" TEXT NOT NULL,

    CONSTRAINT "File_In_Folder_pkey" PRIMARY KEY ("fileId","sFolderId")
);

-- CreateTable
CREATE TABLE "File_Access" (
    "accessId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "accessType" TEXT NOT NULL,

    CONSTRAINT "File_Access_pkey" PRIMARY KEY ("accessId")
);

-- CreateTable
CREATE TABLE "Everyone_Access" (
    "eaId" TEXT NOT NULL,
    "accessId" TEXT NOT NULL,

    CONSTRAINT "Everyone_Access_pkey" PRIMARY KEY ("eaId")
);

-- CreateTable
CREATE TABLE "Community_Access" (
    "caId" TEXT NOT NULL,
    "accessId" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,

    CONSTRAINT "Community_Access_pkey" PRIMARY KEY ("caId")
);

-- CreateTable
CREATE TABLE "Major_Access" (
    "maId" TEXT NOT NULL,
    "accessId" TEXT NOT NULL,
    "majorId" INTEGER NOT NULL,

    CONSTRAINT "Major_Access_pkey" PRIMARY KEY ("maId")
);

-- CreateTable
CREATE TABLE "Direct_Access" (
    "daId" TEXT NOT NULL,
    "accessId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Direct_Access_pkey" PRIMARY KEY ("daId")
);

-- CreateTable
CREATE TABLE "User_Back" (
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "User_Back_pkey" PRIMARY KEY ("userId","token")
);

-- CreateTable
CREATE TABLE "Login_Info" (
    "loginId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "Login_Info_pkey" PRIMARY KEY ("loginId")
);

-- CreateTable
CREATE TABLE "Login_Detail" (
    "loginId" TEXT NOT NULL,
    "loginDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tokenExpired" TIMESTAMP(3) NOT NULL,
    "deviceInfo" TEXT NOT NULL,
    "ip" TEXT NOT NULL,

    CONSTRAINT "Login_Detail_pkey" PRIMARY KEY ("loginId")
);

-- CreateTable
CREATE TABLE "Logout_Info" (
    "logoutId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "Logout_Info_pkey" PRIMARY KEY ("logoutId")
);

-- CreateTable
CREATE TABLE "Logout_Detail" (
    "logoutId" TEXT NOT NULL,
    "logoutDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceInfo" TEXT NOT NULL,
    "ip" TEXT NOT NULL,

    CONSTRAINT "Logout_Detail_pkey" PRIMARY KEY ("logoutId")
);

-- CreateTable
CREATE TABLE "Ban_Status" (
    "banId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "instance" INTEGER NOT NULL,
    "banFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "banTo" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ban_Status_pkey" PRIMARY KEY ("banId")
);

-- CreateTable
CREATE TABLE "wordReport" (
    "wordReportId" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "wordReport_pkey" PRIMARY KEY ("wordReportId")
);

-- CreateTable
CREATE TABLE "wordReportDetail" (
    "wordReportDetailId" INTEGER NOT NULL,
    "roomId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "reportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wordReportDetail_pkey" PRIMARY KEY ("wordReportDetailId")
);

-- CreateTable
CREATE TABLE "Filtered_Word" (
    "wordReportId" INTEGER NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "Filtered_Word_pkey" PRIMARY KEY ("wordReportId")
);

-- CreateTable
CREATE TABLE "Sn_Head" (
    "snId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "snName" TEXT NOT NULL,
    "snDesc" TEXT NOT NULL,
    "snLink" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Sn_Head_pkey" PRIMARY KEY ("snId")
);

-- CreateTable
CREATE TABLE "Sn_Votedetail" (
    "voteId" SERIAL NOT NULL,
    "snId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "voteType" "Vote_Type" NOT NULL,

    CONSTRAINT "Sn_Votedetail_pkey" PRIMARY KEY ("voteId")
);

-- CreateTable
CREATE TABLE "Sn_Comment" (
    "commentId" TEXT NOT NULL,
    "snId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "commentedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sn_Comment_pkey" PRIMARY KEY ("commentId")
);

-- CreateTable
CREATE TABLE "Sn_Fav" (
    "favId" SERIAL NOT NULL,
    "snId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Sn_Fav_pkey" PRIMARY KEY ("favId")
);

-- CreateTable
CREATE TABLE "Sn_Recent" (
    "recentId" SERIAL NOT NULL,
    "snId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sn_Recent_pkey" PRIMARY KEY ("recentId")
);

-- CreateTable
CREATE TABLE "Sn_Access" (
    "accessId" SERIAL NOT NULL,
    "snId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Sn_Access_pkey" PRIMARY KEY ("accessId")
);

-- CreateTable
CREATE TABLE "Sn_Library" (
    "libId" SERIAL NOT NULL,
    "libName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Sn_Library_pkey" PRIMARY KEY ("libId")
);

-- CreateTable
CREATE TABLE "Sn_In_Library" (
    "inLibId" SERIAL NOT NULL,
    "libId" INTEGER NOT NULL,
    "snId" TEXT NOT NULL,

    CONSTRAINT "Sn_In_Library_pkey" PRIMARY KEY ("inLibId")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "payMethodId" INTEGER NOT NULL,
    "subTotalPrice" DOUBLE PRECISION NOT NULL,
    "pointUse" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "payTypeId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transId")
);

-- CreateTable
CREATE TABLE "Transaction_Detail" (
    "transId" TEXT NOT NULL,
    "transDesc" TEXT NOT NULL,
    "transCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transStatus" TEXT NOT NULL,
    "isShip" BOOLEAN NOT NULL,
    "errKey" SERIAL NOT NULL,
    "errId" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Transaction_Detail_pkey" PRIMARY KEY ("transId")
);

-- CreateTable
CREATE TABLE "Transaction_Error" (
    "errKey" SERIAL NOT NULL,
    "errId" INTEGER NOT NULL,
    "errDesc" TEXT NOT NULL,

    CONSTRAINT "Transaction_Error_pkey" PRIMARY KEY ("errKey")
);

-- CreateTable
CREATE TABLE "Transaction_Paymethod" (
    "payMethodId" INTEGER NOT NULL,
    "tokenId" TEXT NOT NULL,

    CONSTRAINT "Transaction_Paymethod_pkey" PRIMARY KEY ("payMethodId")
);

-- CreateTable
CREATE TABLE "Credit_Card" (
    "tokenId" TEXT NOT NULL,
    "ccId" TEXT NOT NULL,
    "holderName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "cvc" TEXT NOT NULL,
    "last4" TEXT NOT NULL,
    "cardExpired" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Credit_Card_pkey" PRIMARY KEY ("tokenId")
);

-- CreateTable
CREATE TABLE "E_Banking" (
    "tokenId" TEXT NOT NULL,
    "bkId" TEXT NOT NULL,
    "holderName" TEXT NOT NULL,
    "holderType" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "E_Banking_pkey" PRIMARY KEY ("tokenId")
);

-- CreateTable
CREATE TABLE "QR" (
    "tokenId" TEXT NOT NULL,
    "qrSourceId" TEXT NOT NULL,
    "qr" TEXT NOT NULL,
    "expired" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QR_pkey" PRIMARY KEY ("tokenId")
);

-- CreateTable
CREATE TABLE "Transaction_Paytype" (
    "transId" TEXT NOT NULL,
    "payTypeId" INTEGER NOT NULL,
    "typeOfTrans" "Payment_Type" NOT NULL,

    CONSTRAINT "Transaction_Paytype_pkey" PRIMARY KEY ("transId")
);

-- CreateTable
CREATE TABLE "Kmutt_Point" (
    "kpId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Kmutt_Point_pkey" PRIMARY KEY ("kpId")
);

-- CreateTable
CREATE TABLE "Kmutt_Point_History" (
    "transId" TEXT NOT NULL,
    "kpId" TEXT NOT NULL,
    "pointsReceived" INTEGER NOT NULL DEFAULT 0,
    "pointsSpent" INTEGER NOT NULL DEFAULT 0,
    "pointTransactionAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kmutt_Point_History_pkey" PRIMARY KEY ("transId")
);

-- CreateTable
CREATE TABLE "Shop_Order" (
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "transId" TEXT NOT NULL,
    "couponCode" TEXT NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "totalDeliveryFees" DOUBLE PRECISION NOT NULL,
    "shipping" TEXT NOT NULL,
    "orderPlaced" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderStatus" TEXT NOT NULL,

    CONSTRAINT "Shop_Order_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "Shop_Coupon" (
    "couponCode" TEXT NOT NULL,
    "couponDesc" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validTill" TIMESTAMP(3) NOT NULL,
    "minimumSpend" DOUBLE PRECISION NOT NULL,
    "productId" INTEGER NOT NULL,
    "quota" INTEGER NOT NULL,

    CONSTRAINT "Shop_Coupon_pkey" PRIMARY KEY ("couponCode")
);

-- CreateTable
CREATE TABLE "User_Coupon" (
    "userId" TEXT NOT NULL,
    "couponCode" TEXT NOT NULL,

    CONSTRAINT "User_Coupon_pkey" PRIMARY KEY ("userId","couponCode")
);

-- CreateTable
CREATE TABLE "Shop_Product" (
    "productId" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "contactId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "productDesc" TEXT NOT NULL,
    "productColor" TEXT NOT NULL,
    "productSize" TEXT NOT NULL,
    "productPrice" DOUBLE PRECISION NOT NULL,
    "productStock" INTEGER NOT NULL,
    "brandName" TEXT NOT NULL,
    "deliveryFees" DOUBLE PRECISION NOT NULL,
    "views" BIGINT NOT NULL,

    CONSTRAINT "Shop_Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Shop_Categories" (
    "categoryId" INTEGER NOT NULL,
    "categoryName" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Shop_Categories_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "Shop_Contact" (
    "contactId" INTEGER NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lineId" TEXT NOT NULL,

    CONSTRAINT "Shop_Contact_pkey" PRIMARY KEY ("contactId")
);

-- CreateTable
CREATE TABLE "Shop_Product_Images" (
    "piId" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Shop_Product_Images_pkey" PRIMARY KEY ("piId")
);

-- CreateTable
CREATE TABLE "Shop_Order_Product" (
    "orderId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Shop_Order_Product_pkey" PRIMARY KEY ("orderId","productId")
);

-- CreateTable
CREATE TABLE "Shop_Cart" (
    "userId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Shop_Cart_pkey" PRIMARY KEY ("userId","productId")
);

-- CreateTable
CREATE TABLE "Shop_Product_Review" (
    "reviewId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "reviewName" TEXT NOT NULL,
    "reviewDesc" TEXT NOT NULL,
    "reviewRating" INTEGER NOT NULL,
    "reviewAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT NOT NULL,

    CONSTRAINT "Shop_Product_Review_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "resId" TEXT NOT NULL,
    "resName" TEXT NOT NULL,
    "lastupdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL,
    "isSeen" BOOLEAN NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("resId")
);

-- CreateTable
CREATE TABLE "Restaurant_Detail" (
    "resId" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "vicinity" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Restaurant_Detail_pkey" PRIMARY KEY ("resId")
);

-- CreateTable
CREATE TABLE "Restaurant_Image" (
    "imageId" SERIAL NOT NULL,
    "resId" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Restaurant_Image_pkey" PRIMARY KEY ("imageId")
);

-- CreateTable
CREATE TABLE "Restaurant_Open" (
    "openId" SERIAL NOT NULL,
    "resId" TEXT NOT NULL,
    "open" TIMESTAMP(3) NOT NULL,
    "day" INTEGER NOT NULL,

    CONSTRAINT "Restaurant_Open_pkey" PRIMARY KEY ("openId")
);

-- CreateTable
CREATE TABLE "Restaurant_Close" (
    "closeId" SERIAL NOT NULL,
    "resId" TEXT NOT NULL,
    "close" TIMESTAMP(3) NOT NULL,
    "day" INTEGER NOT NULL,

    CONSTRAINT "Restaurant_Close_pkey" PRIMARY KEY ("closeId")
);

-- CreateTable
CREATE TABLE "Restaurant_Like_By_User" (
    "userId" TEXT NOT NULL,
    "resId" TEXT NOT NULL,

    CONSTRAINT "Restaurant_Like_By_User_pkey" PRIMARY KEY ("userId","resId")
);

-- CreateTable
CREATE TABLE "Restaurant_Favorite_By_User" (
    "userId" TEXT NOT NULL,
    "resId" TEXT NOT NULL,

    CONSTRAINT "Restaurant_Favorite_By_User_pkey" PRIMARY KEY ("userId","resId")
);

-- CreateTable
CREATE TABLE "Restaurant_Seen_By_User" (
    "userId" TEXT NOT NULL,
    "resId" TEXT NOT NULL,
    "seenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Restaurant_Seen_By_User_pkey" PRIMARY KEY ("userId","resId")
);

-- CreateTable
CREATE TABLE "SReview_Shop" (
    "shopId" TEXT NOT NULL,
    "shopName" TEXT NOT NULL,
    "shopType" TEXT NOT NULL,
    "open" TEXT NOT NULL,
    "close" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "aveRating" DOUBLE PRECISION NOT NULL,
    "reviewReceived" INTEGER NOT NULL,

    CONSTRAINT "SReview_Shop_pkey" PRIMARY KEY ("shopId")
);

-- CreateTable
CREATE TABLE "SReview_Shop_Image" (
    "imageId" SERIAL NOT NULL,
    "shopId" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "SReview_Shop_Image_pkey" PRIMARY KEY ("imageId")
);

-- CreateTable
CREATE TABLE "SReview_Review" (
    "reviewId" TEXT NOT NULL,

    CONSTRAINT "SReview_Review_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "SReview_Shop_Review" (
    "reviewId" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reviewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "likeReceived" INTEGER NOT NULL,

    CONSTRAINT "SReview_Shop_Review_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "SReview_Restaurant_Review" (
    "reviewId" TEXT NOT NULL,
    "resId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reviewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "likeReceived" INTEGER NOT NULL,

    CONSTRAINT "SReview_Restaurant_Review_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "SReview_Review_Image" (
    "imageId" SERIAL NOT NULL,
    "reviewId" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "SReview_Review_Image_pkey" PRIMARY KEY ("imageId")
);

-- CreateTable
CREATE TABLE "SReview_Comment" (
    "commentId" SERIAL NOT NULL,
    "reviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "commentedAt" TIMESTAMP(3) NOT NULL,
    "likeReceived" INTEGER NOT NULL,

    CONSTRAINT "SReview_Comment_pkey" PRIMARY KEY ("commentId")
);

-- CreateTable
CREATE TABLE "SReview_Shop_Review_Like" (
    "reviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SReview_Shop_Review_Like_pkey" PRIMARY KEY ("reviewId","userId")
);

-- CreateTable
CREATE TABLE "SReview_Restaurant_Review_Like" (
    "reviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SReview_Restaurant_Review_Like_pkey" PRIMARY KEY ("reviewId","userId")
);

-- CreateTable
CREATE TABLE "SReview_Comment_Like" (
    "commentId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SReview_Comment_Like_pkey" PRIMARY KEY ("commentId","userId")
);

-- CreateTable
CREATE TABLE "SReview_Suggestion" (
    "suggestId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "suggestion" TEXT NOT NULL,

    CONSTRAINT "SReview_Suggestion_pkey" PRIMARY KEY ("suggestId")
);

-- CreateTable
CREATE TABLE "Question" (
    "qId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "qTitle" TEXT NOT NULL,
    "qDesc" TEXT NOT NULL,
    "voteCount" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("qId")
);

-- CreateTable
CREATE TABLE "Question_Setting" (
    "userId" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL,

    CONSTRAINT "Question_Setting_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Question_Tag" (
    "tagKey" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "qId" TEXT NOT NULL,

    CONSTRAINT "Question_Tag_pkey" PRIMARY KEY ("tagKey")
);

-- CreateTable
CREATE TABLE "Question_Default_Tag" (
    "tagKey" SERIAL NOT NULL,
    "tagId" INTEGER NOT NULL,
    "tagName" TEXT NOT NULL,

    CONSTRAINT "Question_Default_Tag_pkey" PRIMARY KEY ("tagKey")
);

-- CreateTable
CREATE TABLE "Question_Embed_File" (
    "qId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Question_Embed_File_pkey" PRIMARY KEY ("qId")
);

-- CreateTable
CREATE TABLE "Question_Comment" (
    "commentId" SERIAL NOT NULL,
    "qId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Question_Comment_pkey" PRIMARY KEY ("commentId")
);

-- CreateTable
CREATE TABLE "Question_Answer" (
    "answerId" TEXT NOT NULL,
    "qId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "qTitle" TEXT NOT NULL,
    "qDesc" TEXT NOT NULL,
    "voteCount" INTEGER NOT NULL,

    CONSTRAINT "Question_Answer_pkey" PRIMARY KEY ("answerId")
);

-- CreateTable
CREATE TABLE "Question_Answer_Embed_File" (
    "answerId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Question_Answer_Embed_File_pkey" PRIMARY KEY ("answerId")
);

-- CreateTable
CREATE TABLE "Question_Answer_Comment" (
    "commentId" SERIAL NOT NULL,
    "answerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Question_Answer_Comment_pkey" PRIMARY KEY ("commentId")
);

-- CreateTable
CREATE TABLE "Question_Modvote" (
    "voteId" SERIAL NOT NULL,
    "qId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isUp" BOOLEAN NOT NULL DEFAULT false,
    "isDown" BOOLEAN NOT NULL DEFAULT false,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_Modvote_pkey" PRIMARY KEY ("voteId")
);

-- CreateTable
CREATE TABLE "ShortLink_Quota" (
    "userId" TEXT NOT NULL,
    "remaining" INTEGER NOT NULL,

    CONSTRAINT "ShortLink_Quota_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ShortLink" (
    "slId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "originalLink" TEXT NOT NULL,
    "shortenLink" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',
    "expired" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShortLink_pkey" PRIMARY KEY ("slId")
);

-- CreateTable
CREATE TABLE "ShortLink_Permission" (
    "slId" TEXT NOT NULL,
    "permType" "ShortLink_Permission_Type" NOT NULL,

    CONSTRAINT "ShortLink_Permission_pkey" PRIMARY KEY ("slId")
);

-- CreateTable
CREATE TABLE "ShortLink_Permission_User" (
    "permId" SERIAL NOT NULL,
    "slId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ShortLink_Permission_User_pkey" PRIMARY KEY ("permId")
);

-- CreateTable
CREATE TABLE "ShortLink_Permission_Major" (
    "permId" SERIAL NOT NULL,
    "slId" TEXT NOT NULL,
    "majorId" INTEGER NOT NULL,

    CONSTRAINT "ShortLink_Permission_Major_pkey" PRIMARY KEY ("permId")
);

-- CreateTable
CREATE TABLE "ShortLink_Permission_Faculty" (
    "permId" SERIAL NOT NULL,
    "slId" TEXT NOT NULL,
    "facultyId" INTEGER NOT NULL,

    CONSTRAINT "ShortLink_Permission_Faculty_pkey" PRIMARY KEY ("permId")
);

-- CreateTable
CREATE TABLE "ShortLink_Delete_Link" (
    "slId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShortLink_Delete_Link_pkey" PRIMARY KEY ("slId")
);

-- CreateTable
CREATE TABLE "Analytic_User_Access" (
    "userId" TEXT NOT NULL,
    "isGenUserReport" BOOLEAN NOT NULL,
    "isGenOverallReport" BOOLEAN NOT NULL,
    "isGenModuleReport" BOOLEAN NOT NULL,
    "isViewModuleReport" BOOLEAN NOT NULL,

    CONSTRAINT "Analytic_User_Access_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Analytic_Report" (
    "reportId" SERIAL NOT NULL,

    CONSTRAINT "Analytic_Report_pkey" PRIMARY KEY ("reportId")
);

-- CreateTable
CREATE TABLE "Analytic_Report_Module" (
    "reportId" SERIAL NOT NULL,
    "moduleName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reportTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unAuthorizedView" INTEGER NOT NULL,
    "authorizedView" INTEGER NOT NULL,
    "periodHours" INTEGER NOT NULL,
    "totalRequest" INTEGER NOT NULL,
    "userActive" INTEGER NOT NULL,
    "mostCountry" TEXT NOT NULL,

    CONSTRAINT "Analytic_Report_Module_pkey" PRIMARY KEY ("reportId")
);

-- CreateTable
CREATE TABLE "Analytic_View" (
    "viewId" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "externalPlatform" TEXT NOT NULL,

    CONSTRAINT "Analytic_View_pkey" PRIMARY KEY ("viewId")
);

-- CreateTable
CREATE TABLE "Analytic_External_Platform" (
    "devId" INTEGER NOT NULL,
    "epName" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Analytic_External_Platform_pkey" PRIMARY KEY ("devId")
);

-- CreateTable
CREATE TABLE "Analytic_User_Report" (
    "reportId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reportedAt" TIMESTAMP(3) NOT NULL,
    "timeActive" INTEGER NOT NULL,
    "usedTimePerDay" INTEGER NOT NULL,
    "totalRequest" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Analytic_User_Report_pkey" PRIMARY KEY ("reportId")
);

-- CreateTable
CREATE TABLE "Analytic_View_In_User_Report" (
    "reportId" TEXT NOT NULL,
    "viewId" TEXT NOT NULL,

    CONSTRAINT "Analytic_View_In_User_Report_pkey" PRIMARY KEY ("reportId","viewId")
);

-- CreateTable
CREATE TABLE "Analytic_Request" (
    "reqId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "body" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "deviceName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Analytic_Request_pkey" PRIMARY KEY ("reqId")
);

-- CreateTable
CREATE TABLE "Analytic_Device" (
    "devId" SERIAL NOT NULL,
    "reqId" TEXT NOT NULL,
    "devName" TEXT NOT NULL,
    "devOS" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Analytic_Device_pkey" PRIMARY KEY ("devId")
);

-- CreateTable
CREATE TABLE "Analytic_Request_In_User_Report" (
    "reqId" TEXT NOT NULL,
    "viewId" TEXT NOT NULL,

    CONSTRAINT "Analytic_Request_In_User_Report_pkey" PRIMARY KEY ("reqId","viewId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Profile_studentId_key" ON "User_Profile"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "User_Profile_email_key" ON "User_Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Post_Body_postId_key" ON "Post_Body"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Noti_Setting_Email_userId_key" ON "Noti_Setting_Email"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Noti_Setting_Email_notiTypeId_key" ON "Noti_Setting_Email"("notiTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "Noti_Setting_App_userId_key" ON "Noti_Setting_App"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Noti_Setting_App_notiTypeId_key" ON "Noti_Setting_App"("notiTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_descId_key" ON "Event"("descId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_Track_userId_key" ON "Task_Track"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_Check_taskId_key" ON "Task_Check"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_History_userId_key" ON "Task_History"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Announcement_Post_postId_key" ON "Announcement_Post"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Announcement_Approve_postId_key" ON "Announcement_Approve"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_User_cUserId_key" ON "Chat_User"("cUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_Group_roomId_key" ON "Chat_Group"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_Transaction_transId_key" ON "Chat_Transaction"("transId");

-- CreateIndex
CREATE UNIQUE INDEX "Dating_Options_userId_key" ON "Dating_Options"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Card_Queue_userId_key" ON "Card_Queue"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Dating_Enroll_userId_key" ON "Dating_Enroll"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Community_Post_postId_key" ON "Community_Post"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Community_File_fileId_key" ON "Community_File"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "Sn_Votedetail_snId_userId_key" ON "Sn_Votedetail"("snId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Sn_Library_libName_userId_key" ON "Sn_Library"("libName", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_Detail_errKey_key" ON "Transaction_Detail"("errKey");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_Error_errId_key" ON "Transaction_Error"("errId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_Paymethod_tokenId_key" ON "Transaction_Paymethod"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "Kmutt_Point_userId_key" ON "Kmutt_Point"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_Order_transId_key" ON "Shop_Order"("transId");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_Order_couponCode_key" ON "Shop_Order"("couponCode");

-- CreateIndex
CREATE UNIQUE INDEX "User_Coupon_couponCode_key" ON "User_Coupon"("couponCode");

-- CreateIndex
CREATE UNIQUE INDEX "Detail_userId_key" ON "Detail"("userId");

-- AddForeignKey
ALTER TABLE "User_Profile" ADD CONSTRAINT "User_Profile_student_major_fkey" FOREIGN KEY ("student_major") REFERENCES "Major"("majorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Major" ADD CONSTRAINT "Major_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("facultyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_anotherUserId_fkey" FOREIGN KEY ("anotherUserId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Report" ADD CONSTRAINT "User_Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Report" ADD CONSTRAINT "User_Report_anotherUserId_fkey" FOREIGN KEY ("anotherUserId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Blocked" ADD CONSTRAINT "User_Blocked_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Blocked" ADD CONSTRAINT "User_Blocked_anotherUserId_fkey" FOREIGN KEY ("anotherUserId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EXP" ADD CONSTRAINT "EXP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student_Post" ADD CONSTRAINT "Student_Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following_Rating" ADD CONSTRAINT "Following_Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Body" ADD CONSTRAINT "Post_Body_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Student_Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image_Container" ADD CONSTRAINT "Image_Container_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Student_Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video_Container" ADD CONSTRAINT "Video_Container_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Student_Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student_Reacted" ADD CONSTRAINT "Student_Reacted_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student_Reacted" ADD CONSTRAINT "Student_Reacted_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Student_Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student_Reacted" ADD CONSTRAINT "Student_Reacted_emoteId_fkey" FOREIGN KEY ("emoteId") REFERENCES "Emote_Collection"("emoteId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Comment" ADD CONSTRAINT "Post_Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Comment" ADD CONSTRAINT "Post_Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Student_Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repost" ADD CONSTRAINT "Repost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Student_Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Report" ADD CONSTRAINT "Post_Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Report" ADD CONSTRAINT "Post_Report_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Student_Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_Report" ADD CONSTRAINT "Comment_Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_Report" ADD CONSTRAINT "Comment_Report_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Post_Comment"("commentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hide_Post" ADD CONSTRAINT "Hide_Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hide_Post" ADD CONSTRAINT "Hide_Post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Student_Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hide_Comment" ADD CONSTRAINT "Hide_Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hide_Comment" ADD CONSTRAINT "Hide_Comment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Post_Comment"("commentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Noti_Object" ADD CONSTRAINT "User_Noti_Object_notiObjectId_fkey" FOREIGN KEY ("notiObjectId") REFERENCES "Noti_Object"("notiObjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Noti_Object" ADD CONSTRAINT "User_Noti_Object_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noti_Object" ADD CONSTRAINT "Noti_Object_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("templateId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noti_Object" ADD CONSTRAINT "Noti_Object_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("moduleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Value" ADD CONSTRAINT "Value_notiObjectId_fkey" FOREIGN KEY ("notiObjectId") REFERENCES "Noti_Object"("notiObjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noti_Setting_Email" ADD CONSTRAINT "Noti_Setting_Email_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noti_Setting_Email" ADD CONSTRAINT "Noti_Setting_Email_notiTypeId_fkey" FOREIGN KEY ("notiTypeId") REFERENCES "Noti_Type"("notiTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noti_Setting_App" ADD CONSTRAINT "Noti_Setting_App_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noti_Setting_App" ADD CONSTRAINT "Noti_Setting_App_notiTypeId_fkey" FOREIGN KEY ("notiTypeId") REFERENCES "Noti_Type"("notiTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Event_Place"("placeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Description" ADD CONSTRAINT "Description_descId_fkey" FOREIGN KEY ("descId") REFERENCES "Event"("descId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Task_Folder"("folderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Task_Group"("groupId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_To_Group" ADD CONSTRAINT "User_To_Group_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_To_Group" ADD CONSTRAINT "User_To_Group_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Task_Group"("groupId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_Track" ADD CONSTRAINT "Task_Track_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_Check" ADD CONSTRAINT "Task_Check_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("taskId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_Check" ADD CONSTRAINT "Task_Check_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_History" ADD CONSTRAINT "Task_History_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("taskId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_History" ADD CONSTRAINT "Task_History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_To_Language" ADD CONSTRAINT "Post_To_Language_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Announcement"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_To_Language" ADD CONSTRAINT "Post_To_Language_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Announcement_Language"("languageId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement_Post" ADD CONSTRAINT "Announcement_Post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Announcement"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement_Pin" ADD CONSTRAINT "Announcement_Pin_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Announcement"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement_Pin" ADD CONSTRAINT "Announcement_Pin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement_Seen" ADD CONSTRAINT "Announcement_Seen_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Announcement"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement_Seen" ADD CONSTRAINT "Announcement_Seen_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement_Approve" ADD CONSTRAINT "Announcement_Approve_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement_Approve" ADD CONSTRAINT "Announcement_Approve_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Announcement"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_User" ADD CONSTRAINT "Chat_User_cUserId_fkey" FOREIGN KEY ("cUserId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Room" ADD CONSTRAINT "Chat_Room_user_ProfileUserId_fkey" FOREIGN KEY ("user_ProfileUserId") REFERENCES "User_Profile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_To_Room" ADD CONSTRAINT "User_To_Room_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_To_Room" ADD CONSTRAINT "User_To_Room_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Chat_Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Group" ADD CONSTRAINT "Chat_Group_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Chat_Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Chat_Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Quote" ADD CONSTRAINT "Chat_Quote_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Chat_Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Transaction" ADD CONSTRAINT "Chat_Transaction_transId_fkey" FOREIGN KEY ("transId") REFERENCES "Transaction"("transId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dating_Options" ADD CONSTRAINT "Dating_Options_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty_Pref" ADD CONSTRAINT "Faculty_Pref_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Dating_Options"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card_Queue" ADD CONSTRAINT "Card_Queue_frontUserId_fkey" FOREIGN KEY ("frontUserId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card_Queue" ADD CONSTRAINT "Card_Queue_backUserId_fkey" FOREIGN KEY ("backUserId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Rating" ADD CONSTRAINT "User_Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Rating" ADD CONSTRAINT "User_Rating_anotherUserId_fkey" FOREIGN KEY ("anotherUserId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Heart_History" ADD CONSTRAINT "Heart_History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Heart_History" ADD CONSTRAINT "Heart_History_anotherUserId_fkey" FOREIGN KEY ("anotherUserId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Interest" ADD CONSTRAINT "User_Interest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Interest" ADD CONSTRAINT "User_Interest_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("interestId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dating_Enroll" ADD CONSTRAINT "Dating_Enroll_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity_Poll" ADD CONSTRAINT "Activity_Poll_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll_Applicant" ADD CONSTRAINT "Poll_Applicant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll_Applicant" ADD CONSTRAINT "Poll_Applicant_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Activity_Poll"("pollId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll_Interest" ADD CONSTRAINT "Poll_Interest_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Activity_Poll"("pollId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll_Interest" ADD CONSTRAINT "Poll_Interest_activityInterestId_fkey" FOREIGN KEY ("activityInterestId") REFERENCES "Interest"("interestId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_User" ADD CONSTRAINT "Community_User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_User" ADD CONSTRAINT "Community_User_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("communityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Blacklist" ADD CONSTRAINT "Community_Blacklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Blacklist" ADD CONSTRAINT "Community_Blacklist_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("communityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Role" ADD CONSTRAINT "Community_Role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Role" ADD CONSTRAINT "Community_Role_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("communityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Role" ADD CONSTRAINT "Community_Role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Tag" ADD CONSTRAINT "Community_Tag_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("communityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Tag" ADD CONSTRAINT "Community_Tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("tagId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Post" ADD CONSTRAINT "Community_Post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Student_Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Post" ADD CONSTRAINT "Community_Post_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("communityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_File" ADD CONSTRAINT "Community_File_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File_Info"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_File" ADD CONSTRAINT "Community_File_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("communityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Show_File" ADD CONSTRAINT "User_Show_File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Show_File" ADD CONSTRAINT "User_Show_File_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File_Info"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File_Comment" ADD CONSTRAINT "File_Comment_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File_Info"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File_Comment" ADD CONSTRAINT "File_Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sub_Folder" ADD CONSTRAINT "Sub_Folder_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("folderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File_In_Folder" ADD CONSTRAINT "File_In_Folder_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File_Info"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File_In_Folder" ADD CONSTRAINT "File_In_Folder_sFolderId_fkey" FOREIGN KEY ("sFolderId") REFERENCES "Sub_Folder"("sFolderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Everyone_Access" ADD CONSTRAINT "Everyone_Access_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "File_Access"("accessId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Access" ADD CONSTRAINT "Community_Access_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "File_Access"("accessId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Access" ADD CONSTRAINT "Community_Access_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("communityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Major_Access" ADD CONSTRAINT "Major_Access_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "File_Access"("accessId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Major_Access" ADD CONSTRAINT "Major_Access_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("majorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direct_Access" ADD CONSTRAINT "Direct_Access_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "File_Access"("accessId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direct_Access" ADD CONSTRAINT "Direct_Access_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Login_Info" ADD CONSTRAINT "Login_Info_userId_token_fkey" FOREIGN KEY ("userId", "token") REFERENCES "User_Back"("userId", "token") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Login_Detail" ADD CONSTRAINT "Login_Detail_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "Login_Info"("loginId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logout_Info" ADD CONSTRAINT "Logout_Info_userId_token_fkey" FOREIGN KEY ("userId", "token") REFERENCES "User_Back"("userId", "token") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logout_Detail" ADD CONSTRAINT "Logout_Detail_logoutId_fkey" FOREIGN KEY ("logoutId") REFERENCES "Logout_Info"("logoutId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ban_Status" ADD CONSTRAINT "Ban_Status_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wordReport" ADD CONSTRAINT "wordReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wordReport" ADD CONSTRAINT "wordReport_wordReportId_fkey" FOREIGN KEY ("wordReportId") REFERENCES "Filtered_Word"("wordReportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wordReportDetail" ADD CONSTRAINT "wordReportDetail_wordReportDetailId_fkey" FOREIGN KEY ("wordReportDetailId") REFERENCES "wordReport"("wordReportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wordReportDetail" ADD CONSTRAINT "wordReportDetail_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Chat_Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Head" ADD CONSTRAINT "Sn_Head_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Head" ADD CONSTRAINT "Sn_Head_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Votedetail" ADD CONSTRAINT "Sn_Votedetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Votedetail" ADD CONSTRAINT "Sn_Votedetail_snId_fkey" FOREIGN KEY ("snId") REFERENCES "Sn_Head"("snId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Comment" ADD CONSTRAINT "Sn_Comment_snId_fkey" FOREIGN KEY ("snId") REFERENCES "Sn_Head"("snId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Comment" ADD CONSTRAINT "Sn_Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Fav" ADD CONSTRAINT "Sn_Fav_snId_fkey" FOREIGN KEY ("snId") REFERENCES "Sn_Head"("snId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Fav" ADD CONSTRAINT "Sn_Fav_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Recent" ADD CONSTRAINT "Sn_Recent_snId_fkey" FOREIGN KEY ("snId") REFERENCES "Sn_Head"("snId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Recent" ADD CONSTRAINT "Sn_Recent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Access" ADD CONSTRAINT "Sn_Access_snId_fkey" FOREIGN KEY ("snId") REFERENCES "Sn_Head"("snId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Access" ADD CONSTRAINT "Sn_Access_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_In_Library" ADD CONSTRAINT "Sn_In_Library_libId_fkey" FOREIGN KEY ("libId") REFERENCES "Sn_Library"("libId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_In_Library" ADD CONSTRAINT "Sn_In_Library_snId_fkey" FOREIGN KEY ("snId") REFERENCES "Sn_Head"("snId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction_Detail" ADD CONSTRAINT "Transaction_Detail_transId_fkey" FOREIGN KEY ("transId") REFERENCES "Transaction"("transId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction_Detail" ADD CONSTRAINT "Transaction_Detail_errKey_fkey" FOREIGN KEY ("errKey") REFERENCES "Transaction_Error"("errKey") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credit_Card" ADD CONSTRAINT "Credit_Card_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Transaction_Paymethod"("tokenId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E_Banking" ADD CONSTRAINT "E_Banking_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Transaction_Paymethod"("tokenId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QR" ADD CONSTRAINT "QR_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Transaction_Paymethod"("tokenId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction_Paytype" ADD CONSTRAINT "Transaction_Paytype_transId_fkey" FOREIGN KEY ("transId") REFERENCES "Transaction"("transId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kmutt_Point" ADD CONSTRAINT "Kmutt_Point_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kmutt_Point_History" ADD CONSTRAINT "Kmutt_Point_History_transId_fkey" FOREIGN KEY ("transId") REFERENCES "Transaction"("transId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kmutt_Point_History" ADD CONSTRAINT "Kmutt_Point_History_kpId_fkey" FOREIGN KEY ("kpId") REFERENCES "Kmutt_Point"("kpId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Order" ADD CONSTRAINT "Shop_Order_transId_fkey" FOREIGN KEY ("transId") REFERENCES "Transaction"("transId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Order" ADD CONSTRAINT "Shop_Order_couponCode_fkey" FOREIGN KEY ("couponCode") REFERENCES "User_Coupon"("couponCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Coupon" ADD CONSTRAINT "User_Coupon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Coupon" ADD CONSTRAINT "User_Coupon_couponCode_fkey" FOREIGN KEY ("couponCode") REFERENCES "Shop_Coupon"("couponCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Product" ADD CONSTRAINT "Shop_Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Shop_Categories"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Product" ADD CONSTRAINT "Shop_Product_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Shop_Contact"("contactId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Product_Images" ADD CONSTRAINT "Shop_Product_Images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Shop_Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Order_Product" ADD CONSTRAINT "Shop_Order_Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Shop_Order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Order_Product" ADD CONSTRAINT "Shop_Order_Product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Shop_Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Cart" ADD CONSTRAINT "Shop_Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Cart" ADD CONSTRAINT "Shop_Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Shop_Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Product_Review" ADD CONSTRAINT "Shop_Product_Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Product_Review" ADD CONSTRAINT "Shop_Product_Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Shop_Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Detail" ADD CONSTRAINT "Restaurant_Detail_resId_fkey" FOREIGN KEY ("resId") REFERENCES "Restaurant"("resId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Image" ADD CONSTRAINT "Restaurant_Image_resId_fkey" FOREIGN KEY ("resId") REFERENCES "Restaurant"("resId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Open" ADD CONSTRAINT "Restaurant_Open_resId_fkey" FOREIGN KEY ("resId") REFERENCES "Restaurant"("resId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Close" ADD CONSTRAINT "Restaurant_Close_resId_fkey" FOREIGN KEY ("resId") REFERENCES "Restaurant"("resId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Like_By_User" ADD CONSTRAINT "Restaurant_Like_By_User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Like_By_User" ADD CONSTRAINT "Restaurant_Like_By_User_resId_fkey" FOREIGN KEY ("resId") REFERENCES "Restaurant"("resId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Favorite_By_User" ADD CONSTRAINT "Restaurant_Favorite_By_User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Favorite_By_User" ADD CONSTRAINT "Restaurant_Favorite_By_User_resId_fkey" FOREIGN KEY ("resId") REFERENCES "Restaurant"("resId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Seen_By_User" ADD CONSTRAINT "Restaurant_Seen_By_User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Seen_By_User" ADD CONSTRAINT "Restaurant_Seen_By_User_resId_fkey" FOREIGN KEY ("resId") REFERENCES "Restaurant"("resId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Shop_Image" ADD CONSTRAINT "SReview_Shop_Image_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "SReview_Shop"("shopId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Shop_Review" ADD CONSTRAINT "SReview_Shop_Review_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "SReview_Review"("reviewId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Shop_Review" ADD CONSTRAINT "SReview_Shop_Review_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "SReview_Shop"("shopId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Shop_Review" ADD CONSTRAINT "SReview_Shop_Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Restaurant_Review" ADD CONSTRAINT "SReview_Restaurant_Review_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "SReview_Review"("reviewId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Restaurant_Review" ADD CONSTRAINT "SReview_Restaurant_Review_resId_fkey" FOREIGN KEY ("resId") REFERENCES "Restaurant"("resId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Restaurant_Review" ADD CONSTRAINT "SReview_Restaurant_Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Review_Image" ADD CONSTRAINT "SReview_Review_Image_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "SReview_Review"("reviewId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Comment" ADD CONSTRAINT "SReview_Comment_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "SReview_Review"("reviewId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Shop_Review_Like" ADD CONSTRAINT "SReview_Shop_Review_Like_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "SReview_Shop_Review"("reviewId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Shop_Review_Like" ADD CONSTRAINT "SReview_Shop_Review_Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Restaurant_Review_Like" ADD CONSTRAINT "SReview_Restaurant_Review_Like_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "SReview_Restaurant_Review"("reviewId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Restaurant_Review_Like" ADD CONSTRAINT "SReview_Restaurant_Review_Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Comment_Like" ADD CONSTRAINT "SReview_Comment_Like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "SReview_Comment"("commentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Comment_Like" ADD CONSTRAINT "SReview_Comment_Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Suggestion" ADD CONSTRAINT "SReview_Suggestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Setting" ADD CONSTRAINT "Question_Setting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Tag" ADD CONSTRAINT "Question_Tag_qId_fkey" FOREIGN KEY ("qId") REFERENCES "Question"("qId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Tag" ADD CONSTRAINT "Question_Tag_tagKey_fkey" FOREIGN KEY ("tagKey") REFERENCES "Question_Default_Tag"("tagKey") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Embed_File" ADD CONSTRAINT "Question_Embed_File_qId_fkey" FOREIGN KEY ("qId") REFERENCES "Question"("qId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Comment" ADD CONSTRAINT "Question_Comment_qId_fkey" FOREIGN KEY ("qId") REFERENCES "Question"("qId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Comment" ADD CONSTRAINT "Question_Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Answer" ADD CONSTRAINT "Question_Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Answer" ADD CONSTRAINT "Question_Answer_qId_fkey" FOREIGN KEY ("qId") REFERENCES "Question"("qId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Answer_Embed_File" ADD CONSTRAINT "Question_Answer_Embed_File_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Question_Answer"("answerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Answer_Comment" ADD CONSTRAINT "Question_Answer_Comment_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Question_Answer"("answerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Answer_Comment" ADD CONSTRAINT "Question_Answer_Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Modvote" ADD CONSTRAINT "Question_Modvote_qId_fkey" FOREIGN KEY ("qId") REFERENCES "Question"("qId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Modvote" ADD CONSTRAINT "Question_Modvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink_Quota" ADD CONSTRAINT "ShortLink_Quota_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink" ADD CONSTRAINT "ShortLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink_Permission" ADD CONSTRAINT "ShortLink_Permission_slId_fkey" FOREIGN KEY ("slId") REFERENCES "ShortLink"("slId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink_Permission_User" ADD CONSTRAINT "ShortLink_Permission_User_slId_fkey" FOREIGN KEY ("slId") REFERENCES "ShortLink"("slId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink_Permission_User" ADD CONSTRAINT "ShortLink_Permission_User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink_Permission_Major" ADD CONSTRAINT "ShortLink_Permission_Major_slId_fkey" FOREIGN KEY ("slId") REFERENCES "ShortLink"("slId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink_Permission_Major" ADD CONSTRAINT "ShortLink_Permission_Major_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("majorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink_Permission_Faculty" ADD CONSTRAINT "ShortLink_Permission_Faculty_slId_fkey" FOREIGN KEY ("slId") REFERENCES "ShortLink"("slId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink_Permission_Faculty" ADD CONSTRAINT "ShortLink_Permission_Faculty_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("facultyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytic_User_Access" ADD CONSTRAINT "Analytic_User_Access_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytic_Report_Module" ADD CONSTRAINT "Analytic_Report_Module_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytic_Report_Module" ADD CONSTRAINT "Analytic_Report_Module_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Analytic_Report"("reportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytic_External_Platform" ADD CONSTRAINT "Analytic_External_Platform_devId_fkey" FOREIGN KEY ("devId") REFERENCES "Analytic_Device"("devId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytic_User_Report" ADD CONSTRAINT "Analytic_User_Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytic_View_In_User_Report" ADD CONSTRAINT "Analytic_View_In_User_Report_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Analytic_User_Report"("reportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytic_View_In_User_Report" ADD CONSTRAINT "Analytic_View_In_User_Report_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "Analytic_View"("viewId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytic_Device" ADD CONSTRAINT "Analytic_Device_reqId_fkey" FOREIGN KEY ("reqId") REFERENCES "Analytic_Request"("reqId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytic_Request_In_User_Report" ADD CONSTRAINT "Analytic_Request_In_User_Report_reqId_fkey" FOREIGN KEY ("reqId") REFERENCES "Analytic_Request"("reqId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytic_Request_In_User_Report" ADD CONSTRAINT "Analytic_Request_In_User_Report_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "Analytic_View"("viewId") ON DELETE RESTRICT ON UPDATE CASCADE;
