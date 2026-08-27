import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import type { JwtUser } from '../auth/interfaces/jwt-user.interface';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) { }

  @Post()
  @Roles('OWNER')
  createUser(
    @Body() dto: CreateUserDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.usersService.createUser(
      dto,
      user.organizationId,
    );
  }

  @Get()
  async getUsers(
    @CurrentUser() user: JwtUser,
  ) {
    return this.usersService.getUsers(
      user.organizationId,
      user.userId,
    );
  }
}