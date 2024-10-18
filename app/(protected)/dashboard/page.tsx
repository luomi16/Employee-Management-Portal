"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import ESidebar from "@/components/ESidebar";
import { fetchEmployeeIdByUserId } from "@/app/lib/redux/slices/employeeSlice";
import { RootState, useAppDispatch } from "@/app/lib/redux/store";
import { useSelector } from "react-redux";


const DashboardPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const employeeId = useSelector(
    (state: RootState) => state.employee.employeeId
  );

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchEmployeeIdByUserId(user.id))
        .unwrap()
        .then((result) => {
          if (!result) {
            router.push("/create-employee");
          }
        })
        .catch((error) => {
          console.error("Error fetching employee ID:", error);
          router.push("/create-employee");
        });
    }
  }, [user, dispatch, router]);

  if (!employeeId) {
    return null;
  }

  return (
    <main className="flex">
      <ESidebar />
      <section className="ml-4 main-container">
        <h1 className="header-text text-3xl font-bold mt-4">
          This is employee dashboard Page
        </h1>
      </section>
    </main>
  );
};

export default DashboardPage;