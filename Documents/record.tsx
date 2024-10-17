// app/create-employee/page.tsx
"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useForm,
  useFieldArray,
  FieldError,
  FieldErrors,
} from "react-hook-form";
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
    $address: [AddressInput!]!
    $phone: [PhoneNumberInput!]!
    $reference: ReferenceInput!
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
      reference: $reference
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

type ErrorType = string | FieldError | FieldErrors<any>;

const getErrorMessage = (error: ErrorType): string => {
  if (typeof error === "string") return error;
  if ("message" in error && typeof error.message === "string")
    return error.message;
  return "An error occurred";
};

const CreateEmployeePage = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  //   const employeeId = useSelector(
  //     (state: RootState) => state.employee.employeeId
  //   );
  const employee = useSelector((state: RootState) => state.employee.employee);
  if (user && user.id) {
    console.log("userId", user.id);
    // console.log("employeeId", employeeId);
  }

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(employeeFormSchema) });
  const { fields: addressFields, append: appendAddress } = useFieldArray({
    control,
    name: "address",
  });
  const { fields: phoneFields, append: appendPhone } = useFieldArray({
    control,
    name: "phone",
  });
  const { fields: documentFields, append: appendDocument } = useFieldArray({
    control,
    name: "documents",
  });
  const { fields: emergencyFields, append: appendEmergencyContact } =
    useFieldArray({
      control,
      name: "emergencyContacts",
    });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const variables = {
        ...data,
        userId: user?.id, // Replace this with dynamic userId from context or state
        address: data.address.length > 0 ? data.address : [],
        phone: data.phone.length > 0 ? data.phone : [],
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
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Create New Employee
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                {...register("firstName")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="First Name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {getErrorMessage(errors.firstName)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastName")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Last Name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {getErrorMessage(errors.lastName)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Middle Name
              </label>
              <input
                type="text"
                {...register("middleName")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Middle Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Preferred Name
              </label>
              <input
                type="text"
                {...register("prefferedName")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Preferred Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {getErrorMessage(errors.email)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                SSN
              </label>
              <input
                type="text"
                {...register("ssn")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="SSN"
              />
              {errors.ssn && (
                <p className="mt-1 text-sm text-red-600">
                  {getErrorMessage(errors.ssn)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Birthday
              </label>
              <input
                type="date"
                {...register("birthday")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.birthday && (
                <p className="mt-1 text-sm text-red-600">
                  {getErrorMessage(errors.birthday)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                {...register("gender")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="NOTTOANSWER">Prefer Not to Answer</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">
                  {getErrorMessage(errors.gender)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Identity
              </label>
              <select
                {...register("identity")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="CITIZEN">Citizen</option>
                <option value="GREENCARD">Green Card</option>
                <option value="OTHER">Other</option>
              </select>
              {errors.identity && (
                <p className="mt-1 text-sm text-red-600">
                  {getErrorMessage(errors.identity)}
                </p>
              )}
            </div>
          </div>

          {/* Address Fields */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Address</h2>
            {addressFields.map((field, index) => (
              <div key={field.id} className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    {...register(`address.${index}.building`)}
                    placeholder="Building"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <input
                    {...register(`address.${index}.streetName`)}
                    placeholder="Street Name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <input
                    {...register(`address.${index}.city`)}
                    placeholder="City"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <input
                    {...register(`address.${index}.state`)}
                    placeholder="State"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <input
                    {...register(`address.${index}.zip`)}
                    placeholder="Zip"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                {errors.address && errors.address[index] && (
                  <p className="mt-1 text-sm text-red-600">
                    {getErrorMessage(errors.address[index] as ErrorType)}
                  </p>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendAddress({})}
              className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Address
            </button>
          </div>

          {/* Phone Fields */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Phone Numbers</h2>
            {phoneFields.map((field, index) => (
              <div key={field.id} className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    {...register(`phone.${index}.cellPhone`)}
                    placeholder="Cell Phone"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <input
                    {...register(`phone.${index}.workPhone`)}
                    placeholder="Work Phone"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                {errors.phone && errors.phone[index] && (
                  <p className="mt-1 text-sm text-red-600">
                    {getErrorMessage(errors.phone[index])}
                  </p>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendPhone({})}
              className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Phone
            </button>
          </div>

          {/* Reference Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Reference</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  {...register("reference.firstName")}
                  placeholder="First Name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <input
                  {...register("reference.lastName")}
                  placeholder="Last Name"
                  className="block w-full rounded-md border-gray-300 shadow-smfocus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <input
                  {...register("reference.phone")}
                  placeholder="Phone"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <input
                  {...register("reference.email")}
                  placeholder="Email"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <input
                  {...register("reference.relationship")}
                  placeholder="Relationship"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              {errors.reference && (
                <p className="mt-1 text-sm text-red-600">
                  {getErrorMessage(errors.reference)}
                </p>
              )}
            </div>
          </div>

          {/* Work Authorization Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Work Authorization</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Visa Type
                  </label>
                  <select
                    {...register("workAuthorization.visaType")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="H1B">H1B</option>
                    <option value="F1">F1</option>
                    <option value="J1">J1</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    {...register("workAuthorization.startDate")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    {...register("workAuthorization.endDate")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              {errors.workAuthorization && (
                <p className="mt-1 text-sm text-red-600">
                  {getErrorMessage(errors.workAuthorization)}
                </p>
              )}
            </div>
          </div>

          {/* Documents */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Documents</h2>
            {documentFields.map((field, index) => (
              <div key={field.id} className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    {...register(`documents.${index}.fileName`)}
                    placeholder="File Name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <input
                    {...register(`documents.${index}.fileUrl`)}
                    placeholder="File URL"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                {errors.documents && errors.documents[index] && (
                  <p className="mt-1 text-sm text-red-600">
                    {getErrorMessage(errors.documents[index])}
                  </p>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendDocument({})}
              className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Document
            </button>
          </div>

          {/* Emergency Contacts */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
            {emergencyFields.map((field, index) => (
              <div key={field.id} className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    {...register(`emergencyContacts.${index}.firstName`)}
                    placeholder="First Name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <input
                    {...register(`emergencyContacts.${index}.lastName`)}
                    placeholder="Last Name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <input
                    {...register(`emergencyContacts.${index}.phone`)}
                    placeholder="Phone"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <input
                    {...register(`emergencyContacts.${index}.email`)}
                    placeholder="Email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <input
                    {...register(`emergencyContacts.${index}.relationship`)}
                    placeholder="Relationship"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                {errors.emergencyContacts &&
                  errors.emergencyContacts[index] && (
                    <p className="mt-1 text-sm text-red-600">
                      {getErrorMessage(errors.emergencyContacts[index])}
                    </p>
                  )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendEmergencyContact({})}
              className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Emergency Contact
            </button>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateEmployeePage;
