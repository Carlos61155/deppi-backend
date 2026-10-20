export type { RegisterStudentDto } from "@/schemas/registerstudent.schema";

export interface UpdateStudentBody {
    socialName?: string;
    occupation?: string;
    perCapitaIncome?: number;
}