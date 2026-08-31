import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import type { InviteUserDto } from './dto/invite-user.dto';
import { randomBytes, createHash } from 'crypto';
import type { AcceptInviteDto } from './dto/accept-invite.dto';
// import type { MailService } from 'src/mail/mail.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UsersService {
	constructor(
		private prisma: PrismaService,
		private mailService: MailService,
	) { }

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

	// async inviteUser(
	// 	dto: InviteUserDto,
	// 	organizationId: string,
	// ) {
	// 	console.log('🔥 SERVICE DTO:', dto);
	// 	console.log('🔥 SERVICE TYPE:', typeof dto);
	// 	console.log('🔥 EMAIL:', dto.email);
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

	// 	// Validate role belongs to this organization
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

	// 	// Validate department belongs to this organization
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

	// 	const user = await this.prisma.user.create({
	// 		data: {
	// 			firstName: dto.firstName,
	// 			lastName: dto.lastName,
	// 			email: dto.email,
	// 			jobTitle: dto.jobTitle,
	// 			organizationId,
	// 			status: 'INVITED',
	// 			departmentId: dto.departmentId ?? null,

	// 			...(dto.roleId
	// 				? {
	// 					userRoles: {
	// 						create: {
	// 							roleId: dto.roleId,
	// 						},
	// 					},
	// 				}
	// 				: {}),
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
	// 		status: user.status,

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

	async inviteUser(
		dto: InviteUserDto,
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

		// Validate role belongs to this organization
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

		// Validate department belongs to this organization
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

		// Generate secure invitation token
		const rawToken = randomBytes(32).toString('hex');

		// Store only the hash in the database
		const tokenHash = createHash('sha256')
			.update(rawToken)
			.digest('hex');

		// Invitation expires after 24 hours
		const expiresAt = new Date(
			Date.now() + 24 * 60 * 60 * 1000,
		);

		// Create user + invitation atomically
		const result = await this.prisma.$transaction(
			async (tx) => {
				const user = await tx.user.create({
					data: {
						firstName: dto.firstName,
						lastName: dto.lastName,
						email: dto.email,
						jobTitle: dto.jobTitle,
						organizationId,
						status: 'INVITED',
						passwordHash: null,
						departmentId: dto.departmentId ?? null,

						...(dto.roleId
							? {
								userRoles: {
									create: {
										roleId: dto.roleId,
									},
								},
							}
							: {}),
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

				await tx.invitation.create({
					data: {
						userId: user.id,
						tokenHash,
						expiresAt,
					},
				});

				return user;
			},
		);

		// Database transaction succeeded.
		// Now send the invitation email.
		try {
			await this.mailService.sendInvitationEmail(
				result.email,
				result.firstName,
				rawToken,
			);
		} catch (error) {
			console.error(
				'❌ Invitation email failed:',
				error,
			);

			// Remove the invitation and user because
			// the invitation cannot be completed without the email.
			await this.prisma.$transaction([
				this.prisma.invitation.deleteMany({
					where: {
						userId: result.id,
					},
				}),

				this.prisma.user.delete({
					where: {
						id: result.id,
					},
				}),
			]);

			throw new BadRequestException(
				'User invitation could not be sent. Please try again.',
			);
		}


		// Do NOT return the raw invitation token.
		return {
			id: result.id,
			email: result.email,
			firstName: result.firstName,
			lastName: result.lastName,
			jobTitle: result.jobTitle,
			status: result.status,

			department: result.department
				? {
					id: result.department.id,
					name: result.department.name,
				}
				: null,

			organizationId: result.organizationId,

			roles: result.userRoles.map(
				(userRole) => userRole.role,
			),
		};
	}


	async acceptInvite(dto: AcceptInviteDto) {
		const tokenHash = createHash('sha256')
			.update(dto.token)
			.digest('hex');

		const invitation =
			await this.prisma.invitation.findUnique({
				where: {
					tokenHash,
				},
				include: {
					user: true,
				},
			});

		if (!invitation) {
			throw new BadRequestException(
				'Invalid invitation token',
			);
		}

		if (invitation.usedAt) {
			throw new BadRequestException(
				'This invitation has already been used',
			);
		}

		if (invitation.expiresAt < new Date()) {
			throw new BadRequestException(
				'This invitation has expired',
			);
		}

		if (invitation.user.status !== 'INVITED') {
			throw new BadRequestException(
				'This user cannot accept an invitation',
			);
		}

		const passwordHash = await bcrypt.hash(
			dto.password,
			12,
		);

		const user = await this.prisma.$transaction(
			async (tx) => {
				const updatedUser = await tx.user.update({
					where: {
						id: invitation.userId,
					},
					data: {
						passwordHash,
						status: 'ACTIVE',
					},
				});

				await tx.invitation.update({
					where: {
						id: invitation.id,
					},
					data: {
						usedAt: new Date(),
					},
				});

				return updatedUser;
			},
		);

		return {
			message: 'Invitation accepted successfully',
			user: {
				id: user.id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				status: user.status,
			},
		};
	}

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