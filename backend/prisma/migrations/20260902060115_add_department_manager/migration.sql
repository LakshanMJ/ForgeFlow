-- AlterTable
ALTER TABLE "departments" ADD COLUMN     "managerId" TEXT;

-- CreateIndex
CREATE INDEX "departments_managerId_idx" ON "departments"("managerId");

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
