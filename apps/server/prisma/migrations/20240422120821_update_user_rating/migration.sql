/*
  Warnings:

  - The primary key for the `user_rating` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "user_rating" DROP CONSTRAINT "user_rating_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_rating_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_rating_id_seq";
