import { prisma } from "../lib/prisma";
import { CreateCourseInput } from "../model/Course";

export class CourseService {
  async create(data: CreateCourseInput) {
    if (new Date(data.startDate) >= new Date(data.endDate)) {
      throw new Error("A data de início deve ser anterior à data de término.");
    }

    const campusExists = await prisma.campus.findUnique({
      where: {
        id: data.campusId,
      },
    });

    if (!campusExists) {
      throw new Error("Campus inexistente");
    }

    return await prisma.course.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
    });
  }

  async findAll() {
    return await prisma.course.findMany({
      orderBy: {
        startDate: "desc",
      },
    });
  }

  async closeCourse(courseId: string) {
    const courseExists = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!courseExists) {
      throw new Error("Curso não encontrado.");
    }

    await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        isActive: false,
      },
    });
  }

  async getCourseEnrollmentsReport(courseId: string) {
    return prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        id: true,
        title: true,
        enrollments: {
          select: {
            id: true,
            status: true,
            createdAt: true,
            student: {
              select: {
                id: true,
                occupation: true,
                user: {
                  select: {
                    name: true,
                    email: true,
                    cpf: true,
                    personalPhones: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getGeneralReport() {
    const [
      totalUsers,
      totalCourses,
      totalStudents,
      totalCivilServants,
      totalEnrollments,
      totalCampus,
      activeCourses,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.student.count(),
      prisma.civilServant.count(),
      prisma.enrollment.count(),
      prisma.campus.count(),
      prisma.course.findMany({
        where: { isActive: true },
        select: {
          maxParticipants: true,
          _count: {
            select: { enrollments: true },
          },
        },
      }),
    ]);

    const totalRemainingSpots = activeCourses.reduce((total, course) => {
      const remaining = course.maxParticipants - course._count.enrollments;
      return total + Math.max(0, remaining);
    }, 0);
    return {
      totalUsers,
      totalCourses,
      totalStudents,
      totalCivilServants,
      totalEnrollments,
      totalCampus,
      totalRemainingSpots,
    };
  }

  async delete(id: string) {
    const courseExists = await prisma.course.findUnique({
      where: { id },
    });

    if (!courseExists) {
      throw new Error("Curso não encontrado.");
    }

    return await prisma.course.delete({
      where: { id },
    });
  }

  async update(id: string, data: Partial<CreateCourseInput>) {
    const courseExists = await prisma.course.findUnique({
      where: { id },
    });

    if (!courseExists) {
      throw new Error("Curso não encontrado.");
    }

    const finalStartDate = data.startDate
      ? new Date(data.startDate)
      : courseExists.startDate;
    const finalEndDate = data.endDate
      ? new Date(data.endDate)
      : courseExists.endDate;

    if (finalStartDate >= finalEndDate) {
      throw new Error("A data de início deve ser anterior à data de término.");
    }

    const updateData = { ...data };
    if (data.startDate) updateData.startDate = new Date(data.startDate);
    if (data.endDate) updateData.endDate = new Date(data.endDate);

    return await prisma.course.update({
      where: { id },
      data: updateData,
    });
  }
}
