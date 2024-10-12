// schema.ts
import { makeSchema, objectType, stringArg, enumType, arg } from "nexus";
import path from "path";
import { UserResolvers } from "./resolvers"; // Import resolvers

// Define the User type
const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("username");
    t.string("email");
    t.string("image");
    t.field("createdAt", { type: "String" });
    t.field("updatedAt", { type: "String" });
  },
});

// Define Employee type
const Employee = objectType({
  name: "Employee",
  definition(t) {
    t.string("id");
    t.string("userId");
    t.string("firstName");
    t.string("lastName");
    t.string("middleName");
    t.string("prefferedName");
    t.string("email");
    t.string("ssn");
    t.string("birthday");
    t.field("gender", { type: "Gender" }); // Use the Gender enum
    t.field("identity", { type: "Identity" }); // Use the Identity enum
    t.list.field("address", { type: Address });
    t.list.field("phone", { type: PhoneNumber });
    t.field("workAuthorization", { type: WorkAuthorization });
    t.list.field("emergencyContacts", { type: EmergencyContact });
    t.field("reference", { type: Reference });
    t.list.field("documents", { type: Document });
    t.field("createdAt", { type: "String" });
    t.field("updatedAt", { type: "String" });
    t.string("onboardingStatus"); // Add onboardingStatus if it's part of your schema
  },
});

// Define Address type
const Address = objectType({
  name: "Address",
  definition(t) {
    t.string("id");
    t.string("building");
    t.string("streetName");
    t.string("city");
    t.string("state");
    t.string("zip");
  },
});

// Define PhoneNumber type
const PhoneNumber = objectType({
  name: "PhoneNumber",
  definition(t) {
    t.string("id");
    t.string("cellPhone");
    t.string("workPhone");
  },
});

// Define WorkAuthorization type
const WorkAuthorization = objectType({
  name: "WorkAuthorization",
  definition(t) {
    t.string("id");
    t.string("visaType");
    t.string("startDate");
    t.string("endDate");
    t.list.field("documents", { type: Document });
  },
});

// Define Document type
const Document = objectType({
  name: "Document",
  definition(t) {
    t.string("id");
    t.string("fileName");
    t.string("fileUrl");
  },
});

// Define EmergencyContact type
const EmergencyContact = objectType({
  name: "EmergencyContact",
  definition(t) {
    t.string("id");
    t.string("firstName");
    t.string("lastName");
    t.string("middleName");
    t.string("phone");
    t.string("email");
    t.string("relationship");
  },
});

// Define Reference type
const Reference = objectType({
  name: "Reference",
  definition(t) {
    t.string("id");
    t.string("firstName");
    t.string("lastName");
    t.string("middleName");
    t.string("phone");
    t.string("email");
    t.string("relationship");
  },
});

// Define Gender Enum
const Gender = enumType({
  name: "Gender", // This should match the expected type in your GraphQL schema
  members: ["MALE", "FEMALE", "NOTTOANSWER"],
});

// Define Identity Enum
const Identity = enumType({
  name: "Identity", // This should match the expected type in your GraphQL schema
  members: ["CITIZEN", "GREENCARD", "OTHER"],
});

// Define Query type
const Query = objectType({
  name: "Query",
  definition(t) {
    t.list.field("users", {
      type: "User",
      resolve: UserResolvers.Query.users, // Resolver for fetching all users
    });

    t.field("userById", {
      type: "User",
      args: { id: stringArg() },
      resolve: UserResolvers.Query.userById, // Resolver for fetching a user by ID
    });

    t.list.field("employees", {
      type: "Employee",
      resolve: UserResolvers.Query.employees, // Resolver for fetching all employees
    });

    t.field("employeeById", {
      type: "Employee",
      args: { id: stringArg() },
      resolve: UserResolvers.Query.employeeById, // Resolver for fetching an employee by ID
    });

    t.list.field("employeeDocuments", {
      type: "Document",
      args: { employeeId: stringArg() },
      resolve: UserResolvers.Query.employeeDocuments, // Resolver for fetching documents of an employee
    });
  },
});

// Define Mutation type
const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: "User",
      args: {
        username: stringArg(),
        email: stringArg(),
        password: stringArg(),
      },
      resolve: UserResolvers.Mutation.createUser, // Resolver for creating a user
    });

    t.field("createEmployee", {
      type: "Employee",
      args: {
        firstName: stringArg(),
        lastName: stringArg(),
        middleName: stringArg(),
        prefferedName: stringArg(),
        email: stringArg(),
        ssn: stringArg(),
        birthday: stringArg(),
        gender: arg({ type: "Gender" }), // Use the Gender enum as an argument
        identity: arg({ type: "Identity" }), // Use the Identity enum as an argument
        userId: stringArg(), // Make sure this is defined
      },
      // resolve: UserResolvers.Mutation.createEmployee, // Resolver for creating an employee
      resolve: async (_parent, args, context) => {
        return context.prisma.employee.create({
          data: {
            firstName: args.firstName,
            lastName: args.lastName,
            middleName: args.middleName,
            prefferedName: args.prefferedName,
            email: args.email,
            ssn: args.ssn,
            birthday: new Date(args.birthday),
            gender: args.gender,
            identity: args.identity,
            onboardingStatus: "PENDING", // Provide a default value
            user: {
              connect: { id: args.userId }, // Connect with an existing user
            },
          },
        });
      },
    });

    t.field("updateEmployee", {
      type: "Employee",
      args: {
        id: stringArg(),
        data: stringArg(), // Accepting JSON-like data for updates
      },
      resolve: UserResolvers.Mutation.updateEmployee, // Resolver for updating an employee
    });

    t.field("addWorkAuthorization", {
      type: "WorkAuthorization",
      args: {
        employeeId: stringArg(),
        visaType: stringArg(),
        startDate: stringArg(),
        endDate: stringArg(),
      },
      resolve: UserResolvers.Mutation.addWorkAuthorization, // Resolver for adding work authorization
    });

    t.field("uploadDocument", {
      type: "Document",
      args: {
        employeeId: stringArg(),
        fileName: stringArg(),
        fileUrl: stringArg(),
      },
      resolve: UserResolvers.Mutation.uploadDocument, // Resolver for uploading a document
    });
  },
});

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    User,
    Employee,
    Address,
    PhoneNumber,
    WorkAuthorization,
    Document,
    EmergencyContact,
    Reference,
    Gender,  // Ensure enums are included
    Identity, // Ensure enums are included
  ],
  outputs: {
    schema: path.join(process.cwd(), "graphql", "schema.graphql"),
    typegen: path.join(
      process.cwd(),
      "node_modules",
      "@types",
      "nexus-typegen.ts"
    ),
  },
});
