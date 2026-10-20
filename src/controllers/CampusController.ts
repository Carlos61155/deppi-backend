import { CreateCampusBody } from "@/model/Campus";
import { CampusService } from "@/services/CampusService";
import { Request, Response } from "express";

const campusService = new CampusService();

export class CampusController {
    async create(req: Request, res: Response) {
        const data: CreateCampusBody = req.body;

        const campus = await campusService.create(data);

        return res.status(201).json(campus);
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: "ID inválido ou ausente." });
            }

            const updateCampus = await campusService.update(id, req.body);

            return res.status(200).json(updateCampus);
        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Campus não encontrado" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = String(req.params.id)

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: "ID inválido ou ausente." });
            }

            const deletedCampus = await campusService.delete(id);

            return res.status(200).json(deletedCampus);
        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Campus não encontrado" });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = String(req.params.id)

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: "ID inválido ou ausente." });
            }

            const campus = await campusService.findById(id);
            return res.status(200).json(campus);
        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Campus não encontrado" });
        }
    }

    async list(req: Request, res: Response) {
        try {

            const campus = await campusService.list();
            return res.status(200).json(campus);

        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Campi não encontrados" });
        }
    }

    async disableCampus(req: Request, res: Response) {
        try {
            const id = String(req.params.id)

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: "ID inválido ou ausente." });
            }

            const disableCampus = await campusService.disableCampus(id);

            return res.status(200).json({ message: "Campus inativado com sucesso" });
        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Campus não encontrado" });
        }
    }

    async enableCampus(req: Request, res: Response) {
        try {
            const id = String(req.params.id)

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: "ID inválido ou ausente." });
            }

            const enableCampus = await campusService.enableCampus(id);

            return res.status(200).json({ message: "Campus ativado com sucesso" });
        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Campus não encontrado" });
        }
    }
}