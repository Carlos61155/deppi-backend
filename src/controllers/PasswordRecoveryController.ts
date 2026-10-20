import { Request, Response } from "express";
import { PasswordRecoveryService } from "../services/PasswordRecoveryService";

export class PasswordRecoveryController {
    constructor(private passwordRecoveryService: PasswordRecoveryService) {}

    async forgotPassword(req: Request, res: Response): Promise<void> {

        const { email } = req.body;

        try {
            await this.passwordRecoveryService.forgotPassword(email);
            res.status(200).json({ message: "Se o e-mail estiver cadastrado, você receberá um link para recuperação de senha."});
        } catch (error) {
            res.status(500).json({ message: "Ocorreu um erro ao processar a solicitação." });
        }

    }

    async resetPassword(req: Request, res: Response): Promise<void> {
        const { token, newPassword } = req.body;

        try {
            await this.passwordRecoveryService.resetPassword(token, newPassword);
            res.status(200).json({ message: "Senha redefinida com sucesso." });
        } catch (error) {
        console.error("ERRO RESET PASSWORD:", error);
        res.status(400).json({ message: "Token inválido ou expirado." });
        }
    }
}