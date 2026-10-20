import { PrismaClient } from "../lib/prisma";
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { ALLOWED_TRANSITIONS, ENROLLMENT_STATUS } from "../constants/enrollment";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export async function createEnrollment(studentId: string, courseId: string, changedBy: string) {
  const existing = await prisma.enrollment.findFirst({ where: { studentId, courseId } });
  if (existing) throw new Error("Aluno já possui inscrição neste curso");

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) throw new Error("Curso não encontrado");

  const activeCount = await prisma.enrollment.count({
    where: { courseId, status: { in: [ENROLLMENT_STATUS.APPROVED, ENROLLMENT_STATUS.ACTIVE] } },
  });
  if (activeCount >= course.maxParticipants) {
    throw new Error("Limite de vagas atingido");
  }

  return prisma.enrollment.create({
    data: {
      studentId,
      courseId,
      status: ENROLLMENT_STATUS.PENDING,
      history: {
        create: {
          previousStatus: null,
          newStatus: "PENDING",
          changedBy,
          changeReason: "Inscrição criada",
        },
      },
    },
    include: { history: true },
  });
}

export async function updateEnrollmentStatus(
  enrollmentId: string,
  newStatus: string,
  changedBy: string,
  reason?: string
) {
  const enrollment = await prisma.enrollment.findUnique({ where: { id: enrollmentId } });
  if (!enrollment) throw new Error("Inscrição não encontrada");

  const allowed = ALLOWED_TRANSITIONS[enrollment.status] ?? [];
  if (!allowed.includes(newStatus)) {
    throw new Error(`Transição inválida: ${enrollment.status} -> ${newStatus}`);
  }

  const [updated] = await prisma.$transaction([
    prisma.enrollment.update({ where: { id: enrollmentId }, data: { status: newStatus } }),
    prisma.enrollmentStatusHistory.create({
      data: {
        enrollmentId,
        previousStatus: enrollment.status as any,
        newStatus: newStatus as any,
        changedBy,
        changeReason: reason,
      },
    }),
  ]);

  return updated;
}

export async function getEnrollmentHistory(enrollmentId: string) {
  return prisma.enrollmentStatusHistory.findMany({
    where: { enrollmentId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getStudentEnrollments(studentId: string) {
  return prisma.enrollment.findMany({
    where: { studentId },
    include: { course: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getEnrollmentsByStatusReport() {
  const report = await prisma.enrollment.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
  });

  return report.map(item => ({
    status: item.status,
    total: item._count.status,
  }));
}

export async function getCourseEnrollments(courseId: string) {
  return prisma.enrollment.findMany({
    where: { courseId },
    include: { student: { include: { user: true } } },
  });
}