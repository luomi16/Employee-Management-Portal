"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchEmployeeById } from "../../../../lib/redux/slices/employeeSlice";
import { RootState, useAppDispatch } from "../../../../lib/redux/store";
import { useParams } from "next/navigation";

import Infotable from "@/components/Infotable";

const EmployeeInfoPage = () => {
  const dispatch = useAppDispatch();

  const employee = useSelector((state: RootState) => state.employee.employee);
  const status = useSelector((state: RootState) => state.employee.status);
  const error = useSelector((state: RootState) => state.employee.error);

  const params = useParams();
  console.log(params);
  let employeeId = params.id;

  if (Array.isArray(employeeId)) {
    employeeId = employeeId[0]; // Use the first element if it's an array
  }

  useEffect(() => {
    if (employeeId) {
      dispatch(fetchEmployeeById(employeeId));
    }
  }, [dispatch, employeeId]);

  // const handleApprove = () => {
  //   if (employee && employee.id) {
  //     dispatch(updateEmployeeStatus({ id: employee.id, status: "COMPLETED" }));
  //   }
  // };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  console.log(employee);

  return (
    <section className="main-container">
      {employee ? (
        <>
          <Infotable employee={employee} />

          {/* Conditionally render the buttons based on onboardingStatus */}
          {employee.onboardingStatus === "PENDING" && (
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                // onClick={handleReject}
              >
                Reject
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                // onClick={handleApprove}
              >
                Approve
              </button>
            </div>
          )}
        </>
      ) : (
        <p>No employee data found.</p>
      )}
    </section>
  );
};

export default EmployeeInfoPage;
