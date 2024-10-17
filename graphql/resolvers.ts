// resolvers.ts

import {
  PrismaClient,
  Gender,
  Identity,
  VisaType,
  OnboardingStatus,
} from "@prisma/client";
import { hash, compare } from "bcryptjs";
import * as nodemailer from "nodemailer";

import { generateToken } from "@/graphql/utils/tokens";

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
      console.log(args.id);
      return prisma.employee.findUnique({
        where: { id: args.id },
        include: {
          address: true,
          workAuthorization: true,
          emergencyContacts: true,
          reference: true,
          documents: true,
        },
      });
    },

    // Resolver to get an employee by userId
    employeeByUserId: async (_parent: any, args: { userId: string }) => {
      console.log(args.userId);
      return prisma.employee.findFirst({
        where: { userId: args.userId }, // Assuming there is a `userId` field in the Employee table
        include: {
          address: true,
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

    // resolever to get send registration token history
    registrationTokenHistory: async () => {
      return prisma.registrationToken.findMany();
    },
  },

  Mutation: {
    // Resolver to create a new user
    createUser: async (
      _parent: any,
      args: { username: string; email: string; password: string; image: string }
    ) => {
      const hashedPassword = await hash(args.password, 10);

      return prisma.user.create({
        data: {
          username: args.username,
          email: args.email,
          password: hashedPassword,
          image: args.image,
        },
      });
    },

    // resolver to signIn
    signIn: async (_parent: any, args: { email: string; password: string }) => {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const isValidPassword = await compare(args.password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }

      // Optionally, you can return only necessary fields or include a token
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        image: user.image,
        // Include any other fields you want to return
      };
    },

    // Resolver to create a new employee
    createEmployee: async (
      _parent: any,
      args: {
        firstName: string;
        lastName: string;
        middleName?: string;
        prefferedName?: string;
        email: string;
        ssn: string;
        birthday: string;
        gender: Gender;
        identity: Identity;
        userId: string;
        phone: string;
        address: {
          streetName: string;
          city: string;
          state: string;
          zip: string;
        };
        references: Array<{
          firstName: string;
          lastName: string;
          middleName?: string;
          phone: string;
          email: string;
          relationship: string;
        }>;
        workAuthorization: {
          visaType: VisaType;
          startDate: string;
          endDate: string;
          documents: Array<{
            fileName: string;
            fileUrl: string;
          }>;
        };
        documents: Array<{
          fileName: string;
          fileUrl: string;
        }>;
        emergencyContacts: Array<{
          firstName: string;
          lastName: string;
          middleName?: string;
          phone: string;
          email: string;
          relationship: string;
        }>;
      },
      context: any
      // _parent: any, args: any, context: any
    ) => {
      console.log(args);
      // try {
      // Step 1: 先创建 Employee
      const employee = await prisma.employee.create({
        data: {
          firstName: args.firstName,
          lastName: args.lastName,
          middleName: args.middleName || null,
          prefferedName: args.prefferedName || null,
          email: args.email,
          phone: args.phone,
          ssn: args.ssn,
          birthday: new Date(args.birthday),
          gender: args.gender,
          identity: args.identity,
          onboardingStatus: "PENDING" || null,
          user: {
            connect: { id: args.userId },
          },
        },
      });

      // Step 2: 创建 Address，并关联 Employee
      await prisma.address.create({
        data: {
          streetName: args.address.streetName,
          city: args.address.city,
          state: args.address.state,
          zip: args.address.zip,
          employee: {
            connect: { id: employee.id },
          },
        },
      });

      // Create related documents, workAuthorization, etc.
      // Use the employee id to connect the nested data

      const references = args.references || [];
      console.log(references);
      if (references.length > 0) {
        await prisma.reference.createMany({
          data: references.map((reference) => ({
            ...reference,
            employeeId: employee.id,
          })),
        });
      }

      if (args.workAuthorization) {
        await prisma.workAuthorization.create({
          data: {
            visaType: args.workAuthorization.visaType,
            startDate: new Date(args.workAuthorization.startDate),
            endDate: new Date(args.workAuthorization.endDate),
            employeeId: employee.id, // Connect the employee
            documents: {
              create: args.workAuthorization.documents.map((doc: any) => ({
                fileName: doc.fileName,
                fileUrl: doc.fileUrl,
                employee: {
                  connect: { id: employee.id },
                },
              })),
            },
          },
        });
      }

      const documents = args.documents || [];
      if (documents.length > 0) {
        await prisma.document.createMany({
          data: args.documents.map((doc) => ({
            ...doc,
            employeeId: employee.id, // Connect the employee
          })),
        });
      }

      const emergencyContacts = args.emergencyContacts || [];
      if (emergencyContacts.length > 0) {
        await prisma.emergencyContact.createMany({
          data: args.emergencyContacts.map((contact) => ({
            ...contact,
            employeeId: employee.id, // Connect the employee
          })),
        });
      }
      return employee; // Return the employee with connected data
      // } catch (error) {
      //   console.error(error);
      //   throw new Error("Failed to create employee");
      // }
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

    // Resolver to send a registration token for an employee
    sendRegistrationToken: async (
      _parent: any,
      args: { name: string; email: string }
    ) => {
      const { name, email } = args;

      // Generate a unique registration token
      const token = generateToken(
        email,
        name,
        process.env.JWT_SECRET || "your-secret-key"
      );
      const tokenExpiration = new Date(Date.now() + 3 * 60 * 60 * 1000); // Token expires in 3 hours

      // Save the token to the database
      const registrationToken = await prisma.registrationToken.create({
        data: {
          email,
          name,
          token,
          tokenExpiration,
        },
      });

      // Send the email with Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const registrationLink = `http://localhost:3000/sign-up?token=${registrationToken.token}`;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Employee Registration Link",
        text: `Hello ${name},\n\nClick the following link to complete your registration: ${registrationLink}\n\nThis link is valid for 3 hours.`,
      };

      await transporter.sendMail(mailOptions);

      return { success: true, message: "Registration token sent successfully" };
    },
  },
};
