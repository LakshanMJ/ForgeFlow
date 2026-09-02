import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import type { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async getDepartments(organizationId: string) {
        return this.prisma.department.findMany({
            where: {
                organizationId,
                isActive: true,
            },
            select: {
                id: true,
                name: true,
                description: true,
                managerId: true,
                openPositions: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,

                manager: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },

                _count: {
                    select: {
                        users: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async createDepartment(
        dto: CreateDepartmentDto,
        organizationId: string,
    ) {
        console.log('CREATE DEPARTMENT DTO:', dto);
        console.log('ORGANIZATION ID:', organizationId);
        const existingDepartment =
            await this.prisma.department.findUnique({
                where: {
                    organizationId_name: {
                        organizationId,
                        name: dto.name,
                    },
                },
            });
        console.log('EXISTING DEPARTMENT:', existingDepartment);
        if (existingDepartment) {
            throw new BadRequestException(
                'A department with this name already exists',
            );
        }

        return this.prisma.department.create({
            data: {
                organizationId,
                name: dto.name,
                description: dto.description,
                managerId: dto.managerId,
                openPositions: dto.openPositions,
            },
        });
    }

    async updateDepartment(
        id: string,
        dto: UpdateDepartmentDto,
        organizationId: string,
    ) {

        const department = await this.prisma.department.findFirst({
            where: {
                id,
                organizationId,
            },
        });

        if (!department) {
            throw new NotFoundException(
                'Department does not exist',
            );
        }

        if (dto.name && dto.name !== department.name) {
            const duplicate = await this.prisma.department.findFirst({
                where: {
                    organizationId,
                    name: dto.name,
                    NOT: {
                        id: id,
                    },
                },
            });

            console.log('DUPLICATE CHECK:', duplicate);

            if (duplicate) {
                throw new BadRequestException(
                    'A department with this name already exists',
                );
            }
        }

        const updatedDepartment =
            await this.prisma.department.update({
                where: {
                    id,
                },
                data: {
                    ...(dto.name !== undefined && {
                        name: dto.name,
                    }),
                    ...(dto.description !== undefined && {
                        description: dto.description,
                    }),
                    ...(dto.managerId !== undefined && {
                        managerId: dto.managerId || null,
                    }),
                    ...(dto.openPositions !== undefined && {
                        openPositions: dto.openPositions,
                    }),
                },
            });

        console.log('UPDATED DEPARTMENT:', updatedDepartment);

        return updatedDepartment;
    }
}