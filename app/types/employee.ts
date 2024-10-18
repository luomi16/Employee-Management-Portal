// /app/types/employee.ts

export interface Address {
  streetName: string;
  city: string;
  state: string;
  zip: string;
}

export interface Reference {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface WorkAuthorization {
  visaType: string;
  startDate: string;
  endDate: string;
  documents: { fileName: string; fileUrl: string }[];
}

export interface Document {
  fileName: string;
  fileUrl: string;
}

export interface EmergencyContact {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface Employee {
  firstName: string;
  middleName?: string;
  lastName: string;
  prefferedName?: string;
  ssn: string;
  birthday: string;
  gender: string;
  identity: string;
  email: string;
  address?: Address;
  phone?: string;
  reference?: Reference[];
  workAuthorization?: WorkAuthorization;
  documents?: Document[];
  emergencyContacts?: EmergencyContact[];
}

// Define the User interface
interface User {
  id: string; // ObjectId as a string
  username: string;
  email: string; // Must be unique
  password: string; // Consider security practices regarding exposing this
  image?: string; // Optional property for the user's image
  role: string; // The role property, using the Role enum
}
