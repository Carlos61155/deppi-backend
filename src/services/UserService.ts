import { prisma } from "@/lib/prisma";
import { UpdateUserBody } from "@/model/User";
import { updateUserSchema } from "@/schemas/user.schema";

export class UserService {

    async update(id: string, data: UpdateUserBody) {
        const validate = updateUserSchema.parse(data);

        const updateUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: validate,
        });

        return updateUser;
    }

    async delete(id: string) {
        const userExists = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!userExists) {
            throw new Error("Usuário não encontrado");
        }

        return await prisma.$transaction([

            prisma.userRole.deleteMany({
                where: { userId: id },
            }),

            prisma.civilServant.deleteMany({
                where: { userId: id },
            }),

            prisma.user.delete({
                where: { id: id },
            }),
        ]);
    }

    async findById(id: string) {
        const userExists = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!userExists) {
            throw new Error("Usuário não encontrado");
        }

        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        return user;
    }

    async list() {

        const users = await prisma.user.findMany();

        if (!users) {
            throw new Error("Nenhum usuário encontrado");
        }

        return users;
    }


}