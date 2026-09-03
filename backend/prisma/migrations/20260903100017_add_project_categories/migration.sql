-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "categoryId" TEXT;

-- CreateTable
CREATE TABLE "project_categories" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "project_categories_organizationId_idx" ON "project_categories"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "project_categories_organizationId_name_key" ON "project_categories"("organizationId", "name");

-- CreateIndex
CREATE INDEX "projects_categoryId_idx" ON "projects"("categoryId");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "project_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_categories" ADD CONSTRAINT "project_categories_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
