import {
	Injectable,
	NotFoundException,
	BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import type { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
	constructor(private readonly prisma: PrismaService) { }

	async create(
		organizationId: string,
		createProjectDto: CreateProjectDto,
	) {
		const {
			ownerId,
			categoryId,
			members,
			startDate,
			endDate,
			...projectData
		} = createProjectDto;

		// Verify owner belongs to the organization
		const owner = await this.prisma.user.findFirst({
			where: {
				id: ownerId,
				organizationId,
				deletedAt: null,
			},
		});

		if (!owner) {
			throw new BadRequestException(
				'Project owner does not belong to this organization',
			);
		}

		// Verify category belongs to the organization
		if (categoryId) {
			const category = await this.prisma.projectCategory.findFirst({
				where: {
					id: categoryId,
					organizationId,
					isActive: true,
				},
			});

			if (!category) {
				throw new BadRequestException(
					'Project category does not belong to this organization',
				);
			}
		}

		return this.prisma.project.create({
			data: {
				...projectData,

				organizationId,
				ownerId,
				categoryId,

				startDate: startDate
					? new Date(startDate)
					: null,

				endDate: endDate
					? new Date(endDate)
					: null,

				members: members?.length
					? {
						create: members.map((userId) => ({
							userId,
						})),
					}
					: undefined,
			},

			include: {
				owner: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
					},
				},

				category: true,

				members: {
					include: {
						user: {
							select: {
								id: true,
								firstName: true,
								lastName: true,
								email: true,
							},
						},
					},
				},
			},
		});
	}

	async findAll(organizationId: string) {
		return this.prisma.project.findMany({
			where: {
				organizationId,
				deletedAt: null,
			},
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				owner: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
					},
				},
				category: true,
				members: {
					include: {
						user: {
							select: {
								id: true,
								firstName: true,
								lastName: true,
								email: true,
							},
						},
					},
				},
				_count: {
					select: {
						members: true,
						tasks: true,
					},
				},
			},
		});
	}

	async findOne(
		organizationId: string,
		id: string,
	) {
		const project = await this.prisma.project.findFirst({
			where: {
				id,
				organizationId,
				deletedAt: null,
			},
			include: {
				owner: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
					},
				},
				category: true,
				members: {
					include: {
						user: {
							select: {
								id: true,
								firstName: true,
								lastName: true,
								email: true,
							},
						},
					},
				},
				tasks: true,
			},
		});

		if (!project) {
			throw new NotFoundException('Project not found');
		}

		return project;
	}

	async update(
		organizationId: string,
		id: string,
		updateProjectDto: UpdateProjectDto,
	) {
		// Make sure project belongs to organization
		const existingProject = await this.prisma.project.findFirst({
			where: {
				id,
				organizationId,
				deletedAt: null,
			},
		});

		if (!existingProject) {
			throw new NotFoundException('Project not found');
		}

		const {
			ownerId,
			categoryId,
			members,
			startDate,
			endDate,
			...projectData
		} = updateProjectDto;

		// Validate new owner
		if (ownerId) {
			const owner = await this.prisma.user.findFirst({
				where: {
					id: ownerId,
					organizationId,
					deletedAt: null,
				},
			});

			if (!owner) {
				throw new BadRequestException(
					'Project owner does not belong to this organization',
				);
			}
		}

		// Validate new category
		if (categoryId) {
			const category = await this.prisma.projectCategory.findFirst({
				where: {
					id: categoryId,
					organizationId,
					isActive: true,
				},
			});

			if (!category) {
				throw new BadRequestException(
					'Project category does not belong to this organization',
				);
			}
		}

		return this.prisma.project.update({
			where: {
				id,
			},

			data: {
				...projectData,

				...(ownerId !== undefined && {
					ownerId,
				}),

				...(categoryId !== undefined && {
					categoryId,
				}),

				...(startDate !== undefined && {
					startDate: startDate
						? new Date(startDate)
						: null,
				}),

				...(endDate !== undefined && {
					endDate: endDate
						? new Date(endDate)
						: null,
				}),
			},

			include: {
				owner: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
					},
				},

				category: true,

				members: {
					include: {
						user: {
							select: {
								id: true,
								firstName: true,
								lastName: true,
								email: true,
							},
						},
					},
				},
			},
		});
	}

	async remove(
		organizationId: string,
		id: string,
	) {
		const project = await this.prisma.project.findFirst({
			where: {
				id,
				organizationId,
				deletedAt: null,
			},
		});

		if (!project) {
			throw new NotFoundException('Project not found');
		}

		// Soft delete
		return this.prisma.project.update({
			where: {
				id,
			},
			data: {
				deletedAt: new Date(),
			},
		});
	}

	async archive(
		organizationId: string,
		id: string,
	) {
		const project = await this.prisma.project.findFirst({
			where: {
				id,
				organizationId,
				deletedAt: null,
			},
		});

		if (!project) {
			throw new NotFoundException('Project not found');
		}

		return this.prisma.project.update({
			where: {
				id,
			},
			data: {
				archived: true,
			},
		});
	}

	async unarchive(
		organizationId: string,
		id: string,
	) {
		const project = await this.prisma.project.findFirst({
			where: {
				id,
				organizationId,
				deletedAt: null,
			},
		});

		if (!project) {
			throw new NotFoundException('Project not found');
		}

		return this.prisma.project.update({
			where: {
				id,
			},
			data: {
				archived: false,
			},
		});
	}
}