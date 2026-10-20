export type { RegisterCivilServantDto } from "@/schemas/registercivilservant";

export interface UpdateCivilServantBody {
    preferredName?: string;
    campusId?: string;
    institutionalEmail?: string;
    siapeEmail?: string;
    passwordRecoveryEmail?: string;
    notificationEmail?: string;
    googleClassroomEmail?: string;
    institutionalPhones?: string[];
    isInPGD?: boolean;
    suapDepartment?: string;
    siapeAssignmentLocation?: string;
    siapeExerciseLocation?: string;
    employmentStatus?: string;
    workRegime?: string;
    workSchedule?: string;
    operatesXRayEquipment?: boolean;
    position?: string;
    positionClass?: string;
    standard?: string;
    positionGroup?: string;
    vacancyCode?: string;
    bank?: string;
    bankBranch?: string;
    checkingAccount?: string;
}
