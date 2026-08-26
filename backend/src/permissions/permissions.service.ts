import {
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    console.log('inside')
    return this.prisma.permission.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.permission.findUnique({
      where: {
        id,
      },
    });
  }
}