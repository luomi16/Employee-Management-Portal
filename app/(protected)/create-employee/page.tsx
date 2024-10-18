// app/create-employee/page.tsx
"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { get, useForm, useFieldArray } from "react-hook-form";
import { request, gql } from "graphql-request";
import { useRouter } from "next/navigation";
import { RootState, useAppDispatch } from "../../lib/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";

import { employeeFormSchema } from "@/lib/validation/employeeValidation";

// GraphQL Mutation for creating an employee
const CREATE_EMPLOYEE_MUTATION = gql`
  mutation CreateEmployee(
    $firstName: String!
    $lastName: String!
    $middleName: String
    $prefferedName: String
    $email: String!
    $ssn: String!
    $birthday: String!
    $gender: Gender!
    $identity: Identity!
    $userId: String!
    $address: AddressInput!
    $phone: PhoneNumberInput!
    $references: [ReferenceInput!]!
    $workAuthorization: WorkAuthorizationInput!
    $documents: [DocumentInput!]!
    $emergencyContacts: [EmergencyContactInput!]!
  ) {
    createEmployee(
      firstName: $firstName
      lastName: $lastName
      middleName: $middleName
      prefferedName: $prefferedName
      email: $email
      ssn: $ssn
      birthday: $birthday
      gender: $gender
      identity: $identity
      userId: $userId
      address: $address
      phone: $phone
      references: $references
      workAuthorization: $workAuthorization
      documents: $documents
      emergencyContacts: $emergencyContacts
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

const CreateEmployeePage = () => {
  // const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  // const employee = useSelector((state: RootState) => state.employee.employee);
  if (user && user.id) {
    console.log("userId", user.id);
  }

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ resolver: zodResolver(employeeFormSchema) });
  // Hardcode 虚拟数据
  useEffect(() => {
    // Employee basic info
    setValue("firstName", "John");
    setValue("lastName", "Doe");
    setValue("middleName", "Michael");
    setValue("preferredName", "Johnny");
    setValue("email", "john.doe@example.com");
    setValue("ssn", "123-45-6789");
    setValue("birthday", "1990-01-01");
    setValue("gender", "MALE");
    setValue("identity", "OTHER");

    // Address
    setValue("address.building", "101 Main St");
    setValue("address.streetName", "Elm Street");
    setValue("address.city", "Los Angeles");
    setValue("address.state", "CA");
    setValue("address.zip", "90001");

    // Phone Numbers
    setValue("phone.cellPhone", "123-456-7890");
    setValue("phone.workPhone", "987-654-3210");

    // Work Authorization
    setValue("workAuthorization.visaType", "H1B");
    setValue("workAuthorization.startDate", "2023-01-01");
    setValue("workAuthorization.endDate", "2025-12-31");

    // References
    setValue("references", [
      {
        firstName: "Jane",
        lastName: "Doe",
        middleName: "Ann",
        phone: "234-567-8901",
        email: "jane.doe@example.com",
        relationship: "Colleague",
      },
      {
        firstName: "Mark",
        lastName: "Smith",
        middleName: "Anthony",
        phone: "345-678-9012",
        email: "mark.smith@example.com",
        relationship: "Manager",
      },
    ]);

    // Documents
    setValue("documents", [
      {
        fileName: "Resume.pdf",
        fileUrl: "http://example.com/resume.pdf",
      },
      {
        fileName: "CoverLetter.pdf",
        fileUrl: "http://example.com/coverletter.pdf",
      },
    ]);

    // Emergency Contacts
    setValue("emergencyContacts", [
      {
        firstName: "Emily",
        lastName: "Johnson",
        middleName: "Sarah",
        phone: "456-789-0123",
        email: "emily.johnson@example.com",
        relationship: "Spouse",
      },
      {
        firstName: "Robert",
        lastName: "Williams",
        middleName: "Lee",
        phone: "567-890-1234",
        email: "robert.williams@example.com",
        relationship: "Friend",
      },
    ]);
  }, [setValue]);

  const identityValue = watch("identity");
  const {
    fields: referenceFields,
    append: appendReference,
    remove: removeReference,
  } = useFieldArray({
    control,
    name: "references",
  });
  const {
    fields: documentFields,
    append: appendDocument,
    remove: removeDocument,
  } = useFieldArray({
    control,
    name: "documents",
  });
  const {
    fields: emergencyFields,
    append: appendEmergencyContact,
    remove: removeEmergencyContact,
  } = useFieldArray({
    control,
    name: "emergencyContacts",
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const variables = {
        ...data,
        userId: user?.id,
        address: data.address,
        phone: data.phone,
        documents: data.documents.length > 0 ? data.documents : [],
        emergencyContacts:
          data.emergencyContacts.length > 0 ? data.emergencyContacts : [],
        workAuthorization: data.workAuthorization
          ? data.workAuthorization
          : null,
      };

      const response = await request(
        // "/api/graphql",
        "http://localhost:3000/api/graphql",
        CREATE_EMPLOYEE_MUTATION,
        variables
      );
      console.log(response);
      // Reset the form after successful submission
      reset();
      // Redirect or show success message
      alert("Employee created successfully!");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Error creating employee.");
    }
  };

  return (
    <section className="main-container bg-gray-400 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Create New Employee
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 p-2">
              First Name
            </label>
            <input
              type="text"
              {...register("firstName")}
              className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="First Name"
            />
            {errors.firstName && (
              <p className="text-red-500">
                {typeof errors.firstName.message === "string"
                  ? errors.firstName.message
                  : "Invalid first name"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 p-2">
              Last Name
            </label>
            <input
              type="text"
              {...register("lastName", { required: true })}
              className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Last Name"
            />
            {errors.lastName && (
              <p className="text-red-500">
                {typeof errors.lastName.message === "string"
                  ? errors.lastName.message
                  : "Invalid last name"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 p-2">
              Middle Name
            </label>
            <input
              type="text"
              {...register("middleName")}
              className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Middle Name"
            />
            {errors.middleName && (
              <p className="text-red-500">
                {typeof errors.middleName.message === "string"
                  ? errors.middleName.message
                  : "Invalid middle name"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 p-2">
              Preferred Name
            </label>
            <input
              type="text"
              {...register("preferredName")}
              className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Preferred Name"
            />
            {errors.preferredName && (
              <p className="text-red-500">
                {typeof errors.preferredName.message === "string"
                  ? errors.preferredName.message
                  : "Invalid preferred name"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 p-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="testuser@example.com"
            />
            {errors.email && (
              <p className="text-red-500">
                {typeof errors.email.message === "string"
                  ? errors.email.message
                  : "Invalid email address"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 p-2">
              SSN
            </label>
            <input
              type="text"
              {...register("ssn", { required: true })}
              className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="123-45-6789"
            />
            {errors.ssn && (
              <p className="text-red-500">
                {typeof errors.ssn.message === "string"
                  ? errors.ssn.message
                  : "Invalid SSN"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 p-2">
              Birthday
            </label>
            <input
              type="date"
              {...register("birthday", { required: true })}
              className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Birthday"
            />
            {errors.birthday && (
              <p className="text-red-500">
                {typeof errors.birthday.message === "string"
                  ? errors.birthday.message
                  : "Invalid birthday"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 p-2">
              Gender
            </label>
            <select
              {...register("gender", { required: true })}
              className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="FEMALE">Female</option>
              <option value="MALE">Male</option>
              <option value="NOTTOANSWER">Prefer Not to Answer</option>
            </select>
            {errors.gender && (
              <p className="text-red-500">
                {typeof errors.gender.message === "string"
                  ? errors.gender.message
                  : "Invalid gender"}
              </p>
            )}
          </div>
        </div>

        {/* Address */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 p-2">
                Street Name
              </label>
              <input
                {...register("address.streetName", { required: true })}
                className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Street Name"
              />
              {get(errors, "address.streetName") && (
                <p className="text-red-500">
                  {typeof get(errors, "address.streetName.message") === "string"
                    ? get(errors, "address.streetName.message")
                    : "Invalid street name"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 p-2">
                City
              </label>
              <input
                {...register("address.city", { required: true })}
                className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="City"
              />
              {get(errors, "address.city") && (
                <p className="text-red-500">
                  {typeof get(errors, "address.city.message") === "string"
                    ? get(errors, "address.city.message")
                    : "Invalid city"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 p-2">
                State
              </label>
              <input
                {...register("address.state", { required: true })}
                className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="State"
              />
              {get(errors, "address.state") && (
                <p className="text-red-500">
                  {typeof get(errors, "address.state.message") === "string"
                    ? get(errors, "address.state.message")
                    : "Invalid state"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 p-2">
                ZIP
              </label>
              <input
                {...register("address.zip", { required: true })}
                className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="10001"
              />
              {get(errors, "address.zip") && (
                <p className="text-red-500">
                  {typeof get(errors, "address.zip.message") === "string"
                    ? get(errors, "address.zip.message")
                    : "Invalid ZIP code"}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* To output the full address object for debugging */}
        <div className="mt-4">
          <pre>For testing: {JSON.stringify(watch("address"), null, 2)}</pre>
          {/* Watch will capture the form values dynamically */}
        </div>

        {/* Phone Fields */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Phone Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 p-2">
                Cell Phone
              </label>
              <input
                {...register("phone.cellPhone", { required: true })}
                className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="123-456-7890"
              />
              {get(errors, "phone.cellPhone") && (
                <p className="text-red-500">
                  {typeof get(errors, "phone.cellPhone.message") === "string"
                    ? get(errors, "phone.cellPhone.message")
                    : "Invalid cell phone number"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 p-2">
                Work Phone
              </label>
              <input
                {...register("phone.workPhone")}
                className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="123-456-7890"
              />
              {get(errors, "phone.workPhone") && (
                <p className="text-red-500">
                  {typeof get(errors, "phone.workPhone.message") === "string"
                    ? get(errors, "phone.workPhone.message")
                    : "Invalid work phone number"}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <pre>For testing: {JSON.stringify(watch("phone"), null, 2)}</pre>
        </div>

        {/* Work Authorization Section */}
        <div>
          {/* Identity Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 p-2">
              Identity
            </label>
            <select
              {...register("identity", { required: true })}
              className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="CITIZEN">Citizen</option>
              <option value="GREENCARD">Green Card</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.identity && (
              <p className="text-red-500">
                {typeof errors.identity.message === "string"
                  ? errors.identity.message
                  : "Invalid identity"}
              </p>
            )}
          </div>
          {/* Conditionally render Work Authorization if identity is 'OTHER' */}
          {identityValue === "OTHER" && (
            <div>
              {/* <h2 className="text-2xl font-bold mb-4">Work Authorization</h2> */}
              <div>
                <label className="block text-sm font-medium text-gray-700 p-2">
                  Visa Type
                </label>
                <select
                  {...register("workAuthorization.visaType", {
                    required: true,
                  })}
                  className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="H1B">H1B</option>
                  <option value="F1">F1</option>
                  <option value="J1">J1</option>
                  <option value="Other">Other</option>
                </select>
                {get(errors, "workAuthorization.visaType") && (
                  <p className="text-red-500">
                    {typeof get(
                      errors,
                      "workAuthorization.visaType.message"
                    ) === "string"
                      ? get(errors, "workAuthorization.visaType.message")
                      : "Invalid visa type"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 p-2">
                  Start Date
                </label>
                <input
                  type="date"
                  {...register("workAuthorization.startDate", {
                    required: true,
                  })}
                  className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {get(errors, "workAuthorization.startDate") && (
                  <p className="text-red-500">
                    {typeof get(
                      errors,
                      "workAuthorization.startDate.message"
                    ) === "string"
                      ? get(errors, "workAuthorization.startDate.message")
                      : "Invalid start date"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 p-2">
                  End Date
                </label>
                <input
                  type="date"
                  {...register("workAuthorization.endDate", { required: true })}
                  className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {get(errors, "workAuthorization.endDate") && (
                  <p className="text-red-500">
                    {typeof get(errors, "workAuthorization.endDate.message") ===
                    "string"
                      ? get(errors, "workAuthorization.endDate.message")
                      : "Invalid end date"}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <pre>
                  For testing:
                  {JSON.stringify(watch("workAuthorization"), null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Documents Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Documents</h2>
          {documentFields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 p-2">
                  Document Name
                </label>
                <input
                  {...register(`documents.${index}.fileName`, {
                    required: true,
                  })}
                  className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="H1B_Visa.pdf"
                />
                {get(errors, `documents.${index}.fileName`) && (
                  <p className="text-red-500">
                    {typeof get(
                      errors,
                      `documents.${index}.fileName.message`
                    ) === "string"
                      ? get(errors, `documents.${index}.fileName.message`)
                      : "Invalid file name"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 p-2">
                  Document URL
                </label>
                <input
                  {...register(`documents.${index}.fileUrl`, {
                    required: true,
                  })}
                  className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="https://example.com/documents/H1B_Visa.pdf"
                />
                {get(errors, `documents.${index}.fileUrl`) && (
                  <p className="text-red-500">
                    {typeof get(
                      errors,
                      `documents.${index}.fileUrl.message`
                    ) === "string"
                      ? get(errors, `documents.${index}.fileUrl.message`)
                      : "Invalid file URL"}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => removeDocument(index)}
                  className="bg-red-500 text-white p-2 mt-4 rounded"
                >
                  Remove Document
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendDocument({})}
            className="bg-blue-500 text-white p-2 mt-4 rounded"
          >
            Add Document
          </button>
        </div>

        {/* Reference Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">References</h2>
          {referenceFields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 p-2">
                  First Name
                </label>
                <input
                  {...register(`references.${index}.firstName`, {
                    required: true,
                  })}
                  className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="First Name"
                />
                {get(errors, `references.${index}.firstName`) && (
                  <p className="text-red-500">
                    {typeof get(
                      errors,
                      `references.${index}.firstName.message`
                    ) === "string"
                      ? get(errors, `references.${index}.firstName.message`)
                      : "Invalid first name"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 p-2">
                  Last Name
                </label>
                <input
                  {...register(`references.${index}.lastName`, {
                    required: true,
                  })}
                  className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Last Name"
                />
                {get(errors, `references.${index}.lastName`) && (
                  <p className="text-red-500">
                    {typeof get(
                      errors,
                      `references.${index}.lastName.message`
                    ) === "string"
                      ? get(errors, `references.${index}.lastName.message`)
                      : "Invalid last name"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 p-2">
                  Phone
                </label>
                <input
                  {...register(`references.${index}.phone`, { required: true })}
                  className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="123-456-7890"
                />
                {get(errors, `references.${index}.phone`) && (
                  <p className="text-red-500">
                    {typeof get(errors, `references.${index}.phone.message`) ===
                    "string"
                      ? get(errors, `references.${index}.phone.message`)
                      : "Invalid phone"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 p-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register(`references.${index}.email`, { required: true })}
                  className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="testuser@example.com"
                />
                {get(errors, `references.${index}.email`) && (
                  <p className="text-red-500">
                    {typeof get(errors, `references.${index}.email.message`) ===
                    "string"
                      ? get(errors, `references.${index}.email.message`)
                      : "Invalid email address"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 p-2">
                  Relationship
                </label>
                <input
                  {...register(`references.${index}.relationship`, {
                    required: true,
                  })}
                  className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Colleague, Friend, Professor, etc."
                />
                {get(errors, `references.${index}.relationship`) && (
                  <p className="text-red-500">
                    {typeof get(
                      errors,
                      `references.${index}.relationship.message`
                    ) === "string"
                      ? get(errors, `references.${index}.relationship.message`)
                      : "Invalid relationship"}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => removeReference(index)}
                  className="bg-red-500 text-white p-2 mt-4 rounded"
                >
                  Remove Reference
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendReference({})}
            className="bg-blue-500 text-white p-2 mt-4 rounded"
          >
            Add Reference
          </button>
        </div>
        <div className="mt-4">
          <pre>For testing: {JSON.stringify(watch("references"), null, 2)}</pre>
        </div>

        {/* Emergency Contacts */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Emergency Contacts</h2>
          {emergencyFields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 p-2">
                  First Name
                </label>
                <input
                  {...register(`emergencyContacts.${index}.firstName`, {
                    required: true,
                  })}
                  className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="First Name"
                />
                {get(errors, `emergencyContacts.${index}.firstName`) && (
                  <p className="text-red-500">
                    {typeof get(
                      errors,
                      `emergencyContacts.${index}.firstName.message`
                    ) === "string"
                      ? get(
                          errors,
                          `emergencyContacts.${index}.firstName.message`
                        )
                      : "Invalid first name"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 p-2">
                  Last Name
                </label>
                <input
                  {...register(`emergencyContacts.${index}.lastName`, {
                    required: true,
                  })}
                  className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Last Name"
                />
                {get(errors, `emergencyContacts.${index}.lastName`) && (
                  <p className="text-red-500">
                    {typeof get(
                      errors,
                      `emergencyContacts.${index}.lastName.message`
                    ) === "string"
                      ? get(
                          errors,
                          `emergencyContacts.${index}.lastName.message`
                        )
                      : "Invalid last name"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 p-2">
                  Phone
                </label>
                <input
                  {...register(`emergencyContacts.${index}.phone`, {
                    required: true,
                  })}
                  className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Phone"
                />
                {get(errors, `emergencyContacts.${index}.phone`) && (
                  <p className="text-red-500">
                    {typeof get(
                      errors,
                      `emergencyContacts.${index}.phone.message`
                    ) === "string"
                      ? get(errors, `emergencyContacts.${index}.phone.message`)
                      : "Invalid phone number"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 p-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register(`emergencyContacts.${index}.email`, {
                    required: true,
                  })}
                  className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Email"
                />
                {get(errors, `emergencyContacts.${index}.email`) && (
                  <p className="text-red-500">
                    {typeof get(
                      errors,
                      `emergencyContacts.${index}.email.message`
                    ) === "string"
                      ? get(errors, `emergencyContacts.${index}.email.message`)
                      : "Invalid email address"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 p-2">
                  Relationship
                </label>
                <input
                  {...register(`emergencyContacts.${index}.relationship`, {
                    required: true,
                  })}
                  className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Relationship"
                />
                {get(errors, `emergencyContacts.${index}.relationship`) && (
                  <p className="text-red-500">
                    {typeof get(
                      errors,
                      `emergencyContacts.${index}.relationship.message`
                    ) === "string"
                      ? get(
                          errors,
                          `emergencyContacts.${index}.relationship.message`
                        )
                      : "Invalid relationship"}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => removeEmergencyContact(index)}
                  className="bg-red-500 text-white p-2 mt-4 rounded"
                >
                  Remove Emergency Contact
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendEmergencyContact({})}
            className="bg-blue-500 text-white p-2 mt-4 rounded"
          >
            Add Emergency Contact
          </button>
        </div>
        <div className="mt-4">
          <pre>
            For testing: {JSON.stringify(watch("emergencyContacts"), null, 2)}
          </pre>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="bg-green-500 text-white p-2 rounded"
          >
            Create Employee
          </button>
        </div>

        {/* Testing Output */}
        <div className="mt-4">
          <pre>For testing: {JSON.stringify(watch(), null, 2)}</pre>
        </div>
      </form>
    </section>
  );
};

export default CreateEmployeePage;
