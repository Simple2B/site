/*
  Warnings:

  - Made the column `userId` on table `Results` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_userId_fkey";

-- AlterTable
ALTER TABLE "Results" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
