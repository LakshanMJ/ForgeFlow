import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';

import { ProjectCategoriesService } from './project-categories.service';
import { CreateProjectCategoryDto } from './dto/create-project-category.dto';
import { UpdateProjectCategoryDto } from './dto/update-project-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { JwtUser } from 'src/auth/interfaces/jwt-user.interface';
import { Roles } from 'src/auth/decorators/roles.decorator';


@Controller('project-categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectCategoriesController {

    constructor(
        private readonly projectCategoriesService: ProjectCategoriesService,
    ) {}

    // Any authenticated user can view project categories
    @Get()
    findAll(
        @CurrentUser() user: JwtUser,
    ) {
        return this.projectCategoriesService.findAll(
            user.organizationId,
        );
    }

    // Any authenticated user can view active project categories
    @Get('active')
    findActive(
        @CurrentUser() user: JwtUser,
    ) {
        return this.projectCategoriesService.findActive(
            user.organizationId,
        );
    }

    // Any authenticated user can view a project category
    @Get(':id')
    findOne(
        @CurrentUser() user: JwtUser,
        @Param('id') id: string,
    ) {
        return this.projectCategoriesService.findOne(
            user.organizationId,
            id,
        );
    }

    // Only OWNER and ADMIN can create project categories
    @Post()
    @Roles('OWNER', 'ADMIN')
    create(
        @CurrentUser() user: JwtUser,
        @Body() createProjectCategoryDto: CreateProjectCategoryDto,
    ) {
        return this.projectCategoriesService.create(
            user.organizationId,
            createProjectCategoryDto,
        );
    }

    // Only OWNER and ADMIN can update project categories
    @Patch(':id')
    @Roles('OWNER', 'ADMIN')
    update(
        @CurrentUser() user: JwtUser,
        @Param('id') id: string,
        @Body() updateProjectCategoryDto: UpdateProjectCategoryDto,
    ) {
        return this.projectCategoriesService.update(
            user.organizationId,
            id,
            updateProjectCategoryDto,
        );
    }

    // Only OWNER can delete project categories
    @Delete(':id')
    @Roles('OWNER')
    remove(
        @CurrentUser() user: JwtUser,
        @Param('id') id: string,
    ) {
        return this.projectCategoriesService.remove(
            user.organizationId,
            id,
        );
    }
}
