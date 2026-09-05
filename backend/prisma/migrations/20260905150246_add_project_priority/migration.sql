-- CreateEnum
CREATE TYPE "ProjectPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "priority" "ProjectPriority" NOT NULL DEFAULT 'MEDIUM';
