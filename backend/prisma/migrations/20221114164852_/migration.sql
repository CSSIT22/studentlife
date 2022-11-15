-- DropForeignKey
ALTER TABLE "Login_Info" DROP CONSTRAINT "Login_Info_userId_token_fkey";

-- DropForeignKey
ALTER TABLE "Logout_Info" DROP CONSTRAINT "Logout_Info_userId_token_fkey";

-- AddForeignKey
ALTER TABLE "Login_Info" ADD CONSTRAINT "Login_Info_userId_token_fkey" FOREIGN KEY ("userId", "token") REFERENCES "User_Back"("userId", "token") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logout_Info" ADD CONSTRAINT "Logout_Info_userId_token_fkey" FOREIGN KEY ("userId", "token") REFERENCES "User_Back"("userId", "token") ON DELETE RESTRICT ON UPDATE CASCADE;
