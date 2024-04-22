-- CreateTable
CREATE TABLE "user_rating" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "message_id" UUID NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_rating_pkey" PRIMARY KEY ("id")
);
