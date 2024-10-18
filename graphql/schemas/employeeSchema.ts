import {
  objectType,
  inputObjectType,
  enumType,
  arg,
  stringArg,
  list,
} from "nexus";
import { EmployeeResolvers } from "../resolvers/employeeResolvers";

// Define Employee type
export const Employee = objectType({
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
    t.string("phone");
    t.field("gender", { type: "Gender" });
    t.field("identity", { type: "Identity" });
    t.field("address", { type: Address });
    t.field("workAuthorization", { type: WorkAuthorization });
    t.list.field("emergencyContacts", { type: EmergencyContact });
    t.list.field("reference", { type: Reference });
    t.list.field("documents", { type: Document });
    t.field("createdAt", { type: "String" });
    t.field("updatedAt", { type: "String" });
    t.string("onboardingStatus");
  },
});

// Define Address type
export const Address = objectType({
  name: "Address",
  definition(t) {
    t.string("id");
    t.string("streetName");
    t.string("city");
    t.string("state");
    t.string("zip");
  },
});

// Define WorkAuthorization type
export const WorkAuthorization = objectType({
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
export const Document = objectType({
  name: "Document",
  definition(t) {
    t.string("id");
    t.string("fileName");
    t.string("fileUrl");
    t.field("status", {type: "Status"});
    t.field("documentType", {type: "DocumentType"});
    t.nullable.string("feedback");
  },
});

// Define EmergencyContact type
export const EmergencyContact = objectType({
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
export const Reference = objectType({
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
export const Gender = enumType({
  name: "Gender",
  members: ["MALE", "FEMALE", "NOTTOANSWER"],
});

// Define Identity Enum
export const Identity = enumType({
  name: "Identity",
  members: ["CITIZEN", "GREENCARD", "OTHER"],
});

// Define Status enum
export const Status = enumType({
  name: "Status",
  members: ["PENDING", "APPROVED", "REJECTED"],
});

// Define DocumentType enum
export const DocumentType = enumType({
  name: "DocumentType",
  members: ["OPT_RECEIPT", "OPT_EAD", "I_983", "I_20"],
});

// Define AddressInput type
export const AddressInput = inputObjectType({
  name: "AddressInput",
  definition(t) {
    t.string("streetName");
    t.string("city");
    t.string("state");
    t.string("zip");
  },
});

// Define ReferenceInput type
export const ReferenceInput = inputObjectType({
  name: "ReferenceInput",
  definition(t) {
    t.string("firstName");
    t.string("lastName");
    t.string("middleName");
    t.string("phone");
    t.string("email");
    t.string("relationship");
  },
});

// Define WorkAuthorizationInput type
export const WorkAuthorizationInput = inputObjectType({
  name: "WorkAuthorizationInput",
  definition(t) {
    t.string("visaType");
    t.string("startDate");
    t.string("endDate");
    t.list.field("documents", { type: "DocumentInput" });
  },
});

export const DocumentInput = inputObjectType({
  name: "DocumentInput",
  definition(t) {
    t.string("fileName");
    t.string("fileUrl");
  },
});

export const EmergencyContactInput = inputObjectType({
  name: "EmergencyContactInput",
  definition(t) {
    t.string("firstName");
    t.string("lastName");
    t.string("middleName");
    t.string("phone");
    t.string("email");
    t.string("relationship");
  },
});

// Employee-related Query and Mutation fields
export const EmployeeQuery = {
  employees: {
    type: list("Employee"),
    resolve: EmployeeResolvers.Query.employees,
  },
  employeeById: {
    type: "Employee",
    args: { id: stringArg() },
    resolve: EmployeeResolvers.Query.employeeById,
  },
  employeeByUserId: {
    type: "Employee",
    args: { userId: stringArg() },
    resolve: EmployeeResolvers.Query.employeeByUserId,
  },
  employeeDocuments: {
    type: list("Document"),
    args: { employeeId: stringArg() },
    resolve: EmployeeResolvers.Query.employeeDocuments,
  },
};

export const EmployeeMutation = {
  createEmployee: {
    type: "Employee",
    args: {
      firstName: stringArg(),
      lastName: stringArg(),
      middleName: stringArg(),
      prefferedName: stringArg(),
      email: stringArg(),
      ssn: stringArg(),
      phone: stringArg(),
      birthday: stringArg(),
      gender: arg({ type: "Gender" }),
      identity: arg({ type: "Identity" }),
      userId: stringArg(),
      address: arg({ type: "AddressInput" }),
      reference: list(arg({ type: "ReferenceInput" })),
      workAuthorization: arg({ type: "WorkAuthorizationInput" }),
      documents: list(arg({ type: "DocumentInput" })),
      emergencyContacts: list(arg({ type: "EmergencyContactInput" })),
    },
    resolve: EmployeeResolvers.Mutation.createEmployee,
  },
  updateEmployee: {
    type: "Employee",
    args: {
      id: stringArg(),
      data: stringArg(),
    },
    resolve: EmployeeResolvers.Mutation.updateEmployee,
  },
  addWorkAuthorization: {
    type: "WorkAuthorization",
    args: {
      employeeId: stringArg(),
      visaType: stringArg(),
      startDate: stringArg(),
      endDate: stringArg(),
    },
    resolve: EmployeeResolvers.Mutation.addWorkAuthorization,
  },
  uploadDocument: {
    type: "Document",
    args: {
      employeeId: stringArg(),
      fileName: stringArg(),
      fileUrl: stringArg(),
      documentType: stringArg(),
    },
    resolve: EmployeeResolvers.Mutation.uploadDocument,
  },
};
