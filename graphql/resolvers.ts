// // resolvers.ts

import { PrismaClient, Gender, Identity, VisaType, OnboardingStatus } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export const UserResolvers = {
  Query: {
    // Resolver to get a list of all users
    users: async () => {
      return prisma.user.findMany();
    },
    // Resolver to get a user by ID
    userById: async (_parent: any, args: { id: string }) => {
      return prisma.user.findUnique({
        where: { id: args.id },
      });
    },
    // Resolver to get a list of all employees
    employees: async () => {
      return prisma.employee.findMany();
    },
    // Resolver to get an employee by ID
    employeeById: async (_parent: any, args: { id: string }) => {
      return prisma.employee.findUnique({
        where: { id: args.id },
        include: {
          address: true,
          phone: true,
          workAuthorization: true,
          emergencyContacts: true,
          reference: true,
          documents: true,
        },
      });
    },
    // Resolver to get all documents of a specific employee
    employeeDocuments: async (_parent: any, args: { employeeId: string }) => {
      return prisma.document.findMany({
        where: { employeeId: args.employeeId },
      });
    },
  },
  Mutation: {
    // Resolver to create a new user
    createUser: async (
      _parent: any,
      args: { username: string; email: string; password: string }
    ) => {
      const hashedPassword = await hash(args.password, 10);

      return prisma.user.create({
        data: {
          username: args.username,
          email: args.email,
          password: hashedPassword,
        },
      });
    },
    // Resolver to create a new employee
    createEmployee: async (
      _parent: any,
      args: {
        firstName: string;
        lastName: string;
        middleName?: string;
        prefferedName?: string;
        ssn: string;
        birthday: string;
        gender: Gender;
        identity: Identity;
        userId: string; // We will now require userId to associate the employee with a user
      }
    ) => {
      return prisma.employee.create({
        data: {
          firstName: args.firstName,
          lastName: args.lastName,
          middleName: args.middleName,
          prefferedName: args.prefferedName,
          ssn: args.ssn,
          birthday: new Date(args.birthday),
          gender: args.gender,
          identity: args.identity,
          onboardingStatus: OnboardingStatus.PENDING, // Set the initial onboarding status
          user: {
            connect: { id: args.userId }, // Connect the Employee to an existing User
          },
        },
      });
    },
    // Resolver to update an employee
    updateEmployee: async (_parent: any, args: { id: string; data: any }) => {
      return prisma.employee.update({
        where: { id: args.id },
        data: args.data,
      });
    },
    // Resolver to add a work authorization to an employee
    addWorkAuthorization: async (
      _parent: any,
      args: {
        employeeId: string;
        visaType: VisaType;
        startDate: string;
        endDate: string;
      }
    ) => {
      return prisma.workAuthorization.create({
        data: {
          employeeId: args.employeeId,
          visaType: args.visaType,
          startDate: new Date(args.startDate),
          endDate: new Date(args.endDate),
        },
      });
    },
    // Resolver to upload a document for an employee
    uploadDocument: async (
      _parent: any,
      args: { employeeId: string; fileName: string; fileUrl: string }
    ) => {
      return prisma.document.create({
        data: {
          employeeId: args.employeeId,
          fileName: args.fileName,
          fileUrl: args.fileUrl,
        },
      });
    },
  },
};
