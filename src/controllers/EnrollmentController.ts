import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import * as enrollmentService from "../services/EnrollmentService";

async function getStudentId(userId: string) {
  const student = await prisma.student.findUnique({ where: { userId } });
  if (!student) throw new Error("Usuário não possui perfil de estudante");
  return student.id;
}

export async function enroll(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json({ error: "courseId é obrigatório" });
  }

  try {
    const studentId = await getStudentId(userId);
    const enrollment = await enrollmentService.createEnrollment(studentId, courseId, userId);
    return res.status(201).json(enrollment);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function updateStatus(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const enrollmentId = String(req.params.enrollmentId ?? "");
  const { status, reason } = req.body;

  if (!enrollmentId) {
    return res.status(400).json({ error: "enrollmentId é obrigatório" });
  }
  if (!status) {
    return res.status(400).json({ error: "status é obrigatório" });
  }

  try {
    const result = await enrollmentService.updateEnrollmentStatus(enrollmentId, status, userId, reason);
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function listMyEnrollments(req: Request, res: Response) {
  const userId = (req as any).user.id;

  try {
    const studentId = await getStudentId(userId);
    const enrollments = await enrollmentService.getStudentEnrollments(studentId);
    return res.json(enrollments);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function listCourseEnrollments(req: Request, res: Response) {
  const courseId = String(req.params.courseId ?? "");

  if (!courseId) {
    return res.status(400).json({ error: "courseId é obrigatório" });
  }

  const enrollments = await enrollmentService.getCourseEnrollments(courseId);
  return res.json(enrollments);
}

export async function listHistory(req: Request, res: Response) {
  const enrollmentId = String(req.params.enrollmentId ?? "");

  if (!enrollmentId) {
    return res.status(400).json({ error: "enrollmentId é obrigatório" });
  }

  const history = await enrollmentService.getEnrollmentHistory(enrollmentId);
  return res.json(history);
}

export async function approveEnrollment(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const enrollmentId = String(req.params.enrollmentId);
  const { reason } = req.body;

  try {
    const result = await enrollmentService.updateEnrollmentStatus(enrollmentId, "APPROVED", userId, reason);
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function rejectEnrollment(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const enrollmentId = String(req.params.enrollmentId);
  const { reason } = req.body;

  try {
    const result = await enrollmentService.updateEnrollmentStatus(enrollmentId, "REJECTED", userId, reason);
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function cancelEnrollment(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const enrollmentId = String(req.params.enrollmentId);
  const { reason } = req.body;

  try {
    const result = await enrollmentService.updateEnrollmentStatus(enrollmentId, "CANCELED", userId, reason);
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function getEnrollmentsByStatusReport(req: Request, res: Response) {
  try {
    const enrollmentByStatus = await enrollmentService.getEnrollmentsByStatusReport();

    return res.status(200).json(enrollmentByStatus);
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor."
    });
  }
}