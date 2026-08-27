import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';

import { PermissionsService } from './permissions.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('permissions')
@UseGuards(JwtAuthGuard)
export class PermissionsController {
  constructor(
    private readonly permissionsService: PermissionsService,
  ) {}

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.permissionsService.findOne(id);
  }
}