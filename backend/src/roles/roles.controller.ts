// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
//   UseGuards,
// } from '@nestjs/common';

// import { RolesService } from './roles.service';
// import { CreateRoleDto } from './dto/create-role.dto';
// import { UpdateRoleDto } from './dto/update-role.dto';

// import { CurrentUser } from '../auth/decorators/current-user.decorator';
// import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// @Controller('roles')
// @UseGuards(JwtAuthGuard)
// export class RolesController {
//   constructor(
//     private readonly rolesService: RolesService,
//   ) {}

//   @Get()
//   findAll(
//     @CurrentUser() user: JwtUser,
//   ) {
//     return this.rolesService.findAll(
//       user.organizationId,
//     );
//   }

//   @Get(':id')
//   findOne(
//     @CurrentUser() user: JwtUser,
//     @Param('id') id: string,
//   ) {
//     return this.rolesService.findOne(
//       user.organizationId,
//       id,
//     );
//   }

//   @Post()
//   create(
//     @CurrentUser() user: JwtUser,
//     @Body() createRoleDto: CreateRoleDto,
//   ) {
//     return this.rolesService.create(
//       user.organizationId,
//       createRoleDto,
//     );
//   }

//   @Patch(':id')
//   update(
//     @CurrentUser() user: JwtUser,
//     @Param('id') id: string,
//     @Body() updateRoleDto: UpdateRoleDto,
//   ) {
//     return this.rolesService.update(
//       user.organizationId,
//       id,
//       updateRoleDto,
//     );
//   }

//   @Delete(':id')
//   remove(
//     @CurrentUser() user: JwtUser,
//     @Param('id') id: string,
//   ) {
//     return this.rolesService.remove(
//       user.organizationId,
//       id,
//     );
//   }
// }

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

import { RolesService } from './roles.service';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import type { JwtUser } from '../auth/interfaces/jwt-user.interface';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
  ) {}

  // Any authenticated user can view roles
  @Get()
  findAll(
    @CurrentUser() user: JwtUser,
  ) {
    return this.rolesService.findAll(
      user.organizationId,
    );
  }

  // Any authenticated user can view a role
  @Get(':id')
  findOne(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
  ) {
    return this.rolesService.findOne(
      user.organizationId,
      id,
    );
  }

  // Only OWNER and ADMIN can create roles
  @Post()
  @Roles('OWNER', 'ADMIN')
  create(
    @CurrentUser() user: JwtUser,
    @Body() createRoleDto: CreateRoleDto,
  ) {
    return this.rolesService.create(
      user.organizationId,
      createRoleDto,
    );
  }

  // Only OWNER and ADMIN can update roles
  @Patch(':id')
  @Roles('OWNER', 'ADMIN')
  update(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.update(
      user.organizationId,
      id,
      updateRoleDto,
    );
  }

  // Only OWNER can delete roles
  @Delete(':id')
  @Roles('OWNER')
  remove(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
  ) {
    return this.rolesService.remove(
      user.organizationId,
      id,
    );
  }
}