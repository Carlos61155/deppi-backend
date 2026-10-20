import { prisma } from "@/prisma/client";

export class RoleService {
    async create(data: { slug: string, name: string; description?: string }) {
        return prisma.role.create({
            data: {
                slug: data.slug,
                name: data.name,
                description: data.description,
            },
        });
    }

    async list() {
        return prisma.role.findMany({
            include: { permissions: { include: { permission: true } } },
        });
    }

    async addPermission(roleId: string, permissionId: string) {
        return prisma.rolePermission.create({
            data: {
                roleId,
                permissionId,
            }
        });
    }

    async assignRoleToUser(userId: string, roleId: string) {
        return prisma.userRole.create({
            data: {
                userId: userId,
                roleId: roleId
            }
        });
    }
}