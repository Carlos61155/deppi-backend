import { Request, Response } from "express";
import { RoleService } from "@/services/RoleService";

const service = new RoleService();

export class RoleController {
    async create(req: Request, res: Response) {
        const role = await service.create(req.body);

        return res.status(201).json(role);
    }

    async list(req: Request, res: Response) {
        const roles = await service.list();

        return res.json(roles);
    }

    async addPermission(req: Request, res: Response) {
        const roleId = req.params.roleId as string;
        const permissionId = req.params.permissionId as string;

        const result = await service.addPermission(roleId, permissionId);

        return res.json(result);
    }

    async assignRole(req: Request, res: Response) {
        const userId = String(req.params.userId);
        const roleId = String(req.params.roleId);

        const result = await service.assignRoleToUser(userId, roleId);

        return res.json(result);
    }
}