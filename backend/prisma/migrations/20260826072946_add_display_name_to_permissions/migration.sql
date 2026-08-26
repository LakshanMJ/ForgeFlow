/*
  Warnings:

  - Added the required column `displayName` to the `permissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "permissions" ADD COLUMN     "displayName" TEXT NOT NULL;
