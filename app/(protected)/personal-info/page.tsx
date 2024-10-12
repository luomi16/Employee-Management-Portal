// pages/personal-info.tsx
"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchEmployeeById } from "../../lib/redux/slices/employeeSlice";
import { RootState, useAppDispatch } from "../../lib/redux/store";

const PersonalInfoPage = () => {
  const dispatch = useAppDispatch();
  const employee = useSelector((state: RootState) => state.employee.employee);
  const status = useSelector((state: RootState) => state.employee.status);
  const error = useSelector((state: RootState) => state.employee.error);

  // Fetch employee by ID when the component mounts
  useEffect(() => {
    const employeeId = "6709c4e720e08f3c4a2a7aac"; // Example employee ID
    dispatch(fetchEmployeeById(employeeId));
    // console.log("employeeId",employeeId);
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  // console.log(employee)

  return (
    <section className="main-container">
      <h1 className="header-text text-3xl font-bold mt-4">Personal Info</h1>
      {employee ? (
        <div className="mt-4 text-lg">
          <p>First Name: {employee.firstName}</p>
          <p>Last Name: {employee.lastName}</p>
          <p>SSN: {employee.ssn}</p>
          <p>Birthday: {employee.birthday}</p>
          <p>Gender: {employee.gender}</p>
          <p>identity: {employee.identity}</p>
          <p>email: {employee.email}</p>
        </div>
      ) : (
        <p>No employee data found.</p>
      )}
    </section>
  );
};

export default PersonalInfoPage;
