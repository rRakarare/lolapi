/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ProAccounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProAccounts_name_key" ON "ProAccounts"("name");
