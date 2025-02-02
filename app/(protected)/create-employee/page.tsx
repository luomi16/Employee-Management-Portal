// app/create-employee/page.tsx
"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { get, useForm, useFieldArray, FormProvider, useWatch } from "react-hook-form";
import { request, gql } from "graphql-request";
import { useRouter } from "next/navigation";
import { RootState, useAppDispatch } from "../../lib/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";

import { employeeFormSchema } from "@/lib/validation/employeeValidation";
import BasicEmployeeInfo from "@/components/employee/BasicEmployeeInfo";
import DetailedEmployeeInfo from "@/components/employee/DetailedEmployeeInfo";
// GraphQL Mutation for creating an employee
const CREATE_EMPLOYEE_MUTATION = gql`
  mutation CreateEmployee(
    $userId: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $middleName: String
    $prefferedName: String
    $profilePic: String
    $address: AddressInput
    $phone: String
    $ssn: String!
    $birthday: DateTime!
    $gender: Gender!
    $identity: Identity!
    $workAuthorization: WorkAuthorizationInput
    $emergencyContacts: [EmergencyContactInput!]
    $reference: [ReferenceInput!]
    $onboardingStatus: OnboardingStatus!
    $documents: [DocumentInput!]
  ) {
    createEmployee(
      userId: $userId
      email: $email
      firstName: $firstName
      lastName: $lastName
      middleName: $middleName
      prefferedName: $prefferedName
      profilePic: $profilePic
      address: $address
      phone: $phone
      ssn: $ssn
      birthday: $birthday
      gender: $gender
      identity: $identity
      workAuthorization: $workAuthorization
      emergencyContacts: $emergencyContacts
      reference: $reference
      onboardingStatus: $onboardingStatus
      documents: $documents
    ) {
      id
      email
      firstName
      lastName
      onboardingStatus
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


  const methods = useForm();
  const watch = methods.watch;
  // { resolver: zodResolver(employeeFormSchema) }
  // Hardcode
  useEffect(() => {
    // Employee basic info
    methods.setValue("firstName", "John");
    methods.setValue("lastName", "Doe");
    methods.setValue("middleName", "Michael");
    methods.setValue("prefferedName", "Johnny");
    methods.setValue("email", "john.doe@example.com");
    methods.setValue("ssn", "123-45-6789");
    methods.setValue("birthday", "1990-01-01");
    methods.setValue("gender", "MALE");
    methods.setValue("identity", "OTHER");


    // Address
    methods.setValue("address.streetName", "Elm Street");
    methods.setValue("address.city", "Los Angeles");
    methods.setValue("address.state", "CA");
    methods.setValue("address.zip", "90001");

    // Phone Numbers
    methods.setValue("phone", "123-456-7890");

    // Work Authorization
    methods.setValue("workAuthorization.visaType", "H1B");
    methods.setValue("workAuthorization.startDate", "2023-01-01");
    methods.setValue("workAuthorization.endDate", "2025-12-31");

    // References
    methods.setValue("references", [
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
    methods.setValue("documents", [
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
    methods.setValue("emergencyContacts", [
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
  }, [methods.setValue]);

  const identityValue = watch("identity");
  // const {
  //   fields: referenceFields,
  //   append: appendReference,
  //   remove: removeReference,
  // } = useFieldArray({
  //   control,
  //   name: "references",
  // });
  // const {
  //   fields: documentFields,
  //   append: appendDocument,
  //   remove: removeDocument,
  // } = useFieldArray({
  //   control,
  //   name: "documents",
  // });
  // const {
  //   fields: emergencyFields,
  //   append: appendEmergencyContact,
  //   remove: removeEmergencyContact,
  // } = useFieldArray({
  //   control,
  //   name: "emergencyContacts",
  // });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    console.log("表单提交", data);
    try {
      const variables = {
        ...data,
        userId: user?.id,
        birthday: new Date(data.birthday).toISOString(),
        onboardingStatus: "PENDING",
        reference: data.reference?.length > 0 ? data.reference : [],
        emergencyContacts: data.emergencyContacts?.length > 0 ? data.emergencyContacts : [],
        documents: data.documents?.length > 0 ? data.documents : [],
        workAuthorization: data.workAuthorization || null,
      };
  
      console.log("发送到服务器的数据", variables);
  
      const response = await request(
        "http://localhost:3000/api/graphql",
        CREATE_EMPLOYEE_MUTATION,
        variables
      );
      console.log("服务器响应", response);
      // Reset the form after successful submission
      methods.reset();
      // Redirect or show success message
      alert("员工创建成功！");
      router.push("/");
    } catch (error) {
      console.error("创建员工时出错", error);
      alert("创建员工时出错：" + (error instanceof Error ? error.message : String(error)));
    }
  };

  return (
    <section className="main-container bg-gray-400 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Create New Employee
      </h1>
      <FormProvider {...methods}>

      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <BasicEmployeeInfo control={methods.control} />
        <DetailedEmployeeInfo control={methods.control}/>

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
      </FormProvider>

    </section>
  );
};

export default CreateEmployeePage;
