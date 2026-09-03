import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';

import { ProjectCategoriesService } from './project-categories.service';
import { CreateProjectCategoryDto } from './dto/create-project-category.dto';
import { UpdateProjectCategoryDto } from './dto/update-project-category.dto';

@Controller('project-categories')
export class ProjectCategoriesController {
    constructor(
        private readonly projectCategoriesService: ProjectCategoriesService,
    ) {}

    @Get()
    findAll() {
        const organizationId = 'YOUR_ORGANIZATION_ID';

        return this.projectCategoriesService.findAll(
            organizationId,
        );
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        const organizationId = 'YOUR_ORGANIZATION_ID';

        return this.projectCategoriesService.findOne(
            id,
            organizationId,
        );
    }

    @Post()
    create(@Body() dto: CreateProjectCategoryDto) {
        const organizationId = 'YOUR_ORGANIZATION_ID';

        return this.projectCategoriesService.create(
            organizationId,
            dto,
        );
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateProjectCategoryDto,
    ) {
        const organizationId = 'YOUR_ORGANIZATION_ID';

        return this.projectCategoriesService.update(
            id,
            organizationId,
            dto,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        const organizationId = 'YOUR_ORGANIZATION_ID';

        return this.projectCategoriesService.remove(
            id,
            organizationId,
        );
    }
}