"use client";

import Sidebar from "@/components/Sidebar";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAllEmployees } from "../../../lib/redux/slices/employeeSlice";
import { RootState, useAppDispatch } from "../../../lib/redux/store";

const EmployeesPage = () => {
  const dispatch = useAppDispatch();

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Select employees and loading state from Redux store
  const { employees, status } = useSelector(
    (state: RootState) => state.employee
  );

  // Fetch employees when the component mounts
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllEmployees());
    }
  }, [dispatch, status]);

  // console.log("employees", employees);

  // Filter employees based on search input
  const filteredEmployees = employees.filter((employee: any) =>
    `${employee.firstName} ${employee.lastName} ${employee.preferredName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Choose which list to display: full employee list or filtered list
  const employeesToDisplay = searchTerm ? filteredEmployees : employees;

  return (
    <main className="flex">
      <section>
        <Sidebar />
      </section>
      <section className="container px-4 mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium  text-white">Employees</h2>
            <span className="px-3 py-1 text-xs  bg-gray-800 text-blue-400">
              total: {employees.length}
            </span>
          </div>
        </div>

        <div className="mt-6 md:flex md:items-center md:justify-between">
          <div className="relative flex items-center mt-4 md:mt-0">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 mx-3  text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on every key press
              className="block w-full py-1.5 pr-5  rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 bg-gray-900 text-gray-300 border-gray-600  focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border  border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y  divide-gray-700">
                  <thead className=" bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left  text-gray-400"
                      >
                        Full Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left  text-gray-400"
                      >
                        SSN
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left  text-gray-400"
                      >
                        Phone Number
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left  text-gray-400"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left  text-gray-400"
                      >
                        Identity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700 bg-gray-900">
                    {status === "loading" && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-4 text-sm text-white"
                        >
                          Loading employees...
                        </td>
                      </tr>
                    )}

                    {status === "succeeded" && employeesToDisplay.length > 0 ? (
                      employeesToDisplay
                        .slice() // Create a copy to avoid mutating the original array
                        .sort(
                          (a: any, b: any) =>
                            a.lastName.localeCompare(b.lastName) // Sort employees by last name alphabetically
                        )
                        .map((employee: any) => (
                          <tr key={employee.ssn}>
                            <td className="px-4 py-4 text-sm text-white">
                              <Link href={`/hr/employee-info/${employee.id}`}>
                                {employee.firstName} {employee.middleName}{" "}
                                {employee.lastName}
                              </Link>
                            </td>
                            <td className="px-4 py-4 text-sm text-white">
                              {employee.ssn}
                            </td>
                            <td className="px-4 py-4 text-sm text-white">
                              {employee.phone}
                            </td>
                            <td className="px-4 py-4 text-sm text-white">
                              {employee.email}
                            </td>
                            <td className="px-4 py-4 text-sm text-white">
                              {employee.identity}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-4 text-sm text-white"
                        >
                          No employees available.
                        </td>
                      </tr>
                    )}

                    {status === "failed" && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-4 text-sm text-white"
                        >
                          Failed to load employees.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EmployeesPage;
