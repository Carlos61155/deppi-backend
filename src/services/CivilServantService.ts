import { prisma } from "@/lib/prisma"
import { UpdateCivilServantBody } from "@/model/RegisterCivilServantDto";
import { UpdateCivilServantDto, updateCivilServantSchema } from "@/schemas/registercivilservant";

export class CivilServantService {
    async update(id: string, data: UpdateCivilServantBody) {
        const validate = updateCivilServantSchema.parse(data);

        const updateCivilServant = await prisma.civilServant.update({
            where: {
                id: id,
            },
            data: validate,
        });

        return updateCivilServant;
    }

    async delete(id: string) {
        const civilServantExists = await prisma.civilServant.findUnique({
            where: {
                id,
            },
        });

        if (!civilServantExists) {
            throw new Error("Servidor público não encontrado");
        }

        const userId = civilServantExists.userId;

        return await prisma.$transaction([
            prisma.civilServant.delete({
                where: { id },
            }),
            prisma.userRole.deleteMany({
                where: { userId },
            }),
            prisma.user.delete({
                where: { id: userId },
            }),
        ]);
    }

    async findById(id: string) {
        const civilServantExists = await prisma.civilServant.findUnique({
            where: {
                id,
            },
        });

        if (!civilServantExists) {
            throw new Error("Servidor público não encontrado");
        }

        const civilServant = await prisma.civilServant.findUnique({
            where: {
                id: id,
            },
        });

        return civilServant;
    }

    async list() {

        const civilServants = await prisma.civilServant.findMany();

        if (!civilServants) {
            throw new Error("Servidores públicos não encontrados");
        }

        return civilServants;
    }

    async disableCivilServant(id: string) {
        const civilServantExists = await prisma.civilServant.findUnique({
            where: {
                id,
            },
        });

        if (!civilServantExists) {
            throw new Error("Servidor público não encontrado");
        }

        await prisma.civilServant.update({
            where: {
                id: id,
            },
            data: {
                isActive: false,
            },
        });
    }

    async enableCivilServant(id: string) {
        const civilServantExists = await prisma.civilServant.findUnique({
            where: {
                id,
            },
        });

        if (!civilServantExists) {
            throw new Error("Servidor público não encontrado");
        }

        await prisma.civilServant.update({
            where: {
                id: id,
            },
            data: {
                isActive: true,
            },
        });
    }
}