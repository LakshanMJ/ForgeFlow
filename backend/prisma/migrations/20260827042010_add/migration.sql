/*
  Warnings:

  - Added the required column `displayName` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "displayName" TEXT NOT NULL;
