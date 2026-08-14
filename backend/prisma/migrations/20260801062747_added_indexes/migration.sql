/*
  Warnings:

  - You are about to alter the column `slug` on the `organizations` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "organizations" ALTER COLUMN "slug" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "position" SET DEFAULT 0,
ALTER COLUMN "position" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE INDEX "tasks_status_idx" ON "tasks"("status");

-- CreateIndex
CREATE INDEX "tasks_priority_idx" ON "tasks"("priority");
