import { z } from "zod";

const dateStringSchema = z
  .string({ error: "Data é obrigatória" })
  .min(1, "Data é obrigatória")
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "Data inválida. Use o formato 2024-01-15",
  });

export const baseUserSchema = z.object({
  name: z.string({ error: "Nome é obrigatório" }).min(3).max(100),
  email: z.email({ error: "E-mail inválido" }),
  password: z.string({ error: "Senha é obrigatória" }).min(8),

  cpf: z.string({ error: "CPF é obrigatório" }),
  registrationName: z.string({ error: "Nome de registro é obrigatório" }),
  personalPhones: z.array(z.string()).optional(),
  dateOfBirth: dateStringSchema,
  maritalStatus: z.string({ error: "Estado civil é obrigatório" }),
  placeOfBirth: z.string({ error: "Local de nascimento é obrigatório" }),
  sex: z.string({ error: "Sexo é obrigatório" }),
  bloodType: z.string().optional(),
  rhFactor: z.string().optional(),
  numberOfDependents: z.number({ error: "Número de dependentes é obrigatório" }),
  raceEthnicity: z.string({ error: "Raça/etnia é obrigatória" }),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  pisPasep: z.string({ error: "PIS/PASEP é obrigatório" }),
  academicTitle: z.string({ error: "Título acadêmico é obrigatório" }),
  educationLevel: z.string({ error: "Nível de escolaridade é obrigatório" }),
  address: z.string({ error: "Endereço é obrigatório" }),
  identityNumber: z.string({ error: "Número de identidade é obrigatório" }),
  issuingAgency: z.string({ error: "Órgão emissor é obrigatório" }),
  issuingState: z.string({ error: "Estado emissor é obrigatório" }),
  issueDate: dateStringSchema,
  voterRegistrationNumber: z.string({ error: "Título de eleitor é obrigatório" }),
  electoralZone: z.string({ error: "Zona eleitoral é obrigatória" }),
  electoralSection: z.string({ error: "Seção eleitoral é obrigatória" }),
  voterRegistrationState: z.string({ error: "Estado do título é obrigatório" }),
});

export const registerStudentSchema = baseUserSchema.extend({
  socialName: z.string().max(100).optional(),
  occupation: z.string({ error: "Ocupação é obrigatória" }).min(1),
  perCapitaIncome: z
    .number({ error: "Renda per capita é obrigatória" })
    .nonnegative(),
});

export const updateStudentSchema = z.object({
  socialName: z.string().max(100).optional(),
  occupation: z.string().min(1).optional(),
  perCapitaIncome: z
    .number()
    .nonnegative()
    .optional(),
});

export type UpdateStudentDto = z.infer<typeof updateStudentSchema>;

export type RegisterStudentDto = z.infer<typeof registerStudentSchema>;