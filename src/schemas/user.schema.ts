import { z } from "zod";

const dateStringSchema = z
    .string({ error: "Data é obrigatória" })
    .min(1, "Data é obrigatória")
    .refine((val) => !isNaN(Date.parse(val)), {
        message: "Data inválida. Use o formato 2024-01-15",
    });

export const updateUserSchema = z.object({
    name: z.string().min(3).max(100).optional(),
    email: z.string().email("E-mail inválido").optional(),
    registrationName: z.string().optional(),
    identityNumber: z.string().optional(),
    issueDate: dateStringSchema.optional(),
    issuingAgency: z.string().optional(),
    issuingState: z.string().optional(),
    dateOfBirth: dateStringSchema.optional(),
    sex: z.string().optional(),
    raceEthnicity: z.string().optional(),
    maritalStatus: z.string().optional(),
    educationLevel: z.string().optional(),
    academicTitle: z.string().optional(),
    address: z.string().optional(),
    personalPhones: z.array(z.string()).optional(),
    placeOfBirth: z.string().optional(),
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    bloodType: z.string().optional(),
    rhFactor: z.string().optional(),
    numberOfDependents: z.number().optional(),
    pisPasep: z.string().optional(),
    voterRegistrationNumber: z.string().optional(),
    electoralZone: z.string().optional(),
    electoralSection: z.string().optional(),
    voterRegistrationState: z.string().optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;