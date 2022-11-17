/*
  Warnings:

  - You are about to drop the column `annDetail` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `annTopic` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `languageId` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `notiTypeName` on the `Noti_Type` table. All the data in the column will be lost.
  - Added the required column `annDetail` to the `Post_To_Language` table without a default value. This is not possible if the table is not empty.
  - Added the required column `annTopic` to the `Post_To_Language` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Action_to_XP" DROP CONSTRAINT "Action_to_XP_userId_fkey";

-- DropForeignKey
ALTER TABLE "Activity_Poll" DROP CONSTRAINT "Activity_Poll_userId_fkey";

-- DropForeignKey
ALTER TABLE "Announcement_Approve" DROP CONSTRAINT "Announcement_Approve_postId_fkey";

-- DropForeignKey
ALTER TABLE "Announcement_Delete" DROP CONSTRAINT "Announcement_Delete_postId_fkey";

-- DropForeignKey
ALTER TABLE "Announcement_Pin" DROP CONSTRAINT "Announcement_Pin_postId_fkey";

-- DropForeignKey
ALTER TABLE "Announcement_Pin" DROP CONSTRAINT "Announcement_Pin_userId_fkey";

-- DropForeignKey
ALTER TABLE "Announcement_Post" DROP CONSTRAINT "Announcement_Post_postId_fkey";

-- DropForeignKey
ALTER TABLE "Announcement_Seen" DROP CONSTRAINT "Announcement_Seen_postId_fkey";

-- DropForeignKey
ALTER TABLE "Announcement_Seen" DROP CONSTRAINT "Announcement_Seen_userId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Ban_Status" DROP CONSTRAINT "Ban_Status_userId_fkey";

-- DropForeignKey
ALTER TABLE "Card_Queue" DROP CONSTRAINT "Card_Queue_backUserId_fkey";

-- DropForeignKey
ALTER TABLE "Card_Queue" DROP CONSTRAINT "Card_Queue_frontUserId_fkey";

-- DropForeignKey
ALTER TABLE "Card_Queue" DROP CONSTRAINT "Card_Queue_userId_fkey";

-- DropForeignKey
ALTER TABLE "Chat_Group" DROP CONSTRAINT "Chat_Group_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Chat_Quote" DROP CONSTRAINT "Chat_Quote_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Chat_Quote" DROP CONSTRAINT "Chat_Quote_userId_fkey";

-- DropForeignKey
ALTER TABLE "Chat_Transaction" DROP CONSTRAINT "Chat_Transaction_transId_fkey";

-- DropForeignKey
ALTER TABLE "Chat_User" DROP CONSTRAINT "Chat_User_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment_Report" DROP CONSTRAINT "Comment_Report_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Community" DROP CONSTRAINT "Community_communityOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "Community_Access" DROP CONSTRAINT "Community_Access_accessId_fkey";

-- DropForeignKey
ALTER TABLE "Community_Access" DROP CONSTRAINT "Community_Access_communityId_fkey";

-- DropForeignKey
ALTER TABLE "Community_Blacklist" DROP CONSTRAINT "Community_Blacklist_communityId_fkey";

-- DropForeignKey
ALTER TABLE "Community_Blacklist" DROP CONSTRAINT "Community_Blacklist_userId_fkey";

-- DropForeignKey
ALTER TABLE "Community_File" DROP CONSTRAINT "Community_File_communityId_fkey";

-- DropForeignKey
ALTER TABLE "Community_File" DROP CONSTRAINT "Community_File_fileId_fkey";

-- DropForeignKey
ALTER TABLE "Community_Post" DROP CONSTRAINT "Community_Post_communityId_fkey";

-- DropForeignKey
ALTER TABLE "Community_Post" DROP CONSTRAINT "Community_Post_postId_fkey";

-- DropForeignKey
ALTER TABLE "Community_Tag" DROP CONSTRAINT "Community_Tag_communityId_fkey";

-- DropForeignKey
ALTER TABLE "Community_Tag" DROP CONSTRAINT "Community_Tag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "Community_User" DROP CONSTRAINT "Community_User_communityId_fkey";

-- DropForeignKey
ALTER TABLE "Community_User" DROP CONSTRAINT "Community_User_roleId_fkey";

-- DropForeignKey
ALTER TABLE "Community_User" DROP CONSTRAINT "Community_User_userId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Credit_Card" DROP CONSTRAINT "Credit_Card_tokenId_fkey";

-- DropForeignKey
ALTER TABLE "Dating_Enroll" DROP CONSTRAINT "Dating_Enroll_userId_fkey";

-- DropForeignKey
ALTER TABLE "Dating_Options" DROP CONSTRAINT "Dating_Options_userId_fkey";

-- DropForeignKey
ALTER TABLE "Detail" DROP CONSTRAINT "Detail_userId_fkey";

-- DropForeignKey
ALTER TABLE "Direct_Access" DROP CONSTRAINT "Direct_Access_accessId_fkey";

-- DropForeignKey
ALTER TABLE "Direct_Access" DROP CONSTRAINT "Direct_Access_userId_fkey";

-- DropForeignKey
ALTER TABLE "EXP" DROP CONSTRAINT "EXP_userId_fkey";

-- DropForeignKey
ALTER TABLE "E_Banking" DROP CONSTRAINT "E_Banking_tokenId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_placeId_fkey";

-- DropForeignKey
ALTER TABLE "Everyone_Access" DROP CONSTRAINT "Everyone_Access_accessId_fkey";

-- DropForeignKey
ALTER TABLE "Faculty_Pref" DROP CONSTRAINT "Faculty_Pref_userId_fkey";

-- DropForeignKey
ALTER TABLE "File_Comment" DROP CONSTRAINT "File_Comment_fileId_fkey";

-- DropForeignKey
ALTER TABLE "File_Comment" DROP CONSTRAINT "File_Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "File_History" DROP CONSTRAINT "File_History_fileId_fkey";

-- DropForeignKey
ALTER TABLE "File_History" DROP CONSTRAINT "File_History_userId_fkey";

-- DropForeignKey
ALTER TABLE "File_In_Folder" DROP CONSTRAINT "File_In_Folder_fileId_fkey";

-- DropForeignKey
ALTER TABLE "File_In_Folder" DROP CONSTRAINT "File_In_Folder_sFolderId_fkey";

-- DropForeignKey
ALTER TABLE "File_Info" DROP CONSTRAINT "File_Info_fileSender_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_anotherUserId_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_userId_fkey";

-- DropForeignKey
ALTER TABLE "Heart_History" DROP CONSTRAINT "Heart_History_anotherUserId_fkey";

-- DropForeignKey
ALTER TABLE "Heart_History" DROP CONSTRAINT "Heart_History_userId_fkey";

-- DropForeignKey
ALTER TABLE "Hide_Comment" DROP CONSTRAINT "Hide_Comment_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Hide_Comment" DROP CONSTRAINT "Hide_Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Hide_Post" DROP CONSTRAINT "Hide_Post_postId_fkey";

-- DropForeignKey
ALTER TABLE "Hide_Post" DROP CONSTRAINT "Hide_Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "Image_Container" DROP CONSTRAINT "Image_Container_postId_fkey";

-- DropForeignKey
ALTER TABLE "Kmutt_Point" DROP CONSTRAINT "Kmutt_Point_userId_fkey";

-- DropForeignKey
ALTER TABLE "Kmutt_Point_History" DROP CONSTRAINT "Kmutt_Point_History_kpId_fkey";

-- DropForeignKey
ALTER TABLE "Major" DROP CONSTRAINT "Major_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Major_Access" DROP CONSTRAINT "Major_Access_accessId_fkey";

-- DropForeignKey
ALTER TABLE "Major_Access" DROP CONSTRAINT "Major_Access_majorId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Noti_Object" DROP CONSTRAINT "Noti_Object_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Noti_Setting_App" DROP CONSTRAINT "Noti_Setting_App_notiTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Noti_Setting_App" DROP CONSTRAINT "Noti_Setting_App_userId_fkey";

-- DropForeignKey
ALTER TABLE "Noti_Setting_Email" DROP CONSTRAINT "Noti_Setting_Email_notiTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Noti_Setting_Email" DROP CONSTRAINT "Noti_Setting_Email_userId_fkey";

-- DropForeignKey
ALTER TABLE "Poll_Applicant" DROP CONSTRAINT "Poll_Applicant_pollId_fkey";

-- DropForeignKey
ALTER TABLE "Poll_Applicant" DROP CONSTRAINT "Poll_Applicant_userId_fkey";

-- DropForeignKey
ALTER TABLE "Poll_Interest" DROP CONSTRAINT "Poll_Interest_activityInterestId_fkey";

-- DropForeignKey
ALTER TABLE "Poll_Interest" DROP CONSTRAINT "Poll_Interest_pollId_fkey";

-- DropForeignKey
ALTER TABLE "Post_Body" DROP CONSTRAINT "Post_Body_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post_Comment" DROP CONSTRAINT "Post_Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post_Comment" DROP CONSTRAINT "Post_Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post_Report" DROP CONSTRAINT "Post_Report_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post_To_Language" DROP CONSTRAINT "Post_To_Language_languageId_fkey";

-- DropForeignKey
ALTER TABLE "Post_To_Language" DROP CONSTRAINT "Post_To_Language_postId_fkey";

-- DropForeignKey
ALTER TABLE "QR" DROP CONSTRAINT "QR_tokenId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question_Answer" DROP CONSTRAINT "Question_Answer_qId_fkey";

-- DropForeignKey
ALTER TABLE "Question_Answer" DROP CONSTRAINT "Question_Answer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question_Answer_Comment" DROP CONSTRAINT "Question_Answer_Comment_answerId_fkey";

-- DropForeignKey
ALTER TABLE "Question_Answer_Comment" DROP CONSTRAINT "Question_Answer_Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question_Answer_Embed_File" DROP CONSTRAINT "Question_Answer_Embed_File_answerId_fkey";

-- DropForeignKey
ALTER TABLE "Question_Comment" DROP CONSTRAINT "Question_Comment_qId_fkey";

-- DropForeignKey
ALTER TABLE "Question_Comment" DROP CONSTRAINT "Question_Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question_Embed_File" DROP CONSTRAINT "Question_Embed_File_qId_fkey";

-- DropForeignKey
ALTER TABLE "Question_Modvote" DROP CONSTRAINT "Question_Modvote_qId_fkey";

-- DropForeignKey
ALTER TABLE "Question_Modvote" DROP CONSTRAINT "Question_Modvote_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question_Setting" DROP CONSTRAINT "Question_Setting_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question_Tag" DROP CONSTRAINT "Question_Tag_qId_fkey";

-- DropForeignKey
ALTER TABLE "Question_Tag" DROP CONSTRAINT "Question_Tag_tagKey_fkey";

-- DropForeignKey
ALTER TABLE "Repost" DROP CONSTRAINT "Repost_newPostId_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant_Close" DROP CONSTRAINT "Restaurant_Close_resId_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant_Detail" DROP CONSTRAINT "Restaurant_Detail_resId_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant_Favorite_By_User" DROP CONSTRAINT "Restaurant_Favorite_By_User_resId_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant_Favorite_By_User" DROP CONSTRAINT "Restaurant_Favorite_By_User_userId_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant_Image" DROP CONSTRAINT "Restaurant_Image_resId_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant_Like_By_User" DROP CONSTRAINT "Restaurant_Like_By_User_resId_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant_Like_By_User" DROP CONSTRAINT "Restaurant_Like_By_User_userId_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant_Open" DROP CONSTRAINT "Restaurant_Open_resId_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant_Seen_By_User" DROP CONSTRAINT "Restaurant_Seen_By_User_resId_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant_Seen_By_User" DROP CONSTRAINT "Restaurant_Seen_By_User_userId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Comment" DROP CONSTRAINT "SReview_Comment_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Comment_Like" DROP CONSTRAINT "SReview_Comment_Like_commentId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Comment_Like" DROP CONSTRAINT "SReview_Comment_Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Restaurant_Review" DROP CONSTRAINT "SReview_Restaurant_Review_resId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Restaurant_Review" DROP CONSTRAINT "SReview_Restaurant_Review_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Restaurant_Review" DROP CONSTRAINT "SReview_Restaurant_Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Restaurant_Review_Like" DROP CONSTRAINT "SReview_Restaurant_Review_Like_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Restaurant_Review_Like" DROP CONSTRAINT "SReview_Restaurant_Review_Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Review_Image" DROP CONSTRAINT "SReview_Review_Image_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Shop_Image" DROP CONSTRAINT "SReview_Shop_Image_shopId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Shop_Review" DROP CONSTRAINT "SReview_Shop_Review_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Shop_Review" DROP CONSTRAINT "SReview_Shop_Review_shopId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Shop_Review" DROP CONSTRAINT "SReview_Shop_Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Shop_Review_Like" DROP CONSTRAINT "SReview_Shop_Review_Like_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Shop_Review_Like" DROP CONSTRAINT "SReview_Shop_Review_Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "SReview_Suggestion" DROP CONSTRAINT "SReview_Suggestion_userId_fkey";

-- DropForeignKey
ALTER TABLE "Shop_Cart" DROP CONSTRAINT "Shop_Cart_productId_fkey";

-- DropForeignKey
ALTER TABLE "Shop_Cart" DROP CONSTRAINT "Shop_Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "Shop_Coupon" DROP CONSTRAINT "Shop_Coupon_productId_fkey";

-- DropForeignKey
ALTER TABLE "Shop_Order" DROP CONSTRAINT "Shop_Order_couponCode_fkey";

-- DropForeignKey
ALTER TABLE "Shop_Order_Product" DROP CONSTRAINT "Shop_Order_Product_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Shop_Order_Product" DROP CONSTRAINT "Shop_Order_Product_productId_fkey";

-- DropForeignKey
ALTER TABLE "Shop_Product" DROP CONSTRAINT "Shop_Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Shop_Product" DROP CONSTRAINT "Shop_Product_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Shop_Product_Images" DROP CONSTRAINT "Shop_Product_Images_productId_fkey";

-- DropForeignKey
ALTER TABLE "Shop_Product_Review" DROP CONSTRAINT "Shop_Product_Review_productId_fkey";

-- DropForeignKey
ALTER TABLE "Shop_Product_Review" DROP CONSTRAINT "Shop_Product_Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "ShortLink" DROP CONSTRAINT "ShortLink_userId_fkey";

-- DropForeignKey
ALTER TABLE "ShortLink_Permission" DROP CONSTRAINT "ShortLink_Permission_slId_fkey";

-- DropForeignKey
ALTER TABLE "ShortLink_Permission_Faculty" DROP CONSTRAINT "ShortLink_Permission_Faculty_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "ShortLink_Permission_Faculty" DROP CONSTRAINT "ShortLink_Permission_Faculty_slId_fkey";

-- DropForeignKey
ALTER TABLE "ShortLink_Permission_Major" DROP CONSTRAINT "ShortLink_Permission_Major_majorId_fkey";

-- DropForeignKey
ALTER TABLE "ShortLink_Permission_Major" DROP CONSTRAINT "ShortLink_Permission_Major_slId_fkey";

-- DropForeignKey
ALTER TABLE "ShortLink_Permission_User" DROP CONSTRAINT "ShortLink_Permission_User_slId_fkey";

-- DropForeignKey
ALTER TABLE "ShortLink_Permission_User" DROP CONSTRAINT "ShortLink_Permission_User_userId_fkey";

-- DropForeignKey
ALTER TABLE "ShortLink_Quota" DROP CONSTRAINT "ShortLink_Quota_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sn_Access" DROP CONSTRAINT "Sn_Access_snId_fkey";

-- DropForeignKey
ALTER TABLE "Sn_Access" DROP CONSTRAINT "Sn_Access_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sn_Comment" DROP CONSTRAINT "Sn_Comment_snId_fkey";

-- DropForeignKey
ALTER TABLE "Sn_Comment" DROP CONSTRAINT "Sn_Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sn_Fav" DROP CONSTRAINT "Sn_Fav_snId_fkey";

-- DropForeignKey
ALTER TABLE "Sn_Fav" DROP CONSTRAINT "Sn_Fav_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sn_Head" DROP CONSTRAINT "Sn_Head_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sn_In_Library" DROP CONSTRAINT "Sn_In_Library_libId_fkey";

-- DropForeignKey
ALTER TABLE "Sn_In_Library" DROP CONSTRAINT "Sn_In_Library_snId_fkey";

-- DropForeignKey
ALTER TABLE "Sn_Recent" DROP CONSTRAINT "Sn_Recent_snId_fkey";

-- DropForeignKey
ALTER TABLE "Sn_Recent" DROP CONSTRAINT "Sn_Recent_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sn_Votedetail" DROP CONSTRAINT "Sn_Votedetail_snId_fkey";

-- DropForeignKey
ALTER TABLE "Sn_Votedetail" DROP CONSTRAINT "Sn_Votedetail_userId_fkey";

-- DropForeignKey
ALTER TABLE "Student_Post" DROP CONSTRAINT "Student_Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "Student_Reacted" DROP CONSTRAINT "Student_Reacted_emoteId_fkey";

-- DropForeignKey
ALTER TABLE "Student_Reacted" DROP CONSTRAINT "Student_Reacted_postId_fkey";

-- DropForeignKey
ALTER TABLE "Student_Reacted" DROP CONSTRAINT "Student_Reacted_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sub_Folder" DROP CONSTRAINT "Sub_Folder_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task_Check" DROP CONSTRAINT "Task_Check_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Task_Check" DROP CONSTRAINT "Task_Check_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task_History" DROP CONSTRAINT "Task_History_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Task_History" DROP CONSTRAINT "Task_History_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task_Track" DROP CONSTRAINT "Task_Track_userId_fkey";

-- DropForeignKey
ALTER TABLE "Timetable" DROP CONSTRAINT "Timetable_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction_Detail" DROP CONSTRAINT "Transaction_Detail_errKey_fkey";

-- DropForeignKey
ALTER TABLE "Transaction_Detail" DROP CONSTRAINT "Transaction_Detail_transId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction_Paytype" DROP CONSTRAINT "Transaction_Paytype_transId_fkey";

-- DropForeignKey
ALTER TABLE "User_Back" DROP CONSTRAINT "User_Back_userId_fkey";

-- DropForeignKey
ALTER TABLE "User_Blocked" DROP CONSTRAINT "User_Blocked_anotherUserId_fkey";

-- DropForeignKey
ALTER TABLE "User_Coupon" DROP CONSTRAINT "User_Coupon_couponCode_fkey";

-- DropForeignKey
ALTER TABLE "User_Coupon" DROP CONSTRAINT "User_Coupon_userId_fkey";

-- DropForeignKey
ALTER TABLE "User_Interest" DROP CONSTRAINT "User_Interest_interestId_fkey";

-- DropForeignKey
ALTER TABLE "User_Interest" DROP CONSTRAINT "User_Interest_userId_fkey";

-- DropForeignKey
ALTER TABLE "User_Noti_Object" DROP CONSTRAINT "User_Noti_Object_notiObjectId_fkey";

-- DropForeignKey
ALTER TABLE "User_Noti_Object" DROP CONSTRAINT "User_Noti_Object_userId_fkey";

-- DropForeignKey
ALTER TABLE "User_Rating" DROP CONSTRAINT "User_Rating_anotherUserId_fkey";

-- DropForeignKey
ALTER TABLE "User_Rating" DROP CONSTRAINT "User_Rating_userId_fkey";

-- DropForeignKey
ALTER TABLE "User_Report" DROP CONSTRAINT "User_Report_anotherUserId_fkey";

-- DropForeignKey
ALTER TABLE "User_Show_File" DROP CONSTRAINT "User_Show_File_fileId_fkey";

-- DropForeignKey
ALTER TABLE "User_Show_File" DROP CONSTRAINT "User_Show_File_userId_fkey";

-- DropForeignKey
ALTER TABLE "User_To_Group" DROP CONSTRAINT "User_To_Group_groupId_fkey";

-- DropForeignKey
ALTER TABLE "User_To_Group" DROP CONSTRAINT "User_To_Group_userId_fkey";

-- DropForeignKey
ALTER TABLE "User_To_Role" DROP CONSTRAINT "User_To_Role_roleId_fkey";

-- DropForeignKey
ALTER TABLE "User_To_Role" DROP CONSTRAINT "User_To_Role_userId_fkey";

-- DropForeignKey
ALTER TABLE "User_To_Room" DROP CONSTRAINT "User_To_Room_roomId_fkey";

-- DropForeignKey
ALTER TABLE "User_To_Room" DROP CONSTRAINT "User_To_Room_userId_fkey";

-- DropForeignKey
ALTER TABLE "Value" DROP CONSTRAINT "Value_notiObjectId_fkey";

-- DropForeignKey
ALTER TABLE "Video_Container" DROP CONSTRAINT "Video_Container_postId_fkey";

-- DropForeignKey
ALTER TABLE "Word_Report_Detail" DROP CONSTRAINT "Word_Report_Detail_wordReportDetailId_fkey";

-- DropIndex
DROP INDEX "Assignment_eventId_key";

-- DropIndex
DROP INDEX "Course_eventId_key";

-- AlterTable
ALTER TABLE "Activity_Poll" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "annDetail",
DROP COLUMN "annTopic",
DROP COLUMN "languageId",
ALTER COLUMN "annExpired" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "eventId";

-- AlterTable
ALTER TABLE "Card_Queue" ALTER COLUMN "frontUserId" DROP NOT NULL,
ALTER COLUMN "backUserId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Community" ALTER COLUMN "communityOwnerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "eventId";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "assignmentId" TEXT,
ADD COLUMN     "courseId" TEXT,
ALTER COLUMN "placeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Major" ALTER COLUMN "facultyId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "senderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Noti_Type" DROP COLUMN "notiTypeName";

-- AlterTable
ALTER TABLE "Post_To_Language" ADD COLUMN     "annDetail" TEXT NOT NULL,
ADD COLUMN     "annTopic" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Shop_Coupon" ALTER COLUMN "productId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Shop_Order" ALTER COLUMN "couponCode" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Shop_Product" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Major" ADD CONSTRAINT "Major_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("facultyId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_To_Role" ADD CONSTRAINT "User_To_Role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_To_Role" ADD CONSTRAINT "User_To_Role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("roleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_anotherUserId_fkey" FOREIGN KEY ("anotherUserId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Report" ADD CONSTRAINT "User_Report_anotherUserId_fkey" FOREIGN KEY ("anotherUserId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Blocked" ADD CONSTRAINT "User_Blocked_anotherUserId_fkey" FOREIGN KEY ("anotherUserId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EXP" ADD CONSTRAINT "EXP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action_to_XP" ADD CONSTRAINT "Action_to_XP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "EXP"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student_Post" ADD CONSTRAINT "Student_Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Body" ADD CONSTRAINT "Post_Body_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Student_Post"("postId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image_Container" ADD CONSTRAINT "Image_Container_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Student_Post"("postId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video_Container" ADD CONSTRAINT "Video_Container_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Student_Post"("postId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student_Reacted" ADD CONSTRAINT "Student_Reacted_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student_Reacted" ADD CONSTRAINT "Student_Reacted_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Student_Post"("postId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student_Reacted" ADD CONSTRAINT "Student_Reacted_emoteId_fkey" FOREIGN KEY ("emoteId") REFERENCES "Emote_Collection"("emoteId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Comment" ADD CONSTRAINT "Post_Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Comment" ADD CONSTRAINT "Post_Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Student_Post"("postId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repost" ADD CONSTRAINT "Repost_newPostId_fkey" FOREIGN KEY ("newPostId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Report" ADD CONSTRAINT "Post_Report_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Student_Post"("postId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_Report" ADD CONSTRAINT "Comment_Report_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Post_Comment"("commentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hide_Post" ADD CONSTRAINT "Hide_Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hide_Post" ADD CONSTRAINT "Hide_Post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Student_Post"("postId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hide_Comment" ADD CONSTRAINT "Hide_Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hide_Comment" ADD CONSTRAINT "Hide_Comment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Post_Comment"("commentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Noti_Object" ADD CONSTRAINT "User_Noti_Object_notiObjectId_fkey" FOREIGN KEY ("notiObjectId") REFERENCES "Noti_Object"("notiObjectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Noti_Object" ADD CONSTRAINT "User_Noti_Object_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noti_Object" ADD CONSTRAINT "Noti_Object_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("templateId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Value" ADD CONSTRAINT "Value_notiObjectId_fkey" FOREIGN KEY ("notiObjectId") REFERENCES "Noti_Object"("notiObjectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noti_Setting_Email" ADD CONSTRAINT "Noti_Setting_Email_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noti_Setting_Email" ADD CONSTRAINT "Noti_Setting_Email_notiTypeId_fkey" FOREIGN KEY ("notiTypeId") REFERENCES "Noti_Type"("notiTypeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noti_Setting_App" ADD CONSTRAINT "Noti_Setting_App_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noti_Setting_App" ADD CONSTRAINT "Noti_Setting_App_notiTypeId_fkey" FOREIGN KEY ("notiTypeId") REFERENCES "Noti_Type"("notiTypeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Event_Place"("placeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("assignmentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Task_Folder"("folderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Task_Group"("groupId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_To_Group" ADD CONSTRAINT "User_To_Group_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_To_Group" ADD CONSTRAINT "User_To_Group_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Task_Group"("groupId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_Track" ADD CONSTRAINT "Task_Track_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_Check" ADD CONSTRAINT "Task_Check_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("taskId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_Check" ADD CONSTRAINT "Task_Check_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_History" ADD CONSTRAINT "Task_History_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("taskId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_History" ADD CONSTRAINT "Task_History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_To_Language" ADD CONSTRAINT "Post_To_Language_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Announcement"("postId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_To_Language" ADD CONSTRAINT "Post_To_Language_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Announcement_Language"("languageId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement_Post" ADD CONSTRAINT "Announcement_Post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Announcement"("postId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement_Delete" ADD CONSTRAINT "Announcement_Delete_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Announcement"("postId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement_Pin" ADD CONSTRAINT "Announcement_Pin_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Announcement"("postId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement_Pin" ADD CONSTRAINT "Announcement_Pin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement_Seen" ADD CONSTRAINT "Announcement_Seen_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Announcement"("postId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement_Seen" ADD CONSTRAINT "Announcement_Seen_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement_Approve" ADD CONSTRAINT "Announcement_Approve_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Announcement"("postId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_User" ADD CONSTRAINT "Chat_User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_To_Room" ADD CONSTRAINT "User_To_Room_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Chat_User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_To_Room" ADD CONSTRAINT "User_To_Room_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Chat_Room"("roomId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Group" ADD CONSTRAINT "Chat_Group_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Chat_Room"("roomId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Chat_Room"("roomId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Chat_User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Quote" ADD CONSTRAINT "Chat_Quote_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Chat_Room"("roomId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Quote" ADD CONSTRAINT "Chat_Quote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Chat_User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Transaction" ADD CONSTRAINT "Chat_Transaction_transId_fkey" FOREIGN KEY ("transId") REFERENCES "Transaction"("transId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dating_Options" ADD CONSTRAINT "Dating_Options_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty_Pref" ADD CONSTRAINT "Faculty_Pref_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Dating_Options"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card_Queue" ADD CONSTRAINT "Card_Queue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card_Queue" ADD CONSTRAINT "Card_Queue_frontUserId_fkey" FOREIGN KEY ("frontUserId") REFERENCES "User_Profile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card_Queue" ADD CONSTRAINT "Card_Queue_backUserId_fkey" FOREIGN KEY ("backUserId") REFERENCES "User_Profile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Rating" ADD CONSTRAINT "User_Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Rating" ADD CONSTRAINT "User_Rating_anotherUserId_fkey" FOREIGN KEY ("anotherUserId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Heart_History" ADD CONSTRAINT "Heart_History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Heart_History" ADD CONSTRAINT "Heart_History_anotherUserId_fkey" FOREIGN KEY ("anotherUserId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Interest" ADD CONSTRAINT "User_Interest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Interest" ADD CONSTRAINT "User_Interest_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("interestId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dating_Enroll" ADD CONSTRAINT "Dating_Enroll_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity_Poll" ADD CONSTRAINT "Activity_Poll_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll_Applicant" ADD CONSTRAINT "Poll_Applicant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll_Applicant" ADD CONSTRAINT "Poll_Applicant_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Activity_Poll"("pollId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll_Interest" ADD CONSTRAINT "Poll_Interest_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Activity_Poll"("pollId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll_Interest" ADD CONSTRAINT "Poll_Interest_activityInterestId_fkey" FOREIGN KEY ("activityInterestId") REFERENCES "Interest"("interestId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_communityOwnerId_fkey" FOREIGN KEY ("communityOwnerId") REFERENCES "User_Profile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_User" ADD CONSTRAINT "Community_User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_User" ADD CONSTRAINT "Community_User_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("communityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_User" ADD CONSTRAINT "Community_User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Community_Role"("roleId") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Blacklist" ADD CONSTRAINT "Community_Blacklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Blacklist" ADD CONSTRAINT "Community_Blacklist_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("communityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Tag" ADD CONSTRAINT "Community_Tag_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("communityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Tag" ADD CONSTRAINT "Community_Tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("tagId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Post" ADD CONSTRAINT "Community_Post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Student_Post"("postId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Post" ADD CONSTRAINT "Community_Post_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("communityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_File" ADD CONSTRAINT "Community_File_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File_Info"("fileId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_File" ADD CONSTRAINT "Community_File_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("communityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File_Info" ADD CONSTRAINT "File_Info_fileSender_fkey" FOREIGN KEY ("fileSender") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Show_File" ADD CONSTRAINT "User_Show_File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Show_File" ADD CONSTRAINT "User_Show_File_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File_Info"("fileId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File_Comment" ADD CONSTRAINT "File_Comment_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File_Info"("fileId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File_Comment" ADD CONSTRAINT "File_Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sub_Folder" ADD CONSTRAINT "Sub_Folder_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("folderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File_In_Folder" ADD CONSTRAINT "File_In_Folder_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File_Info"("fileId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File_In_Folder" ADD CONSTRAINT "File_In_Folder_sFolderId_fkey" FOREIGN KEY ("sFolderId") REFERENCES "Sub_Folder"("sFolderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File_History" ADD CONSTRAINT "File_History_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File_Info"("fileId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File_History" ADD CONSTRAINT "File_History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Everyone_Access" ADD CONSTRAINT "Everyone_Access_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "File_Access"("accessId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Access" ADD CONSTRAINT "Community_Access_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "File_Access"("accessId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Access" ADD CONSTRAINT "Community_Access_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("communityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Major_Access" ADD CONSTRAINT "Major_Access_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "File_Access"("accessId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Major_Access" ADD CONSTRAINT "Major_Access_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("majorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direct_Access" ADD CONSTRAINT "Direct_Access_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "File_Access"("accessId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direct_Access" ADD CONSTRAINT "Direct_Access_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Back" ADD CONSTRAINT "User_Back_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ban_Status" ADD CONSTRAINT "Ban_Status_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word_Report_Detail" ADD CONSTRAINT "Word_Report_Detail_wordReportDetailId_fkey" FOREIGN KEY ("wordReportDetailId") REFERENCES "Word_Report"("wordReportId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Head" ADD CONSTRAINT "Sn_Head_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Votedetail" ADD CONSTRAINT "Sn_Votedetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Votedetail" ADD CONSTRAINT "Sn_Votedetail_snId_fkey" FOREIGN KEY ("snId") REFERENCES "Sn_Head"("snId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Comment" ADD CONSTRAINT "Sn_Comment_snId_fkey" FOREIGN KEY ("snId") REFERENCES "Sn_Head"("snId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Comment" ADD CONSTRAINT "Sn_Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Fav" ADD CONSTRAINT "Sn_Fav_snId_fkey" FOREIGN KEY ("snId") REFERENCES "Sn_Head"("snId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Fav" ADD CONSTRAINT "Sn_Fav_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Recent" ADD CONSTRAINT "Sn_Recent_snId_fkey" FOREIGN KEY ("snId") REFERENCES "Sn_Head"("snId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Recent" ADD CONSTRAINT "Sn_Recent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Access" ADD CONSTRAINT "Sn_Access_snId_fkey" FOREIGN KEY ("snId") REFERENCES "Sn_Head"("snId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_Access" ADD CONSTRAINT "Sn_Access_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_In_Library" ADD CONSTRAINT "Sn_In_Library_libId_fkey" FOREIGN KEY ("libId") REFERENCES "Sn_Library"("libId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sn_In_Library" ADD CONSTRAINT "Sn_In_Library_snId_fkey" FOREIGN KEY ("snId") REFERENCES "Sn_Head"("snId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction_Detail" ADD CONSTRAINT "Transaction_Detail_transId_fkey" FOREIGN KEY ("transId") REFERENCES "Transaction"("transId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction_Detail" ADD CONSTRAINT "Transaction_Detail_errKey_fkey" FOREIGN KEY ("errKey") REFERENCES "Transaction_Error"("errKey") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credit_Card" ADD CONSTRAINT "Credit_Card_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Transaction_Paymethod"("tokenId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E_Banking" ADD CONSTRAINT "E_Banking_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Transaction_Paymethod"("tokenId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QR" ADD CONSTRAINT "QR_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Transaction_Paymethod"("tokenId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction_Paytype" ADD CONSTRAINT "Transaction_Paytype_transId_fkey" FOREIGN KEY ("transId") REFERENCES "Transaction"("transId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kmutt_Point" ADD CONSTRAINT "Kmutt_Point_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kmutt_Point_History" ADD CONSTRAINT "Kmutt_Point_History_kpId_fkey" FOREIGN KEY ("kpId") REFERENCES "Kmutt_Point"("kpId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Order" ADD CONSTRAINT "Shop_Order_couponCode_fkey" FOREIGN KEY ("couponCode") REFERENCES "User_Coupon"("couponCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Coupon" ADD CONSTRAINT "Shop_Coupon_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Shop_Product"("productId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Coupon" ADD CONSTRAINT "User_Coupon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Coupon" ADD CONSTRAINT "User_Coupon_couponCode_fkey" FOREIGN KEY ("couponCode") REFERENCES "Shop_Coupon"("couponCode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Product" ADD CONSTRAINT "Shop_Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Shop_Categories"("categoryId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Product" ADD CONSTRAINT "Shop_Product_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Shop_Contact"("contactId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Product_Images" ADD CONSTRAINT "Shop_Product_Images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Shop_Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Order_Product" ADD CONSTRAINT "Shop_Order_Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Shop_Order"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Order_Product" ADD CONSTRAINT "Shop_Order_Product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Shop_Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Cart" ADD CONSTRAINT "Shop_Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Cart" ADD CONSTRAINT "Shop_Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Shop_Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Product_Review" ADD CONSTRAINT "Shop_Product_Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_Product_Review" ADD CONSTRAINT "Shop_Product_Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Shop_Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Detail" ADD CONSTRAINT "Restaurant_Detail_resId_fkey" FOREIGN KEY ("resId") REFERENCES "Restaurant"("resId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Image" ADD CONSTRAINT "Restaurant_Image_resId_fkey" FOREIGN KEY ("resId") REFERENCES "Restaurant"("resId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Open" ADD CONSTRAINT "Restaurant_Open_resId_fkey" FOREIGN KEY ("resId") REFERENCES "Restaurant"("resId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Close" ADD CONSTRAINT "Restaurant_Close_resId_fkey" FOREIGN KEY ("resId") REFERENCES "Restaurant"("resId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Like_By_User" ADD CONSTRAINT "Restaurant_Like_By_User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Like_By_User" ADD CONSTRAINT "Restaurant_Like_By_User_resId_fkey" FOREIGN KEY ("resId") REFERENCES "Restaurant"("resId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Favorite_By_User" ADD CONSTRAINT "Restaurant_Favorite_By_User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Favorite_By_User" ADD CONSTRAINT "Restaurant_Favorite_By_User_resId_fkey" FOREIGN KEY ("resId") REFERENCES "Restaurant"("resId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Seen_By_User" ADD CONSTRAINT "Restaurant_Seen_By_User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant_Seen_By_User" ADD CONSTRAINT "Restaurant_Seen_By_User_resId_fkey" FOREIGN KEY ("resId") REFERENCES "Restaurant"("resId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Shop_Image" ADD CONSTRAINT "SReview_Shop_Image_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "SReview_Shop"("shopId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Shop_Review" ADD CONSTRAINT "SReview_Shop_Review_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "SReview_Review"("reviewId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Shop_Review" ADD CONSTRAINT "SReview_Shop_Review_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "SReview_Shop"("shopId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Shop_Review" ADD CONSTRAINT "SReview_Shop_Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Restaurant_Review" ADD CONSTRAINT "SReview_Restaurant_Review_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "SReview_Review"("reviewId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Restaurant_Review" ADD CONSTRAINT "SReview_Restaurant_Review_resId_fkey" FOREIGN KEY ("resId") REFERENCES "Restaurant"("resId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Restaurant_Review" ADD CONSTRAINT "SReview_Restaurant_Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Review_Image" ADD CONSTRAINT "SReview_Review_Image_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "SReview_Review"("reviewId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Comment" ADD CONSTRAINT "SReview_Comment_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "SReview_Review"("reviewId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Comment" ADD CONSTRAINT "SReview_Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Shop_Review_Like" ADD CONSTRAINT "SReview_Shop_Review_Like_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "SReview_Shop_Review"("reviewId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Shop_Review_Like" ADD CONSTRAINT "SReview_Shop_Review_Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Restaurant_Review_Like" ADD CONSTRAINT "SReview_Restaurant_Review_Like_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "SReview_Restaurant_Review"("reviewId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Restaurant_Review_Like" ADD CONSTRAINT "SReview_Restaurant_Review_Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Comment_Like" ADD CONSTRAINT "SReview_Comment_Like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "SReview_Comment"("commentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Comment_Like" ADD CONSTRAINT "SReview_Comment_Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SReview_Suggestion" ADD CONSTRAINT "SReview_Suggestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Setting" ADD CONSTRAINT "Question_Setting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Tag" ADD CONSTRAINT "Question_Tag_qId_fkey" FOREIGN KEY ("qId") REFERENCES "Question"("qId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Tag" ADD CONSTRAINT "Question_Tag_tagKey_fkey" FOREIGN KEY ("tagKey") REFERENCES "Question_Default_Tag"("tagKey") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Embed_File" ADD CONSTRAINT "Question_Embed_File_qId_fkey" FOREIGN KEY ("qId") REFERENCES "Question"("qId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Comment" ADD CONSTRAINT "Question_Comment_qId_fkey" FOREIGN KEY ("qId") REFERENCES "Question"("qId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Comment" ADD CONSTRAINT "Question_Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Answer" ADD CONSTRAINT "Question_Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Answer" ADD CONSTRAINT "Question_Answer_qId_fkey" FOREIGN KEY ("qId") REFERENCES "Question"("qId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Answer_Embed_File" ADD CONSTRAINT "Question_Answer_Embed_File_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Question_Answer"("answerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Answer_Comment" ADD CONSTRAINT "Question_Answer_Comment_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Question_Answer"("answerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Answer_Comment" ADD CONSTRAINT "Question_Answer_Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Modvote" ADD CONSTRAINT "Question_Modvote_qId_fkey" FOREIGN KEY ("qId") REFERENCES "Question"("qId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question_Modvote" ADD CONSTRAINT "Question_Modvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink_Quota" ADD CONSTRAINT "ShortLink_Quota_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink" ADD CONSTRAINT "ShortLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink_Permission" ADD CONSTRAINT "ShortLink_Permission_slId_fkey" FOREIGN KEY ("slId") REFERENCES "ShortLink"("slId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink_Permission_User" ADD CONSTRAINT "ShortLink_Permission_User_slId_fkey" FOREIGN KEY ("slId") REFERENCES "ShortLink"("slId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink_Permission_User" ADD CONSTRAINT "ShortLink_Permission_User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink_Permission_Major" ADD CONSTRAINT "ShortLink_Permission_Major_slId_fkey" FOREIGN KEY ("slId") REFERENCES "ShortLink"("slId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink_Permission_Major" ADD CONSTRAINT "ShortLink_Permission_Major_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("majorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink_Permission_Faculty" ADD CONSTRAINT "ShortLink_Permission_Faculty_slId_fkey" FOREIGN KEY ("slId") REFERENCES "ShortLink"("slId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink_Permission_Faculty" ADD CONSTRAINT "ShortLink_Permission_Faculty_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("facultyId") ON DELETE CASCADE ON UPDATE CASCADE;
