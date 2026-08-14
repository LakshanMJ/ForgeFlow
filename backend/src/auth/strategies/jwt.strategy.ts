import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtUser } from '../interfaces/jwt-user.interface';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: JwtPayload) {

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    return {
      userId: payload.sub,
      organizationId: payload.organizationId,
      email: payload.email,
      roles: user?.userRoles.map(
        ur => ur.role.name,
      ) ?? [],
    };
  }
}