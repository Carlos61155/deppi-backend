import { UserService } from "@/services/UserService";
import { Request, Response } from "express";

const userService = new UserService();

export class UserController {
    async update(req: Request, res: Response) {
        try {
            const id = req.params.id

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: "ID inválido ou ausente." });
            }

            const updateUser = await userService.update(id, req.body);

            return res.status(200).json(updateUser);
        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Usuário não encontrado" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: "ID inválido ou ausente." });
            }

            const deletedUser = await userService.delete(id);

            return res.status(200).json(deletedUser);
        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Usuário não encontrado" });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = String(req.params.id)

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: "ID inválido ou ausente." });
            }

            const user = await userService.findById(id);
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Usuário não encontrado" });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const users = await userService.list();
            return res.status(200).json(users);
        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Nenhum usuário encontrado" });
        }
    }

}