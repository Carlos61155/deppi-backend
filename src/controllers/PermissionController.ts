import { Request, Response } from "express";
import { PermissionService } from "@/services/PermissionService";

const service = new PermissionService();

export class PermissionController{
    async create(req: Request, res: Response){
        const permission = await service.create(req.body);

        return res.status(201).json(permission);
    }

    async list(req: Request, res: Response){
        const permissions = await service.list();

        return res.json(permissions);
    }

}