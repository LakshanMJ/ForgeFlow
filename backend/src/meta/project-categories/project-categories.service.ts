import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProjectCategoryDto } from './dto/create-project-category.dto';
import { UpdateProjectCategoryDto } from './dto/update-project-category.dto';

@Injectable()
export class ProjectCategoriesService {
    constructor(private readonly prisma: PrismaService) {}

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

    async findOne(id: string, organizationId: string) {
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
                isSystem: dto.isSystem ?? false,
            },
        });
    }

    async update(
        id: string,
        organizationId: string,
        dto: UpdateProjectCategoryDto,
    ) {
        await this.findOne(id, organizationId);

        if (dto.name) {
            const existing =
                await this.prisma.projectCategory.findFirst({
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
            data: {
                name: dto.name,
                description: dto.description,
                color: dto.color,
                isActive: dto.isActive,
            },
        });
    }

    async remove(id: string, organizationId: string) {
        await this.findOne(id, organizationId);

        return this.prisma.projectCategory.delete({
            where: {
                id,
            },
        });
    }
}