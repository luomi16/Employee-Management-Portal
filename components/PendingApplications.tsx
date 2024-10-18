"use client";

import { useQuery, gql } from "@apollo/client";
import Link from "next/link";

const GET_PENDING_APPLICATIONS = gql`
  query Query {
    employees {
      id
      firstName
      lastName
      middleName
      onboardingStatus
      email
    }
  }
`;

const PendingApplications = () => {
  const { loading, error, data } = useQuery(GET_PENDING_APPLICATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.employees) return <p>No data available</p>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Application Review</h2>
      <table className="min-w-full divide-y-2 text-sm divide-gray-700 bg-gray-900">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
              Full Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
              Email
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
              Onboarding Status
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
              Review
            </th>
          </tr>
        </thead>
        <tbody className="divide-y dark:divide-gray-700">
          {data.employees.map((employee: any) => (
            <tr key={employee.id} className="odd:bg-gray-800/50">
              <td className="whitespace-nowrap px-4 py-2 text-center text-gray-200">
                {employee.firstName} {employee.middleName} {employee.lastName}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-center text-gray-200">
                {employee.email}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-center text-gray-200">
                {employee.onboardingStatus}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-center text-gray-200">
                <Link href={`/hr/employee-info/${employee.id}`} passHref>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Review
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingApplications;
