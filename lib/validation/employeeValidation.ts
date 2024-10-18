import { z } from "zod";
const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

// Gender Enum Validation
const genderEnum = z.enum(["MALE", "FEMALE", "NOTTOANSWER"]);

// Identity Enum Validation
const identityEnum = z.enum(["CITIZEN", "GREENCARD", "OTHER"]);

// Address Input Validation
const addressSchema = z.object({
  streetName: z.string().min(1, "Street Name is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(5, "Zip code must be at least 5 characters"),
});

// Reference Input Validation
const referenceSchema = z.object({
  firstName: z.string().min(1, "Reference First Name is required"),
  lastName: z.string().min(1, "Reference Last Name is required"),
  phone: z.string().min(9, "Reference Phone must be at least 9 digits"),
  email: z.string().email("Reference Email must be valid"),
  relationship: z.string().min(1, "Relationship is required"),
});

// Document Input Validation
const documentSchema = z.object({
  fileName: z.string().min(1, "File Name is required"),
  fileUrl: z.string().url("File URL must be valid"),
});

// Get today's date and set time to 00:00:00
const today = new Date();
today.setHours(0, 0, 0, 0);

// Work Authorization Input Validation
const workAuthorizationSchema = z.object({
  visaType: z.enum(["H1B", "F1", "J1", "Other"]),
  startDate: z.string()
    .min(1, "Start date is required")
    .refine((value) => {
      const date = new Date(value);
      return date <= today;
    }, "Start date must be today or earlier"),
  endDate: z.string()
    .min(1, "End date is required")
    .refine((value) => {
      const date = new Date(value);
      return date > today;
    }, "End date must be after today"),
}).refine((data) => {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  return startDate < endDate;
}, {
  message: "End date must be later than start date",
  path: ["endDate"], // Attach the error message to the endDate field
});

// Emergency Contact Input Validation
const emergencyContactSchema = z.object({
  firstName: z.string().min(1, "Emergency Contact First Name is required"),
  lastName: z.string().min(1, "Emergency Contact Last Name is required"),
  phone: z.string().min(9, "Emergency Contact Phone must be at least 9 digits"),
  email: z.string().email("Emergency Contact Email must be valid"),
  relationship: z.string().min(1, "Relationship is required"),
});

// Main Form Schema
export const employeeFormSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  middleName: z.string().optional(),
  prefferedName: z.string().optional(),
  email: z.string().email("Email must be valid"),
  ssn: z.string().min(9, "SSN must be at least 9 characters"),
  birthday: z
    .string()
    .min(1, "Birthday is required")
    .refine((value) => {
      const date = new Date(value);
      return date <= eighteenYearsAgo;
    }, "Employee must be at least 18 years old"),
  gender: genderEnum,
  identity: identityEnum,
  userId: z.string().min(1, "User ID is required"),
  address: addressSchema,
  phone: z.string().min(9, "Phone number must be at least 9 digits"),
  reference: z
    .array(referenceSchema)
    .min(1, "At least one reference is required"),
  workAuthorization: workAuthorizationSchema,
  documents: z
    .array(documentSchema)
    .min(1, "At least one document is required"),
  emergencyContacts: z
    .array(emergencyContactSchema)
    .min(1, "At least one emergency contact is required"),
});
