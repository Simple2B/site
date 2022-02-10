-- CreateTable
CREATE TABLE "Respond" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "vacancy_id" INTEGER NOT NULL,

    CONSTRAINT "Respond_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Respond" ADD CONSTRAINT "Respond_userId_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
