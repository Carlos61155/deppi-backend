import { prisma } from "../src/prisma/client";
import bcrypt from "bcryptjs";

async function main() {
  const adminRole = await prisma.role.upsert({
    where: { slug: "ADMIN" },
    update: {},
    create: {
      slug: "ADMIN",
      name: "ADMINISTRADOR",
      description: "Administrador",
    },
  });

  await prisma.role.upsert({
    where: { slug: "ALUNO" },
    update: {},
    create: {
      slug: "ALUNO",
      name: "ALUNO",
      description: "Aluno",
    },
  });

  const deppiRole = await prisma.role.upsert({
    where: { slug: "DEPPI" },
    update: {},
    create: {
      slug: "DEPPI",
      name: "DEPPI",
      description: "Deppi",
    },
  });

  const professorRole = await prisma.role.upsert({
    where: { slug: "PROFESSOR" },
    update: {},
    create: {
      slug: "PROFESSOR",
      name: "PROFESSOR",
      description: "Professor",
    },
  });

  const professorPermissions = [
    "CREATE_COURSES",
    "UPDATE_COURSES",
    "CLOSE_COURSE",
    "MANAGE_ENROLLMENT",
  ];

  for (const permissionSlug of professorPermissions) {
    const permission = await prisma.permission.upsert({
      where: { slug: permissionSlug },
      update: {},
      create: { slug: permissionSlug, name: permissionSlug },
    });

    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: professorRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: { roleId: professorRole.id, permissionId: permission.id },
    });
  }

  const deppiPermissions = [
    "enrollment.approve",
    "enrollment.reject",
    "enrollment.cancel",
    "DEPPI_ROLES",
    "CREATE_COURSES",
    "VIEW_COURSES",
    "UPDATE_COURSES",
    "DELETE_COURSES",
    "CLOSE_COURSE",
    "MANAGE_ENROLLMENT",
  ];

  for (const permissionSlug of deppiPermissions) {
    const permission = await prisma.permission.upsert({
      where: { slug: permissionSlug },
      update: {},
      create: { slug: permissionSlug, name: permissionSlug },
    });

    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: deppiRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: { roleId: deppiRole.id, permissionId: permission.id },
    });
  }

  const adminPermissions = [
    "CREATE_USER",
    "MANAGE_PERMISSIONS",
    "MANAGE_ROLES",
    "MANAGE_USERS",
    "VIEW_PERMISSIONS",
    "DEPPI_ROLES",
    "CREATE_COURSES",
    "VIEW_COURSES",
    "UPDATE_COURSES",
    "DELETE_COURSES",
    "CLOSE_COURSE",
    "MANAGE_ENROLLMENT",
  ];

  for (const permissionName of adminPermissions) {
    const permission = await prisma.permission.upsert({
      where: { slug: permissionName },
      update: {},
      create: { slug: permissionName, name: permissionName },
    });

    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: { roleId: adminRole.id, permissionId: permission.id },
    });
  }

  const passwordHash = await bcrypt.hash("123456", 10);

  await prisma.user.upsert({
    where: { email: "admin@email.com" },
    update: { name: "Admin", passwordHash },
    create: {
      name: "Admin",
      email: "admin@email.com",
      passwordHash,
      personalPhones: ["88999990000"],
      cpf: "11111111111",
      registrationName: "Administrador do Sistema",
      dateOfBirth: new Date("1990-01-01"),
      maritalStatus: "Solteiro",
      placeOfBirth: "Crato",
      sex: "Masculino",
      numberOfDependents: 0,
      raceEthnicity: "Branca",
      pisPasep: "12345678901",
      academicTitle: "Bacharel",
      educationLevel: "Ensino Superior",
      address: "Rua das Flores, 100",
      identityNumber: "123456789",
      issuingAgency: "SSP",
      issuingState: "CE",
      issueDate: new Date("2010-01-01"),
      voterRegistrationNumber: "123456789012",
      electoralZone: "001",
      electoralSection: "001",
      voterRegistrationState: "CE",
      roles: {
        create: { roleId: adminRole.id },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: "deppi@email.com" },
    update: {},
    create: {
      name: "DEPPI",
      email: "deppi@email.com",
      passwordHash,
      personalPhones: ["88999990001"],
      cpf: "11111111112",
      registrationName: "Usuário DEPPI",
      dateOfBirth: new Date("1990-01-01"),
      maritalStatus: "Solteiro",
      placeOfBirth: "Crato",
      sex: "Masculino",
      numberOfDependents: 0,
      raceEthnicity: "Branca",
      pisPasep: "12345678902",
      academicTitle: "Bacharel",
      educationLevel: "Ensino Superior",
      address: "Rua das Flores, 101",
      identityNumber: "123456780",
      issuingAgency: "SSP",
      issuingState: "CE",
      issueDate: new Date("2010-01-01"),
      voterRegistrationNumber: "123456789013",
      electoralZone: "001",
      electoralSection: "001",
      voterRegistrationState: "CE",
      roles: {
        create: { roleId: deppiRole.id },
      },
    },
  });

  const campus = await prisma.campus.create({
    data: {
      name: "Nome",
      address: "Endereço",
      city: "Cidade",
      code: "Código",
      email: "emaildainstituicao@gmail.com",
      phone: ["88888888888"],
      state: "Estado",
    }
  });

  const servidorPasswordHash = await bcrypt.hash("12345678", 10);

  await prisma.user.upsert({
    where: { cpf: "98765432100" },
    update: {},
    create: {
      name: "Mariana Oliveira",
      email: "mariana.oliveira@example.com",
      passwordHash: servidorPasswordHash,
      personalPhones: ["85988887777"],
      cpf: "98765432100",
      registrationName: "Mariana Oliveira",
      dateOfBirth: new Date("1990-08-12"),
      maritalStatus: "Solteira",
      placeOfBirth: "Sobral",
      sex: "Feminino",
      numberOfDependents: 0,
      raceEthnicity: "Branca",
      pisPasep: "98765432100",
      academicTitle: "Mestre",
      educationLevel: "Ensino Superior Completo",
      address: "Rua das Acácias, 250",
      identityNumber: "MG1234567",
      issuingAgency: "SSP",
      issuingState: "CE",
      issueDate: new Date("2012-05-20"),
      voterRegistrationNumber: "123456722012",
      electoralZone: "010",
      electoralSection: "020",
      voterRegistrationState: "CE",

      roles: {
        create: {
          roleId: professorRole.id
        }
      },

      civilServant: {
        create: {
          registration: "202600123",
          preferredName: "Mariana",
          campusId: campus.id,

          institutionalEmail: "mariana.oliveira@ifce.edu.br",
          siapeEmail: "mariana.siape@ifce.edu.br",
          passwordRecoveryEmail: "mariana.recuperacao@gmail.com",
          notificationEmail: "mariana.notificacoes@gmail.com",
          googleClassroomEmail: "mariana.classroom@gmail.com",

          institutionalPhones: ["85988887777"],

          isInPGD: true,

          suapDepartment: "Departamento de Ensino",

          siapeAssignmentLocation: "IFCE Campus Sobral",
          siapeExerciseLocation: "IFCE Campus Sobral",

          employmentStatus: "ATIVO",

          workRegime: "40H DE",
          workSchedule: "08:00 às 17:00",

          operatesXRayEquipment: false,

          publicServiceStartDate: new Date("2018-03-01"),
          institutionAppointmentDate: new Date("2019-01-15"),
          institutionExerciseStartDate: new Date("2019-02-01"),
          positionAppointmentDate: new Date("2019-01-15"),
          positionExerciseStartDate: new Date("2019-02-01"),

          position: "Professor EBTT",
          positionClass: "DIII",
          standard: "04",
          positionGroup: "Magistério Federal",
          vacancyCode: "VAGA-2026-001",

          bank: "Caixa Econômica Federal",
          bankBranch: "1234",
          checkingAccount: "56789-0"
        }
      }
    }
  });

  const courseId = "d5bcb9aa-6d5d-4dd0-96d2-6b7e2f4ef0e1";

  await prisma.course.upsert({
    where: { id: courseId },
    update: {},
    create: {
      campusId: campus.id,
      title: "Curso de Introdução à Programação",
      description: "Curso introdutório de lógica de programação e algoritmos.",
      actionType: "COURSE",
      thematicArea: "Tecnologia",
      extensionLine: "Inclusão Digital",
      startDate: new Date("2026-09-01"),
      endDate: new Date("2026-11-30"),
      minParticipants: 20,
      maxParticipants: 40,
      workload: 60,
      location: "IFCE Campus Fortaleza",
      funding: "Recursos Próprios",
      institutionalProgram: "Programa de Extensão",
      offeringModel: "PRESENTIAL",
      targetMunicipalities: "Fortaleza",
      evaluationMethods:
        "Avaliações práticas e frequência mínima de 75%.",
      marketingMethods:
        "Divulgação em redes sociais e site institucional.",
      activitiesPerformed:
        "Aulas teóricas, práticas e desenvolvimento de projeto final.",
      responsibleName: "Mariana Oliveira",
      presentation:
        "Curso voltado para introdução aos conceitos básicos de programação.",
      justification:
        "Capacitar a comunidade em competências essenciais de tecnologia.",
      targetAudience:
        "Estudantes do ensino médio e comunidade externa.",
      generalObjective:
        "Capacitar os participantes nos fundamentos da programação.",
      specificObjective:
        "Ensinar lógica de programação, algoritmos e desenvolvimento de aplicações básicas.",
      methodology:
        "Aulas expositivas, atividades práticas e projeto integrador.",
    },
  });

  console.log("Seed executada com sucesso");
}

main();