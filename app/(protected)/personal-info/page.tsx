"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchEmployeeById,
  fetchEmployeeIdByUserId,
} from "../../lib/redux/slices/employeeSlice";
import { RootState, useAppDispatch } from "../../lib/redux/store";
import Link from "next/link";

const DynamicInfotable = dynamic(() => import("@/components/Infotable"), {
  ssr: false,
});

const PersonalInfoPage = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const employeeId = useSelector(
    (state: RootState) => state.employee.employeeId
  );
  const employee = useSelector((state: RootState) => state.employee.employee);
  const status = useSelector((state: RootState) => state.employee.status);
  const error = useSelector((state: RootState) => state.employee.error);

  useEffect(() => {
    if (user?.id && !employeeId) {
      dispatch(fetchEmployeeIdByUserId(user.id))
        .unwrap()
        .then((result) => {
          if (result) {
            dispatch(fetchEmployeeById(result));
          }
        })
        .catch((error) => {
          console.error("Error fetching employee ID:", error);
        });
    }
  }, [dispatch, user, employeeId]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <section className="main-container">
      {employee ? (
        <DynamicInfotable employee={employee} />
      ) : employeeId ? (
        <p>No employee data found.</p>
      ) : user ? (
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
          role="alert"
        >
          <p className="font-bold">Notice</p>
          <p>
            You haven't created an employee profile yet. 
          </p>
          <Link
            href="/create-employee"
            className="text-yellow-700 underline hover:text-blue-400"
          >
            Please create one to view your personal information.
          </Link>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </section>
  );
};

export default PersonalInfoPage;
