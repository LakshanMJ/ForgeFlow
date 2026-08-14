import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    dto: CreateUserDto,
    organizationId: string,
  ) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException(
        'A user with this email already exists',
      );
    }

    const role = await this.prisma.role.findUnique({
      where: {
        name: dto.role,
      },
    });

    if (!role) {
      throw new NotFoundException(
        `Role '${dto.role}' does not exist`,
      );
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        organizationId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        passwordHash,
        jobTitle: dto.jobTitle,

        userRoles: {
          create: {
            roleId: role.id,
          },
        },
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
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      jobTitle: user.jobTitle,
      organizationId: user.organizationId,
      roles: user.userRoles.map(
        (userRole) => userRole.role.name,
      ),
    };
  }
}