import { StudentService } from "@/services/StudentService";
import { Request, Response } from "express";

const studentService = new StudentService();

export class StudentControler {
    async update(req: Request, res: Response) {
        try {
            const id = req.params.id

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: "ID inválido ou ausente." });
            }

            const updateStudent = await studentService.update(id, req.body);

            return res.status(200).json(updateStudent);
        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Estudante não encontrado" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = String(req.params.id)

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: "ID inválido ou ausente." });
            }

            const deletedStudent = await studentService.delete(id);

            return res.status(200).json(deletedStudent);
        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Estudante não encontrado" });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = String(req.params.id)

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: "ID inválido ou ausente." });
            }

            const student = await studentService.findById(id);
            return res.status(200).json(student);
        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Estudante não encontrado" });
        }
    }

    async list(req: Request, res: Response) {
        try {

            const students = await studentService.list();
            return res.status(200).json(students);

        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Estudantes não encontrados" });
        }
    }
} 