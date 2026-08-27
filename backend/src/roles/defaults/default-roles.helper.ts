import { Prisma } from '@prisma/client';

import { DEFAULT_ROLES } from './default-roles';

export async function createDefaultRoles(
    tx: Prisma.TransactionClient,
    organizationId: string,
    userId: string,
) {
    for (const roleConfig of DEFAULT_ROLES) {
        const role = await tx.role.create({
            data: {
                organizationId,
                name: roleConfig.name,
                displayName: roleConfig.displayName,
                description: roleConfig.description,
                isSystem: true,
            },
        });

        for (const permissionName of roleConfig.permissions) {
            const permission =
                await tx.permission.findUnique({
                    where: {
                        name: permissionName,
                    },
                });

            if (!permission) {
                throw new Error(
                    `Permission '${permissionName}' does not exist`,
                );
            }

            await tx.rolePermission.create({
                data: {
                    roleId: role.id,
                    permissionId: permission.id,
                },
            });
        }

        // First user gets OWNER
        if (role.name === 'OWNER') {
            await tx.userRole.create({
                data: {
                    userId,
                    roleId: role.id,
                },
            });
        }
    }
}