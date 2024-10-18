import {
  PrismaClient,
  Gender,
  Identity,
  VisaType,
  OnboardingStatus,
  Status,
  DocumentType,
} from "@prisma/client";

const prisma = new PrismaClient();

export const EmployeeResolvers = {
  Query: {
    employees: async () => {
      return prisma.employee.findMany({
        include: {
          address: true,
          workAuthorization: true,
          emergencyContacts: true,
          reference: true,
          documents: true,
        },
      });
    },
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
    employeeByUserId: async (_parent: any, args: { userId: string }) => {
      console.log(args.userId);
      return prisma.employee.findFirst({
        where: { userId: args.userId },
        include: {
          address: true,
          workAuthorization: true,
          emergencyContacts: true,
          reference: true,
          documents: true,
        },
      });
    },
    employeeDocuments: async (_parent: any, args: { employeeId: string }) => {
      return prisma.document.findMany({
        where: { employeeId: args.employeeId },
      });
    },
  },

  Mutation: {
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
        phone?: string;
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
    ) => {
      try {
        console.log("Received args:", JSON.stringify(args, null, 2));

        const employee = await prisma.employee.create({
          data: {
            firstName: args.firstName,
            lastName: args.lastName,
            middleName: args.middleName || null,
            prefferedName: args.prefferedName || null,
            email: args.email,
            phone: args.phone || null,
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

        const completeEmployee = await prisma.employee.findUnique({
          where: { id: employee.id },
          include: {
            address: true,
            workAuthorization: true,
            emergencyContacts: true,
            reference: true,
            documents: true,
          },
        });

        console.log(
          "Created employee:",
          JSON.stringify(completeEmployee, null, 2)
        );
        return completeEmployee;
      } catch (error: unknown) {
        console.error("Error creating employee:", error);
        throw new Error(
          `Failed to create employee: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    },

    updateEmployee: async (
      _parent: any,
      args: { id: string; onboardingStatus: OnboardingStatus }
    ) => {
      return prisma.employee.update({
        where: { id: args.id },
        data: { onboardingStatus: args.onboardingStatus },
      });
    },

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

    uploadDocument: async (
      _parent: any,
      args: {
        employeeId: string;
        fileName: string;
        fileUrl: string;
        documentType: DocumentType;
        status: Status;
      }
    ) => {
      return prisma.document.create({
        data: {
          employeeId: args.employeeId,
          fileName: args.fileName,
          fileUrl: args.fileUrl,
          documentType: args.documentType,
          status: args.status,
        },
      });
    },
  },
};
