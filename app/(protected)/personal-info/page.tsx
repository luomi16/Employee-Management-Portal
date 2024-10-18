"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchEmployeeById,
  fetchEmployeeIdByUserId,
} from "../../lib/redux/slices/employeeSlice";
import { RootState, useAppDispatch } from "../../lib/redux/store";

import Infotable from "@/components/Infotable";

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
    if (user && user.id && !employeeId) {
      dispatch(fetchEmployeeIdByUserId(user.id));
      console.log("userId", user.id);
      console.log("employeeId", employeeId);
    }
  }, [dispatch, user, employeeId]);

  useEffect(() => {
    if (employeeId) {
      dispatch(fetchEmployeeById(employeeId));
    }
  }, [dispatch, employeeId]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <section className="main-container">
      {employee ? (
        <Infotable employee={employee} />
      ) : (
        <p>No employee data found.</p>
      )}
    </section>
  );
};

export default PersonalInfoPage;