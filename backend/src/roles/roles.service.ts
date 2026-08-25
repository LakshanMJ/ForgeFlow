import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll(organizationId: string) {
    return this.prisma.role.findMany({
      where: {
        organizationId,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(
    organizationId: string,
    id: string,
  ) {
    const role = await this.prisma.role.findFirst({
      where: {
        id,
        organizationId,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async create(
    organizationId: string,
    dto: CreateRoleDto,
  ) {
    const existingRole =
      await this.prisma.role.findFirst({
        where: {
          organizationId,
          name: dto.name,
        },
      });

    if (existingRole) {
      throw new ConflictException(
        'A role with this name already exists in your organization',
      );
    }

    return this.prisma.role.create({
      data: {
        organizationId,
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async update(
    organizationId: string,
    id: string,
    dto: UpdateRoleDto,
  ) {
    await this.findOne(
      organizationId,
      id,
    );

    if (dto.name) {
      const existingRole =
        await this.prisma.role.findFirst({
          where: {
            organizationId,
            name: dto.name,
            NOT: {
              id,
            },
          },
        });

      if (existingRole) {
        throw new ConflictException(
          'A role with this name already exists in your organization',
        );
      }
    }

    return this.prisma.role.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async remove(
    organizationId: string,
    id: string,
  ) {
    await this.findOne(
      organizationId,
      id,
    );

    return this.prisma.role.delete({
      where: {
        id,
      },
    });
  }
}