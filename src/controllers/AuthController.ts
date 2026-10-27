import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { prisma } from "../lib/prisma";
import { RegisterStudentDto } from "@/model/RegisterStudentDto";
import { RegisterCivilServantDto } from "@/model/RegisterCivilServantDto";

export class AuthController {
  async registerStudent(request: Request, response: Response) {
    const student: RegisterStudentDto = request.body;

    const authService = new AuthService();

    const user = await authService.registerStudent(student);

    return response.status(201).json(user);
  }

  async registerCivilServant(
    request: Request,
    response: Response,
    role: string,
  ) {
    try {
      const civilServant: RegisterCivilServantDto = request.body;

      if (!role || typeof role !== "string") {
        return response
          .status(400)
          .json({ message: "Role inválida ou ausente" });
      }

      const authService = new AuthService();

      const user = await authService.registerCivilServant(civilServant, role);

      response.status(201).json(user);
      return;
    } catch (error: any) {
      return response
        .status(400)
        .json({ message: error.message || "Erro interno do servidor." });
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body ?? {};

    if (typeof email !== "string" || typeof password !== "string") {
      return response.status(400).json({
        message: "Informe e-mail e senha.",
      });
    }

    try {
      const authService = new AuthService();
      const result = await authService.login(email, password);

      return response.json(result);
    } catch (error) {
      if (error instanceof Error && error.message === "Email ou senha inválidos") {
        return response.status(401).json({ message: error.message });
      }

      console.error("Erro ao realizar login:", error);
      return response.status(500).json({
        message: "Não foi possível realizar o login.",
      });
    }
  }

  async me(request: Request, response: Response) {
    const user = await prisma.user.findUnique({
      where: {
        id: request.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        roles: {
          select: {
            role: {
              select: {
                slug: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return response.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

    return response.json({
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles.map((userRole) => userRole.role.slug),
    });
  }
}
