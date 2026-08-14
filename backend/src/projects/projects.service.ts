import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';


@Injectable()
export class ProjectsService {

  constructor(
    private prisma: PrismaService,
  ) {}


  async create(
    dto: CreateProjectDto,
    organizationId: string,
    userId: string,
  ) {

    return this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        color: dto.color,

        organizationId,
        ownerId: userId,
      },
    });
  }
}