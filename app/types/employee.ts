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
