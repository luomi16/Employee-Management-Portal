# Operation
```json
mutation CreateEmployee($firstName: String, $lastName: String, $ssn: String, $birthday: String, $gender: Gender, $identity: Identity, $userId: String, $email: String, $middleName: String, $prefferedName: String, $address: [AddressInput], $phone: [PhoneNumberInput], $reference: ReferenceInput, $workAuthorization: WorkAuthorizationInput, $documents: [DocumentInput], $emergencyContacts: [EmergencyContactInput]) {
  createEmployee(firstName: $firstName, lastName: $lastName, ssn: $ssn, birthday: $birthday, gender: $gender, identity: $identity, userId: $userId, email: $email, middleName: $middleName, prefferedName: $prefferedName, address: $address, phone: $phone, reference: $reference, workAuthorization: $workAuthorization, documents: $documents, emergencyContacts: $emergencyContacts) {
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
    createdAt
    updatedAt
    onboardingStatus
    address {
      id
      building
      streetName
      city
      state
      zip
    }
    phone {
      id
      cellPhone
      workPhone
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
    workAuthorization {
      id
      visaType
      startDate
      endDate
      documents {
        id
        fileName
        fileUrl
      }
    }
    documents {
      id
      fileName
      fileUrl
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
  }
}
```

# Variables
```
{
  "firstName": "Li",
  "lastName": "Wang",
  "middleName": "Jun",
  "prefferedName": "Johnny",
  "email": "li.jun.wang@example.com",
  "ssn": "987-65-4321",
  "birthday": "1992-08-16",
  "gender": "MALE",
  "identity": "CITIZEN",
  "userId": "670ab7886c534fcf25c47fc9",
  "address": [
    {
      "building": "Building 8",
      "city": "San Francisco",
      "state": "CA",
      "streetName": "Pearl Street",
      "zip": "94105"
    }
  ],
  "phone": [
    {
      "cellPhone": "+1-415-555-1234",
      "workPhone": "+1-415-555-5678"
    }
  ],
  "reference": {
    "email": "mei.zhang@example.com",
    "firstName": "Mei",
    "lastName": "Zhang",
    "middleName": "Lan",
    "phone": "+1-415-555-7890",
    "relationship": "Colleague"
  },
  "workAuthorization": {
    "documents": [
      {
        "fileName": "H1B_Visa.pdf",
        "fileUrl": "https://example.com/documents/H1B_Visa.pdf"
      }
    ],
    "endDate": "2023-01-01",
    "startDate": "2020-01-01",
    "visaType": "H1B"
  },
  "documents": [
    {
      "fileName": "Resume.pdf",
      "fileUrl": "https://example.com/documents/Resume.pdf"
    },
    {
      "fileName": "CoverLetter.pdf",
      "fileUrl": "https://example.com/documents/CoverLetter.pdf"
    }
  ],
  "emergencyContacts": [
    {
      "email": "xiao.chen@example.com",
      "firstName": "Xiao",
      "lastName": "Chen",
      "middleName": "Li",
      "phone": "+1-415-555-2345",
      "relationship": "Friend"
    }
  ]
}
```