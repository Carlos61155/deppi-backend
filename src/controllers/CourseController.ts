import { Request, Response } from 'express';
import { CourseService } from '../services/CourseService';
import { ENROLLMENT_STATUS } from "../constants/enrollment";

const courseService = new CourseService();

export class CourseController {

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const courseData = req.body;
      const newCourse = await courseService.create(courseData);
      return res.status(201).json(newCourse);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Erro interno do servidor." });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
  try {
    const status = req.query.status?.toString().toUpperCase();

    if (status) {
      const validStatuses = Object.values(ENROLLMENT_STATUS);

      if (!validStatuses.includes(status as (typeof validStatuses)[number])) {
        return res.status(400).json({
          message: `Situação inválida. Valores permitidos: ${validStatuses.join(", ")}`,
        });
      }

      const courses = await courseService.findByEnrollmentStatus(status);
      return res.status(200).json(courses);
    }

    const courses = await courseService.findAll();
    return res.status(200).json(courses);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Erro interno do servidor.",
    });
  }
}

  async getCourseEnrollmentsReport(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: "ID inválido ou ausente." });
      }
      const courseEnrollments = await courseService.getCourseEnrollmentsReport(id);

      if (!courseEnrollments) {
        return res.status(404).json({ message: "Curso não encontrado" });
      }

      return res.status(200).json(courseEnrollments);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async getGeneralReport(req: Request, res: Response) {
    try {
      const generalReport = await courseService.getGeneralReport();

      return res.status(200).json(generalReport);
    } catch (error) {
      return res.status(500).json({
        message: "Erro interno do servidor.",
      });
    }
  }

  async getCoursesByStatusReport(req: Request, res: Response) {
  try {
    const report = await courseService.getCoursesByStatusReport();
    return res.status(200).json(report);
  } catch {
    return res.status(500).json({
      message: "Erro ao buscar cursos por situação.",
    });
  }
}

  async closeCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.id

      if (!courseId || typeof courseId !== 'string') {
        return res.status(400).json({ message: "ID inválido ou ausente." });
      }

      await courseService.closeCourse(courseId);

      return res.status(200).json({ message: "Curso Fechado com sucesso" });

    } catch (error: any) {
      return res.status(404).json({ message: error.message || "Curso não encontrado" });
    }
  }

  async remove(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: "ID inválido ou ausente." });
      }
      await courseService.delete(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ message: error.message || "Curso não encontrado" });
    }
  }
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const updateData = req.body;
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: "ID inválido ou ausente." });
      }
      const updatedCourse = await courseService.update(id, updateData);
      return res.status(200).json(updatedCourse);
    } catch (error: any) {
      return res.status(404).json({ message: error.message || "Curso não encontrado" });
    }
  }


}