import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';

import { CreateProjectDto } from './dto/create-project.dto';


@Controller('projects')
export class ProjectsController {

  constructor(
    private projectsService: ProjectsService,
  ) {}


  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() dto: CreateProjectDto,
    @CurrentUser() user: JwtUser,
  ) {

    return this.projectsService.create(
      dto,
      user.organizationId,
      user.userId,
    );
  }
}