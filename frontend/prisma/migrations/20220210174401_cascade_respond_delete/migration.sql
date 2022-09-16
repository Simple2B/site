-- DropForeignKey
ALTER TABLE "Respond" DROP CONSTRAINT "Respond_userId_fkey";

-- AddForeignKey
ALTER TABLE "Respond" ADD CONSTRAINT "Respond_userId_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
