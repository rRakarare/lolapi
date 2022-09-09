/*
  Warnings:

  - A unique constraint covering the columns `[matchId,proAccountsId]` on the table `ProMatches` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProMatches_matchId_proAccountsId_key" ON "ProMatches"("matchId", "proAccountsId");
