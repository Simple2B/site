-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_attemptId_fkey";

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Attempt"("id") ON DELETE SET NULL ON UPDATE CASCADE;
