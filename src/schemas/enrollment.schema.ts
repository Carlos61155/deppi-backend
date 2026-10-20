import { z } from "zod";
import { ENROLLMENT_STATUS } from "../constants/enrollment";

const validStatuses = Object.values(ENROLLMENT_STATUS) as [string, ...string[]];

export const enrollSchema = z.object({
  courseId: z
    .string({ error: "courseId é obrigatório" })
    .uuid("courseId deve ser um UUID válido"),
});

export const updateEnrollmentStatusSchema = z.object({
  status: z.enum(validStatuses, {
    error: `Status inválido. Valores permitidos: ${validStatuses.join(", ")}`,
  }),
  reason: z
    .string()
    .max(500, "Motivo deve ter no máximo 500 caracteres")
    .optional(),
});

export const approveRejectSchema = z.object({
  reason: z
    .string()
    .max(500, "Motivo deve ter no máximo 500 caracteres")
    .optional(),
});

export type EnrollInput = z.infer<typeof enrollSchema>;
export type UpdateEnrollmentStatusInput = z.infer<typeof updateEnrollmentStatusSchema>;