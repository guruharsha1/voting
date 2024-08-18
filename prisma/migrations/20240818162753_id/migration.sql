/*
  Warnings:

  - The primary key for the `Contestant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Contestant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contestant" DROP CONSTRAINT "Contestant_pkey",
DROP COLUMN "id",
ADD COLUMN     "Id" SERIAL NOT NULL,
ADD CONSTRAINT "Contestant_pkey" PRIMARY KEY ("Id");
