/*
  Warnings:

  - You are about to drop the column `puuid` on the `Lolpro` table. All the data in the column will be lost.
  - You are about to drop the column `lolproId` on the `ProMatches` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProMatches" DROP CONSTRAINT "ProMatches_lolproId_fkey";

-- AlterTable
ALTER TABLE "Lolpro" DROP COLUMN "puuid";

-- AlterTable
ALTER TABLE "ProMatches" DROP COLUMN "lolproId",
ADD COLUMN     "proAccountsId" TEXT;

-- CreateTable
CREATE TABLE "ProAccounts" (
    "id" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "lolproId" TEXT,

    CONSTRAINT "ProAccounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProAccounts" ADD CONSTRAINT "ProAccounts_lolproId_fkey" FOREIGN KEY ("lolproId") REFERENCES "Lolpro"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProMatches" ADD CONSTRAINT "ProMatches_proAccountsId_fkey" FOREIGN KEY ("proAccountsId") REFERENCES "ProAccounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
