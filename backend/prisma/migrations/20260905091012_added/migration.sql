/*
  Warnings:

  - The `color` column on the `projects` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProjectColor" AS ENUM ('STEEL', 'EMBER', 'PATINA', 'GOLD', 'VIOLET');

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "color",
ADD COLUMN     "color" "ProjectColor";
