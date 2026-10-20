export interface UpdateUserBody {
    name?: string;
    email?: string;
    registrationName?: string;
    identityNumber?: string;
    issueDate?: string | Date;
    issuingAgency?: string;
    issuingState?: string;
    dateOfBirth?: string | Date;
    sex?: string;
    raceEthnicity?: string;
    maritalStatus?: string;
    educationLevel?: string;
    academicTitle?: string;
    address?: string;
    personalPhones?: string[];
    placeOfBirth?: string;
    fatherName?: string;
    motherName?: string;
    bloodType?: string;
    rhFactor?: string;
    numberOfDependents?: number;
    pisPasep?: string;
    voterRegistrationNumber?: string;
    voterRegistrationZone?: string;
    voterRegistrationSection?: string;
    voterRegistrationState?: string;
}