import { prisma } from "@/lib/prisma";
import { UpdateStudentBody } from "@/model/RegisterStudentDto";
import { updateStudentSchema } from "@/schemas/registerstudent.schema";

export class StudentService {
    async update(id: string, data: UpdateStudentBody) {
        const validate = updateStudentSchema.parse(data);

        const updateStudent = await prisma.student.update({
            where: {
                id: id,
            },
            data: validate,
        });

        return updateStudent;
    }

    async delete(id: string) {
        const StudentExists = await prisma.student.findUnique({
            where: {
                id,
            },
        });

        if (!StudentExists) {
            throw new Error("Estudante não encontrado");
        }

        const userId = StudentExists.userId;

        return await prisma.$transaction([
            prisma.student.delete({
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
        const StudentExists = await prisma.student.findUnique({
            where: {
                id,
            },
        });

        if (!StudentExists) {
            throw new Error("Estudante não encontrado");
        }

        const student = await prisma.student.findUnique({
            where: {
                id: id,
            },
        });

        return student;
    }

    async list() {

        const students = await prisma.student.findMany();

        if (!students) {
            throw new Error("Estudantes não encontrados");
        }

        return students;
    }
}