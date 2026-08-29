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
	constructor(private prisma: PrismaService) { }

	// async createUser(
	// 	dto: CreateUserDto,
	// 	organizationId: string,
	// ) {
	// 	const existingUser = await this.prisma.user.findUnique({
	// 		where: {
	// 			email: dto.email,
	// 		},
	// 	});

	// 	if (existingUser) {
	// 		throw new BadRequestException(
	// 			'A user with this email already exists',
	// 		);
	// 	}

	// 	const role = await this.prisma.role.findUnique({
	// 		where: {
	// 			organizationId_name: {
	// 				organizationId,
	// 				name: dto.role,
	// 			},
	// 		},
	// 	});

	// 	if (!role) {
	// 		throw new NotFoundException(
	// 			`Role '${dto.role}' does not exist`,
	// 		);
	// 	}

	// 	const passwordHash = await bcrypt.hash(dto.password, 12);

	// 	const user = await this.prisma.user.create({
	// 		data: {
	// 			organizationId,
	// 			firstName: dto.firstName,
	// 			lastName: dto.lastName,
	// 			email: dto.email,
	// 			passwordHash,
	// 			jobTitle: dto.jobTitle,

	// 			userRoles: {
	// 				create: {
	// 					roleId: role.id,
	// 				},
	// 			},
	// 		},

	// 		include: {
	// 			userRoles: {
	// 				include: {
	// 					role: true,
	// 				},
	// 			},
	// 		},
	// 	});

	// 	return {
	// 		id: user.id,
	// 		email: user.email,
	// 		firstName: user.firstName,
	// 		lastName: user.lastName,
	// 		jobTitle: user.jobTitle,
	// 		organizationId: user.organizationId,
	// 		roles: user.userRoles.map(
	// 			(userRole) => userRole.role.name,
	// 		),
	// 	};
	// }

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

		// Validate role
		if (dto.roleId) {
			const role = await this.prisma.role.findFirst({
				where: {
					id: dto.roleId,
					organizationId,
				},
			});

			if (!role) {
				throw new NotFoundException(
					'Role does not exist',
				);
			}
		}

		// Validate department
		if (dto.departmentId) {
			const department =
				await this.prisma.department.findFirst({
					where: {
						id: dto.departmentId,
						organizationId,
					},
				});

			if (!department) {
				throw new NotFoundException(
					'Department does not exist',
				);
			}
		}

		const passwordHash = await bcrypt.hash(
			dto.password,
			12,
		);

		const user = await this.prisma.user.create({
			data: {
				firstName: dto.firstName,
				lastName: dto.lastName,
				email: dto.email,
				passwordHash,
				jobTitle: dto.jobTitle,

				organization: {
					connect: {
						id: organizationId,
					},
				},

				...(dto.departmentId && {
					department: {
						connect: {
							id: dto.departmentId,
						},
					},
				}),

				...(dto.roleId && {
					userRoles: {
						create: {
							roleId: dto.roleId,
						},
					},
				}),
			},

			include: {
				department: true,

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

			department: user.department
				? {
					id: user.department.id,
					name: user.department.name,
				}
				: null,

			organizationId: user.organizationId,

			roles: user.userRoles.map(
				(userRole) => userRole.role,
			),
		};
	}

	// async createUser(
	// 	dto: CreateUserDto,
	// 	organizationId: string,
	// ) {
	// 	const existingUser = await this.prisma.user.findUnique({
	// 		where: {
	// 			email: dto.email,
	// 		},
	// 	});

	// 	if (existingUser) {
	// 		throw new BadRequestException(
	// 			'A user with this email already exists',
	// 		);
	// 	}

	// 	// Validate role
	// 	if (dto.roleId) {
	// 		const role = await this.prisma.role.findFirst({
	// 			where: {
	// 				id: dto.roleId,
	// 				organizationId,
	// 			},
	// 		});

	// 		if (!role) {
	// 			throw new NotFoundException(
	// 				'Role does not exist',
	// 			);
	// 		}
	// 	}

	// 	// Validate department
	// 	if (dto.departmentId) {
	// 		const department =
	// 			await this.prisma.department.findFirst({
	// 				where: {
	// 					id: dto.departmentId,
	// 					organizationId,
	// 				},
	// 			});

	// 		if (!department) {
	// 			throw new NotFoundException(
	// 				'Department does not exist',
	// 			);
	// 		}
	// 	}

	// 	const passwordHash = await bcrypt.hash(
	// 		dto.password,
	// 		12,
	// 	);

	// 	const user = await this.prisma.user.create({
	// 		data: {
	// 			organizationId,
	// 			firstName: dto.firstName,
	// 			lastName: dto.lastName,
	// 			email: dto.email,
	// 			passwordHash,
	// 			jobTitle: dto.jobTitle,

	// 			...(dto.departmentId && {
	// 				department: {
	// 					connect: {
	// 						id: dto.departmentId,
	// 					},
	// 				},
	// 			}),

	// 			...(dto.roleId && {
	// 				userRoles: {
	// 					create: {
	// 						roleId: dto.roleId,
	// 					},
	// 				},
	// 			}),
	// 		},

	// 		include: {
	// 			department: true,

	// 			userRoles: {
	// 				include: {
	// 					role: true,
	// 				},
	// 			},
	// 		},
	// 	});

	// 	return {
	// 		id: user.id,
	// 		email: user.email,
	// 		firstName: user.firstName,
	// 		lastName: user.lastName,
	// 		jobTitle: user.jobTitle,

	// 		department: user.department
	// 			? {
	// 				id: user.department.id,
	// 				name: user.department.name,
	// 			}
	// 			: null,

	// 		organizationId: user.organizationId,

	// 		roles: user.userRoles.map(
	// 			(userRole) => userRole.role,
	// 		),
	// 	};
	// }

	// async createUser(
	// 	dto: CreateUserDto,
	// 	organizationId: string,
	// ) {
	// 	const existingUser = await this.prisma.user.findUnique({
	// 		where: {
	// 			email: dto.email,
	// 		},
	// 	});

	// 	if (existingUser) {
	// 		throw new BadRequestException(
	// 			'A user with this email already exists',
	// 		);
	// 	}

	// 	let roleId: string | undefined;

	// 	if (dto.role) {
	// 		const role = await this.prisma.role.findUnique({
	// 			where: {
	// 				organizationId_name: {
	// 					organizationId,
	// 					name: dto.role,
	// 				},
	// 			},
	// 		});

	// 		if (!role) {
	// 			throw new NotFoundException(
	// 				`Role '${dto.role}' does not exist`,
	// 			);
	// 		}

	// 		roleId = role.id;
	// 	}

	// 	// Validate department
	// 	if (dto.departmentId) {
	// 		const department =
	// 			await this.prisma.department.findFirst({
	// 				where: {
	// 					id: dto.departmentId,
	// 					organizationId,
	// 				},
	// 			});

	// 		if (!department) {
	// 			throw new NotFoundException(
	// 				'Department does not exist',
	// 			);
	// 		}
	// 	}

	// 	const passwordHash = await bcrypt.hash(
	// 		dto.password,
	// 		12,
	// 	);

	// 	const user = await this.prisma.user.create({
	// 		data: {
	// 			organizationId,
	// 			firstName: dto.firstName,
	// 			lastName: dto.lastName,
	// 			email: dto.email,
	// 			passwordHash,
	// 			jobTitle: dto.jobTitle,

	// 			...(dto.departmentId && {
	// 				department: {
	// 					connect: {
	// 						id: dto.departmentId,
	// 					},
	// 				},
	// 			}),

	// 			...(roleId && {
	// 				userRoles: {
	// 					create: {
	// 						roleId,
	// 					},
	// 				},
	// 			}),
	// 		},

	// 		include: {
	// 			department: true,

	// 			userRoles: {
	// 				include: {
	// 					role: true,
	// 				},
	// 			},
	// 		},
	// 	});

	// 	return {
	// 		id: user.id,
	// 		email: user.email,
	// 		firstName: user.firstName,
	// 		lastName: user.lastName,
	// 		jobTitle: user.jobTitle,

	// 		department: user.department
	// 			? {
	// 				id: user.department.id,
	// 				name: user.department.name,
	// 			}
	// 			: null,

	// 		organizationId: user.organizationId,

	// 		roles: user.userRoles.map(
	// 			(userRole) => userRole.role,
	// 		),
	// 	};
	// }

	// async getUsers(
	// 	organizationId: string,
	// 	currentUserId: string,
	// ) {
	// 	const users = await this.prisma.user.findMany({
	// 		where: {
	// 			organizationId,
	// 			deletedAt: null,
	// 		},

	// 		select: {
	// 			id: true,
	// 			firstName: true,
	// 			lastName: true,
	// 			email: true,
	// 			avatar: true,
	// 			jobTitle: true,
	// 			status: true,

	// 			userRoles: {
	// 				select: {
	// 					role: {
	// 						select: {
	// 							id: true,
	// 							name: true,
	// 							displayName: true,
	// 						},
	// 					},
	// 				},
	// 			},
	// 		},

	// 		orderBy: [
	// 			{
	// 				firstName: 'asc',
	// 			},
	// 			{
	// 				lastName: 'asc',
	// 			},
	// 		],
	// 	});

	// 	return users.map(({ userRoles, ...user }) => ({
	// 		...user,
	// 		roles: userRoles.map(({ role }) => role),
	// 	}));
	// }

	async getUsers(
		organizationId: string,
		currentUserId: string,
	) {
		const users = await this.prisma.user.findMany({
			where: {
				organizationId,
				deletedAt: null,
			},

			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				avatar: true,
				jobTitle: true,
				status: true,

				department: {
					select: {
						id: true,
						name: true,
					},
				},

				userRoles: {
					select: {
						role: {
							select: {
								id: true,
								name: true,
								displayName: true,
							},
						},
					},
				},
			},

			orderBy: [
				{
					firstName: 'asc',
				},
				{
					lastName: 'asc',
				},
			],
		});

		return users.map(({ userRoles, ...user }) => ({
			...user,
			roles: userRoles.map(({ role }) => role),
		}));
	}

}