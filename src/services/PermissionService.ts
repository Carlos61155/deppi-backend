import { prisma } from "@/prisma/client"; 

export class PermissionService{
    async create(data: {slug: string, name: string, description?: string}){
        return prisma.permission.create({
            data: {
                slug: data.slug,
                name: data.name,
                description: data.description,
            },
        });
    }

    async list(){
        return prisma.permission.findMany();
    }
}