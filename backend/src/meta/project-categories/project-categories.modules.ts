import { Module } from '@nestjs/common';

import { ProjectCategoriesController } from './project-categories.controller';
import { ProjectCategoriesService } from './project-categories.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ProjectCategoriesController],
    providers: [ProjectCategoriesService],
    exports: [ProjectCategoriesService],
})
export class ProjectCategoriesModule {}