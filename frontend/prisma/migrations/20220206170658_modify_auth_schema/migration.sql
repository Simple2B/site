/*
  Warnings:

  - You are about to drop the column `idToken` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "idToken",
ADD COLUMN     "id_token" TEXT;
