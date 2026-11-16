import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { prisma } from "@/lib/prisma";

export async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token =
    req.cookies?.accessToken ?? req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Token não informado",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as jwt.JwtPayload;

    if (!decoded.sub || !decoded.jti) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const session = await prisma.authSession.findUnique({
      where: { id: decoded.jti },
    });

    if (
      !session ||
      session.userId !== decoded.sub ||
      session.revokedAt ||
      session.expiresAt <= new Date()
    ) {
      return res.status(401).json({
        error: "Sessão encerrada ou expirada",
      });
    }

    req.user = { id: decoded.sub };
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }

    return next(error);
  }
}
