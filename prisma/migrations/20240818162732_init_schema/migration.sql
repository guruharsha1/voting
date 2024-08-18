-- CreateTable
CREATE TABLE "Contestant" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Votes" INTEGER NOT NULL,

    CONSTRAINT "Contestant_pkey" PRIMARY KEY ("id")
);
