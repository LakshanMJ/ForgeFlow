import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { CreateProjectCategoryDto } from './dto/create-project-category.dto';
import { UpdateProjectCategoryDto } from './dto/update-project-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectCategoriesService {
    constructor(private readonly prisma: PrismaService) {}

    async create(
        organizationId: string,
        dto: CreateProjectCategoryDto,
    ) {
        const existing = await this.prisma.projectCategory.findUnique({
            where: {
                organizationId_name: {
                    organizationId,
                    name: dto.name,
                },
            },
        });

        if (existing) {
            throw new ConflictException(
                'A project category with this name already exists',
            );
        }

        return this.prisma.projectCategory.create({
            data: {
                organizationId,
                name: dto.name,
                description: dto.description,
                color: dto.color,
                isActive: dto.isActive ?? true,
            },
        });
    }

    async findAll(organizationId: string) {
        return this.prisma.projectCategory.findMany({
            where: {
                organizationId,
            },
            orderBy: {
                name: 'asc',
            },
        });
    }

    async findActive(organizationId: string) {
        return this.prisma.projectCategory.findMany({
            where: {
                organizationId,
                isActive: true,
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
        const category = await this.prisma.projectCategory.findFirst({
            where: {
                id,
                organizationId,
            },
        });

        if (!category) {
            throw new NotFoundException('Project category not found');
        }

        return category;
    }

    async update(
        organizationId: string,
        id: string,
        dto: UpdateProjectCategoryDto,
    ) {
        await this.findOne(organizationId, id);

        if (dto.name) {
            const existing = await this.prisma.projectCategory.findFirst({
                where: {
                    organizationId,
                    name: dto.name,
                    NOT: {
                        id,
                    },
                },
            });

            if (existing) {
                throw new ConflictException(
                    'A project category with this name already exists',
                );
            }
        }

        return this.prisma.projectCategory.update({
            where: {
                id,
            },
            data: dto,
        });
    }

    async remove(
        organizationId: string,
        id: string,
    ) {
        const category = await this.findOne(
            organizationId,
            id,
        );

        return this.prisma.projectCategory.delete({
            where: {
                id,
            },
        });
    }
}