import { z } from "zod";

export const createCampusSchema = z.object({
    name: z.string({ error: "Nome é obrigatório" }),
    code: z.string({ error: "Código externo é obrigatório" }),
    address: z.string({ error: "Endereço é obrigatório" }),
    city: z.string({ error: "Cidade é obrigatória" }),
    state: z.string({ error: "Estado é obrigatório" }),
    phone: z.array(z.string().min(1, "Telefone não pode ser vazio"))
        .min(1, "Pelo menos um telefone institucional é obrigatório"),
    email: z.email({ error: "E-mail inválido" }),
});

export const updateCampusSchema = z.object({
    name: z.string({ error: "Nome é obrigatório" }).optional(),
    address: z.string({ error: "Endereço é obrigatório" }).optional(),
    city: z.string({ error: "Cidade é obrigatória" }).optional(),
    state: z.string({ error: "Estado é obrigatório" }).optional(),
    phone: z.array(z.string().min(1, "Telefone não pode ser vazio"))
        .min(1, "Pelo menos um telefone institucional é obrigatório").optional(),
    email: z.email({ error: "E-mail inválido" }).optional(),
});

export type CreateCampusBody = z.infer<typeof createCampusSchema>;
export type UpdateCampusBody = z.infer<typeof updateCampusSchema>;