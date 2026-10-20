import { Request, Response, NextFunction } from "express";
import { prisma } from "@/prisma/client"; 

export function permissionMiddleware(permissionSlug: string) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(401).json({
        error: "Usuário não encontrado",
      });
    }

    const permissions =
      user.roles.flatMap((userRole) =>
        userRole.role.permissions.map(
          (item) => item.permission.slug
        )
      );

    if (!permissions.includes(permissionSlug)) {
      return res.status(403).json({error: "Sem permissão",});
    }

    next();
  };
}