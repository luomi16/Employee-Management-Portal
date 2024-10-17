mutation CreateEmployee($firstName: String, $lastName: String, $middleName: String, $prefferedName: String, $email: String, $ssn: String, $birthday: String, $gender: Gender, $identity: Identity, $userId: String, $address: AddressInput, $phone: PhoneNumberInput, $reference: [ReferenceInput], $workAuthorization: WorkAuthorizationInput, $documents: [DocumentInput], $emergencyContacts: [EmergencyContactInput]) {
  createEmployee(firstName: $firstName, lastName: $lastName, middleName: $middleName, prefferedName: $prefferedName, email: $email, ssn: $ssn, birthday: $birthday, gender: $gender, identity: $identity, userId: $userId, address: $address, phone: $phone, reference: $reference, workAuthorization: $workAuthorization, documents: $documents, emergencyContacts: $emergencyContacts) {
    id
    userId
    firstName
    lastName
    middleName
    prefferedName
    email
    ssn
    birthday
    gender
    identity
    address {
      id
      streetName
      city
      state
      zip
    }
    phone {
      cellPhone
      workPhone
    }
    workAuthorization {
      id
      visaType
      startDate
      endDate
    }
    emergencyContacts {
      id
      firstName
      lastName
      middleName
      phone
      email
      relationship
    }
    reference {
      id
      firstName
      lastName
      middleName
      phone
      email
      relationship
    }
    documents {
      id
      fileName
      fileUrl
    }
    createdAt
    updatedAt
    onboardingStatus
  }
}

{
  "firstName": "John",
  "lastName": "Doe",
  "middleName": "Michael",
  "prefferedName": "Johnny",
  "email": "john.doe@example.com",
  "ssn": "123-45-6789",
  "birthday": "1990-01-01",
  "gender": "MALE",
  "identity": "OTHER",
  "userId": "user12345",
  "address": {
    "city": "Los Angeles",
    "state": "CA",
    "streetName": "Elm Street",
    "zip": "90001"
  },
  "phone": {
    "workPhone": "(987) 654-3210",
    "cellPhone": "(123) 456-7890"
  },
  "reference": [
    {
      "email": "reference1@example.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "middleName": "Ann",
      "phone": "(111) 222-3333",
      "relationship": "Colleague"
    }
  ],
  "workAuthorization": {
    "endDate": "2025-12-31",
    "startDate": "2023-01-01",
    "visaType": "H1B"
  },
  "documents": [
    {
      "fileName": "resume.pdf",
      "fileUrl": "http://example.com/resume.pdf"
    }
  ],
  "emergencyContacts": [
    {
      "email": "emergency1@example.com",
      "firstName": "Mike",
      "lastName": "Johnson",
      "middleName": "Lee",
      "phone": "(444) 555-6666",
      "relationship": "Brother"
    }
  ]
}
