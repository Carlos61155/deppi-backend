-- CreateEnum
CREATE TYPE "CourseStatusEnum" AS ENUM ('UNDER_REVIEW', 'IN_PROGRESS', 'COMPLETED', 'CLOSED');

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "status" "CourseStatusEnum" NOT NULL DEFAULT 'UNDER_REVIEW';
