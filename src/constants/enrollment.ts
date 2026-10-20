export const ENROLLMENT_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  CANCELED: "CANCELED",
} as const;

export type EnrollmentStatusType = keyof typeof ENROLLMENT_STATUS;

export const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  PENDING:   ["APPROVED", "REJECTED", "CANCELED"],
  APPROVED:  ["ACTIVE", "CANCELED"],
  ACTIVE:    ["COMPLETED", "CANCELED"],
  REJECTED:  [],
  COMPLETED: [],
  CANCELED:  [],
};