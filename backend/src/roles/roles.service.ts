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
	) { }

	// async findAll(organizationId: string) {
	//   return this.prisma.role.findMany({
	//     where: {
	//       organizationId,
	//     },
	//     orderBy: {
	//       name: 'asc',
	//     },
	//   });
	// }

	async findAll(organizationId: string) {
		return this.prisma.role.findMany({
			where: {
				organizationId,
			},

			orderBy: [
				{
					isSystem: 'desc',
				},
				{
					createdAt: 'desc',
				},
			],

			include: {
				_count: {
					select: {
						userRoles: true,
						rolePermissions: true,
					},
				},
				rolePermissions: {
					include: {
						permission: true, // Include the full permission object if needed
					},
				},
				userRoles: {
					include: {
						user: {
							select: {
								id: true,
								firstName: true,
								lastName: true,
								department: true,
								email: true,
							},
						},
					},
				},
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

		const name = dto.displayName
			.trim()
			.toUpperCase()
			.replace(/\s+/g, '_');

		// Check duplicate using the normalized name
		const existingRole =
			await this.prisma.role.findFirst({
				where: {
					organizationId,
					name,
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
				name,
				displayName: dto.displayName.trim(),
				description: dto.description?.trim() || null,

				// Create RolePermission records
				rolePermissions: {
					create: dto.permissionIds.map(
						(permissionId) => ({
							permissionId,
						}),
					),
				},

				// Create UserRole records
				userRoles: {
					create: dto.userIds.map(
						(userId) => ({
							userId,
						}),
					),
				},
			},

			// Return the relationships too
			include: {
				rolePermissions: {
					include: {
						permission: true,
					},
				},
				userRoles: {
					include: {
						user: true,
					},
				},
			},
		});
	}

	async update(
		organizationId: string,
		id: string,
		dto: UpdateRoleDto,
	) {
		await this.findOne(organizationId, id);

		if (dto.name) {
			const existingRole = await this.prisma.role.findFirst({
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
				displayName: dto.displayName,
				description: dto.description,

				...(dto.permissionIds && {
					rolePermissions: {
						deleteMany: {},
						create: dto.permissionIds.map((permissionId) => ({
							permissionId,
						})),
					},
				}),
			},
			include: {
				rolePermissions: {
					include: {
						permission: true,
					},
				},
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