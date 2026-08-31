import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { JwtUser } from './interfaces/jwt-user.interface';
import { LogoutDto } from './dto/logout.dto';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { RefreshDto } from './dto/refresh.dto';
import { AcceptInviteDto } from 'src/users/dto/accept-invite.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @Post('register')
  register(
    @Body() dto: RegisterDto,
  ) {
    return this.authService.register(dto);
  }

  @Post('accept-invite')
  acceptInvite(
    @Body() dto: AcceptInviteDto,
  ) {
    return this.authService.acceptInvite(dto);
  }
  
  @Post('login')
  login(
    @Body() dto: LoginDto,
  ) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto.refreshToken);
  }

  @Post('logout')
  logout(
    @Body() dto: LogoutDto,
  ) {
    return this.authService.logout(
      dto.refreshToken,
    );
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(
    @CurrentUser() user: JwtUser,
  ) {
    return user;
  }

  @Get('owner-test')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('OWNER')
  ownerTest() {
    return {
      message: 'Owner access granted',
    };
  } 
}