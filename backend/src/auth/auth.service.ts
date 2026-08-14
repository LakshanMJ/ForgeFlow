import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import type { SignOptions } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  private async generateTokens(
    userId: string,
    organizationId: string,
    email: string,
  ) {
    const payload = {
      sub: userId,
      organizationId,
      email,
    };

    const accessOptions: SignOptions = {
      expiresIn: '15m',
    };

    const refreshOptions: SignOptions = {
      expiresIn: '7d',
    };

    const accessToken = await this.jwtService.signAsync(
      payload,
      {
        secret: process.env.JWT_SECRET!,
        ...accessOptions,
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      payload,
      {
        secret: process.env.JWT_REFRESH_SECRET!,
        ...refreshOptions,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  private async saveRefreshToken(
    userId: string,
    refreshToken: string,
  ) {
    const tokenHash = await bcrypt.hash(refreshToken, 12);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });
  }

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existingUser) {
      throw new ConflictException(
        'Email already registered',
      );
    }

    const passwordHash = await bcrypt.hash(
      dto.password,
      12,
    );

    const result = await this.prisma.$transaction(
      async (tx) => {

        const organization =
          await tx.organization.create({
            data: {
              name: dto.organizationName,
              slug: dto.organizationName
                .toLowerCase()
                .replace(/\s+/g, '-'),
            },
          });


        const user =
          await tx.user.create({
            data: {
              firstName: dto.firstName,
              lastName: dto.lastName,
              email: dto.email,
              passwordHash,
              organizationId: organization.id,
            },
          });


        const ownerRole =
          await tx.role.findUnique({
            where: {
              name: 'OWNER',
            },
          });


        if (!ownerRole) {
          throw new Error(
            'OWNER role missing',
          );
        }


        await tx.userRole.create({
          data: {
            userId: user.id,
            roleId: ownerRole.id,
          },
        });


        return {
          user,
          organization,
        };
      },
    );


    const accessToken =
      this.jwtService.sign({
        sub: result.user.id,
        organizationId:
          result.organization.id,
      });


    return {
      accessToken,
      user: {
        id: result.user.id,
        email: result.user.email,
        name:
          `${result.user.firstName} ${result.user.lastName}`,
      },
      organization:
        result.organization,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      include: {
        organization: true,
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(
      user.id,
      user.organizationId,
      user.email,
    );

    await this.saveRefreshToken(
      user.id,
      tokens.refreshToken,
    );

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        organization: user.organization.name,
        roles: user.userRoles.map((r) => r.role.name),
      },
    };
  }

  async logout(refreshToken: string) {

    const tokens = await this.prisma.refreshToken.findMany({
      where: {
        revokedAt: null,
      },
    });

    for (const token of tokens) {

      const matches = await bcrypt.compare(
        refreshToken,
        token.tokenHash,
      );

      if (matches) {

        await this.prisma.refreshToken.update({
          where: {
            id: token.id,
          },
          data: {
            revokedAt: new Date(),
          },
        });

        return {
          message: 'Logged out successfully',
        };
      }
    }

    return {
      message: 'Already logged out',
    };
  }
}