import { prisma } from "@/lib/prisma";
import { CreateCampusBody, UpdateCampusBody, updateCampusSchema } from "@/schemas/campus.schema";

export class CampusService {
    async create(data: CreateCampusBody) {
        const campusExists = await prisma.campus.findUnique({
            where: {
                code: data.code,
            },
        });

        if (campusExists) {
            throw new Error("Campus já existe");
        }

        return await prisma.campus.create({
            data: {
                name: data.name,
                code: data.code,
                address: data.address,
                city: data.city,
                state: data.state,
                phone: data.phone,
                email: data.email,
            }
        });

    }

    async update(id: string, data: UpdateCampusBody) {
        const validate = updateCampusSchema.parse(data);

        const updateCampus = await prisma.campus.update({
            where: {
                id: id,
            },
            data: validate,
        });

        return updateCampus;
    }

    async delete(id: string) {
        const campusExists = await prisma.campus.findUnique({
            where: {
                id,
            },
        });

        if (!campusExists) {
            throw new Error("Campus não encontrado");
        }

        return await prisma.campus.delete({
            where: {
                id: id,
            },
        });
    }

    async findById(id: string) {
        const campusExists = await prisma.campus.findUnique({
            where: {
                id,
            },
        });

        if (!campusExists) {
            throw new Error("Campus não encontrado");
        }

        const campus = await prisma.campus.findUnique({
            where: {
                id: id,
            },
        });

        return campus;
    }

    async list() {

        const campus = await prisma.campus.findMany();

        if (!campus) {
            throw new Error("Campi não encontrados");
        }

        return campus;
    }

    async disableCampus(id: string) {
        const campusExists = await prisma.campus.findUnique({
            where: {
                id,
            },
        });

        if (!campusExists) {
            throw new Error("Campus não encontrado");
        }

        await prisma.campus.update({
            where: {
                id: id,
            },
            data: {
                isActive: false,
            },
        });
    }

    async enableCampus(id: string) {
        const campusExists = await prisma.campus.findUnique({
            where: {
                id,
            },
        });

        if (!campusExists) {
            throw new Error("Campus não encontrado");
        }

        await prisma.campus.update({
            where: {
                id: id,
            },
            data: {
                isActive: true,
            },
        });
    }
}