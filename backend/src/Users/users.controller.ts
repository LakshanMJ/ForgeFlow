// import {
//   Body,
//   Controller,
//   Get,
//   Post,
//   UseGuards,
// } from '@nestjs/common';

// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';

// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../auth/decorators/roles.decorator';
// import { CurrentUser } from '../auth/decorators/current-user.decorator';

// import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
// import { InviteUserDto } from './dto/invite-user.dto';

// @Controller('users')
// @UseGuards(JwtAuthGuard, RolesGuard)
// export class UsersController {
//   constructor(
//     private usersService: UsersService,
//   ) { }

//   @Post()
//   @Roles('OWNER')
//   createUser(
//     @Body() dto: CreateUserDto,
//     @CurrentUser() user: JwtUser,
//   ) {
//     return this.usersService.createUser(
//       dto,
//       user.organizationId,
//     );
//   }

//   @Post('invite')
//   @Roles('OWNER')
//   inviteUser(
//     @Body() dto: InviteUserDto,
//     @CurrentUser() user: JwtUser,
//   ) {
//     console.log('🔥 CONTROLLER DTO:', dto);
//     console.log('🔥 CONTROLLER TYPE:', typeof dto);

//     return this.usersService.inviteUser(
//       dto,
//       user.organizationId,
//     );
//   }

//   // @Post('invite')
//   // @Roles('OWNER')
//   // inviteUser(
//   //   @Body() dto: any,
//   //   @CurrentUser() user: JwtUser,
//   // ) {
//   //   console.log('🔥 RAW BODY:', dto);
//   //   console.log('🔥 TYPE:', typeof dto);

//   //   return this.usersService.inviteUser(
//   //     dto,
//   //     user.organizationId,
//   //   );
//   // }

//   @Get()
//   async getUsers(
//     @CurrentUser() user: JwtUser,
//   ) {
//     return this.usersService.getUsers(
//       user.organizationId,
//       user.userId,
//     );
//   }
// }


import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { AcceptInviteDto } from './dto/accept-invite.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import type { JwtUser } from '../auth/interfaces/jwt-user.interface';

@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService,
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @Post('invite')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  inviteUser(
    @Body() dto: InviteUserDto,
    @CurrentUser() user: JwtUser,
  ) {
    console.log('DTO IN CONTROLLER:', dto);
    return this.usersService.inviteUser(
      dto,
      user.organizationId,
    );
  }

  @Post('accept-invite')
  acceptInvite(
    @Body() dto: AcceptInviteDto,
  ) {
    return this.usersService.acceptInvite(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUsers(
    @CurrentUser() user: JwtUser,
  ) {
    return this.usersService.getUsers(
      user.organizationId,
      user.userId,
    );
  }
}
