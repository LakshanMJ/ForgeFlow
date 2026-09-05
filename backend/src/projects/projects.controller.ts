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

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import type { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
	constructor(
		private readonly projectsService: ProjectsService,
	) { }

	@Get()
	findAll(@CurrentUser() user: JwtUser) {
		return this.projectsService.findAll(user.organizationId);
	}

	@Get(':id')
	findOne(
		@CurrentUser() user: JwtUser,
		@Param('id') id: string,
	) {
		return this.projectsService.findOne(
			user.organizationId,
			id,
		);
	}

	@Post()
	@Roles('OWNER', 'ADMIN')
	create(
		@CurrentUser() user: JwtUser,
		@Body() createProjectDto: CreateProjectDto,
	) {
		return this.projectsService.create(
			user.organizationId,
			createProjectDto,
		);
	}

	@Patch(':id')
	@Roles('OWNER', 'ADMIN')
	update(
		@CurrentUser() user: JwtUser,
		@Param('id') id: string,
		@Body() updateProjectDto: UpdateProjectDto,
	) {
		return this.projectsService.update(
			user.organizationId,
			id,
			updateProjectDto,
		);
	}

	@Delete(':id')
	@Roles('OWNER', 'ADMIN')
	remove(
		@CurrentUser() user: JwtUser,
		@Param('id') id: string,
	) {
		return this.projectsService.remove(
			user.organizationId,
			id,
		);
	}

	@Patch(':id/archive')
	@Roles('OWNER', 'ADMIN')
	archive(
		@CurrentUser() user: JwtUser,
		@Param('id') id: string,
	) {
		return this.projectsService.archive(
			user.organizationId,
			id,
		);
	}

	@Patch(':id/unarchive')
	@Roles('OWNER', 'ADMIN')
	unarchive(
		@CurrentUser() user: JwtUser,
		@Param('id') id: string,
	) {
		return this.projectsService.unarchive(
			user.organizationId,
			id,
		);
	}
}