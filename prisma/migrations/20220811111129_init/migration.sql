/*
  Warnings:

  - Added the required column `name` to the `ProAccounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProAccounts" ADD COLUMN     "name" TEXT NOT NULL;
