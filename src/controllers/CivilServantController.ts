import { CivilServantService } from "@/services/CivilServantService";
import { Request, Response } from "express";

const civilServantService = new CivilServantService();

export class CivilServantController {
    async update(req: Request, res: Response) {
        try {
            const id = req.params.id

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: "ID inválido ou ausente." });
            }

            const updateCivilServant = await civilServantService.update(id, req.body);

            return res.status(200).json(updateCivilServant);
        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Servidor público não encontrado" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = String(req.params.id)

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: "ID inválido ou ausente." });
            }

            const deletedCivilServant = await civilServantService.delete(id);

            return res.status(200).json(deletedCivilServant);
        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Servidor público não encontrado" });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = String(req.params.id)

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: "ID inválido ou ausente." });
            }

            const civilServant = await civilServantService.findById(id);
            return res.status(200).json(civilServant);
        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Servidor público não encontrado" });
        }
    }

    async list(req: Request, res: Response) {
        try {

            const civilServants = await civilServantService.list();
            return res.status(200).json(civilServants);

        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Servidores públicos não encontrados" });
        }
    }

    async disableCivilServant(req: Request, res: Response) {
        try {
            const id = String(req.params.id)

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: "ID inválido ou ausente." });
            }

            const disableCivilServant = await civilServantService.disableCivilServant(id);

            return res.status(200).json({ message: "Servidor público inativado com sucesso" });
        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Servidor público não encontrado" });
        }
    }

    async enableCivilServant(req: Request, res: Response) {
        try {
            const id = String(req.params.id)

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: "ID inválido ou ausente." });
            }

            const enableCivilServant = await civilServantService.enableCivilServant(id);

            return res.status(200).json({ message: "Servidor público ativado com sucesso" });
        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Servidor público não encontrado" });
        }
    }
}