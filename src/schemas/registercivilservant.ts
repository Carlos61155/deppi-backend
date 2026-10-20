import { z } from "zod";
import { baseUserSchema } from "./registerstudent.schema";
import { updateUserSchema } from "./user.schema";

const dateStringSchema = z
  .string({ error: "Data é obrigatória" })
  .min(1, "Data é obrigatória")
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "Data inválida. Use o formato  (2024-01-15)",
  })
  .optional();

export const registerCivilServantSchema = baseUserSchema.extend({
  registration: z.string().optional(),
  preferredName: z.string().max(100).optional(),
  campusId: z.string({ error: "ID do campus é obrigatório" }),

  institutionalEmail: z
    .email({ error: "E-mail Institucional Inválido" }),

  siapeEmail: z.string().email("E-mail SIAPE inválido").optional(),
  passwordRecoveryEmail: z.string().email("E-mail de recuperação inválido").optional(),
  notificationEmail: z.string().email("E-mail de notificação inválido").optional(),
  googleClassroomEmail: z.string().email("E-mail do Google Classroom inválido").optional(),

  institutionalPhones: z
    .array(z.string().min(1, "Telefone não pode ser vazio"))
    .min(1, "Pelo menos um telefone institucional é obrigatório"),

  isInPGD: z.boolean({ error: "Campo isInPGD é obrigatório" }),

  suapDepartment: z
    .string({ error: "Departamento SUAP é obrigatório" })
    .min(1, "Departamento SUAP é obrigatório"),

  siapeAssignmentLocation: z.string().optional(),
  siapeExerciseLocation: z.string().optional(),

  employmentStatus: z
    .string({ error: "Situação funcional é obrigatória" })
    .min(1, "Situação funcional é obrigatória"),

  workRegime: z.string().optional(),
  workSchedule: z.string().optional(),

  operatesXRayEquipment: z.boolean({ error: "Campo operatesXRayEquipment é obrigatório" }),

  publicServiceStartDate: dateStringSchema,
  institutionAppointmentDate: dateStringSchema,
  institutionExerciseStartDate: dateStringSchema,
  positionAppointmentDate: dateStringSchema,
  positionExerciseStartDate: dateStringSchema,

  position: z.string({ error: "Cargo é obrigatório" }).min(1),
  positionClass: z.string({ error: "Classe do cargo é obrigatória" }).min(1),
  standard: z.string({ error: "Padrão é obrigatório" }).min(1),
  positionGroup: z.string({ error: "Grupo do cargo é obrigatório" }).min(1),
  vacancyCode: z.string({ error: "Código de vaga é obrigatório" }).min(1),

  bank: z.string().optional(),
  bankBranch: z.string().optional(),
  checkingAccount: z.string().optional(),
});

export const updateCivilServantSchema = z.object({
  preferredName: z
    .string()
    .max(100, "Nome preferencial deve ter no máximo 100 caracteres")
    .optional(),

  campusId: z.string({ error: "ID do campus é obrigatório" }).optional(),

  institutionalEmail: z
    .string()
    .email("E-mail institucional inválido")
    .optional(),

  siapeEmail: z
    .string()
    .email("E-mail SIAPE inválido")
    .optional(),

  passwordRecoveryEmail: z
    .string()
    .email("E-mail de recuperação inválido")
    .optional(),

  notificationEmail: z
    .string()
    .email("E-mail de notificação inválido")
    .optional(),

  googleClassroomEmail: z
    .string()
    .email("E-mail do Google Classroom inválido")
    .optional(),

  institutionalPhones: z
    .array(z.string().min(1, "Telefone não pode ser vazio"))
    .optional(),

  isInPGD: z.boolean().optional(),

  suapDepartment: z
    .string()
    .min(1, "Departamento SUAP não pode ser vazio")
    .optional(),

  siapeAssignmentLocation: z.string().optional(),
  siapeExerciseLocation: z.string().optional(),

  employmentStatus: z
    .string()
    .min(1, "Situação funcional não pode ser vazia")
    .optional(),

  workRegime: z.string().optional(),
  workSchedule: z.string().optional(),

  operatesXRayEquipment: z.boolean().optional(),

  position: z.string().min(1, "Cargo não pode ser vazio").optional(),
  positionClass: z.string().min(1, "Classe do cargo não pode ser vazia").optional(),
  standard: z.string().min(1, "Padrão não pode ser vazio").optional(),
  positionGroup: z.string().min(1, "Grupo do cargo não pode ser vazio").optional(),
  vacancyCode: z.string().min(1, "Código de vaga não pode ser vazio").optional(),

  bank: z.string().optional(),
  bankBranch: z.string().optional(),
  checkingAccount: z.string().optional(),
});

export type UpdateCivilServantDto = z.infer<typeof updateCivilServantSchema>;

export type RegisterCivilServantDto = z.infer<typeof registerCivilServantSchema>;